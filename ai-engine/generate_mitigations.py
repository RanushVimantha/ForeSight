import pandas as pd
from sentence_transformers import SentenceTransformer, util
import mysql.connector
from datetime import datetime

# === Load mitigation examples
DATA_PATH = "data/mitigation_examples.csv"
examples_df = pd.read_csv(DATA_PATH)

# === Load transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def save_mitigations_to_db(project_id, risks, mitigations):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",               # ✅ your DB username
            password="",               # ✅ your DB password
            database="your_db_name"    # ✅ your DB name
        )
        cursor = conn.cursor()

        for risk, mitigation in zip(risks, mitigations):
            cursor.execute("""
                INSERT INTO ai_mitigations (project_id, risk_id, risk_title, mitigation, source, created_at)
                VALUES (%s, %s, %s, %s, 'AI', %s)
            """, (
                project_id,
                risk.get('id'),
                risk.get('title'),
                mitigation,
                datetime.now()
            ))

        conn.commit()
        cursor.close()
        conn.close()
        print("✅ Mitigations saved to DB")
    except Exception as e:
        print("❌ Error saving to DB:", e)

def suggest_mitigations(project_risks, project_id=None, top_n=2):
    if not project_risks:
        return []

    risk_titles = [r['title'] for r in project_risks if r.get('title')]
    example_titles = examples_df['risk_title'].tolist()

    # Encode
    example_embeddings = model.encode(example_titles, convert_to_tensor=True)
    risk_embeddings = model.encode(risk_titles, convert_to_tensor=True)

    all_suggestions = []

    for i, risk_embedding in enumerate(risk_embeddings):
        scores = util.pytorch_cos_sim(risk_embedding, example_embeddings)[0]
        top_indices = scores.argsort(descending=True)[:top_n]

        for idx in top_indices:
            mitigation = examples_df.iloc[int(idx)]['mitigation']
            all_suggestions.append({
                'risk': project_risks[i],
                'mitigation': mitigation
            })

    # Save to DB if needed
    if project_id:
        save_mitigations_to_db(
            project_id,
            [s['risk'] for s in all_suggestions],
            [s['mitigation'] for s in all_suggestions]
        )

    return list(set(s['mitigation'] for s in all_suggestions))  # Unique li
