import pandas as pd
from sentence_transformers import SentenceTransformer, util

# Load the curated dataset
DATA_PATH = "data/mitigation_examples.csv"
examples_df = pd.read_csv(DATA_PATH)

# Load pre-trained transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Fast and lightweight

def suggest_mitigations(project_risks, top_n=2):
    if not project_risks:
        return []

    risk_titles = [r['title'] for r in project_risks if r.get('title')]
    example_titles = examples_df['risk_title'].tolist()

    # Encode risks and examples
    example_embeddings = model.encode(example_titles, convert_to_tensor=True)
    risk_embeddings = model.encode(risk_titles, convert_to_tensor=True)

    all_suggestions = []

    for i, risk_embedding in enumerate(risk_embeddings):
        scores = util.pytorch_cos_sim(risk_embedding, example_embeddings)[0]
        top_indices = scores.argsort(descending=True)[:top_n]

        for idx in top_indices:
            mitigation = examples_df.iloc[int(idx)]['mitigation']
            all_suggestions.append(mitigation)

    return list(set(all_suggestions))  # Remove duplicates
