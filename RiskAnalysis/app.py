# Streamlit setup
import streamlit as st
st.set_page_config(page_title="Project Risk Analyzer", layout="centered")

from sentence_transformers import SentenceTransformer, util
import pandas as pd
import matplotlib.pyplot as plt

# Load Sentence Transformer model
@st.cache_resource
def load_model():
    return SentenceTransformer("all-MiniLM-L6-v2")

model = load_model()

# Risk classification templates (semantic embedding scoring)
risk_templates = {
    "High": "This project involves complex AI or healthcare systems, with tight budget, short timeline, or compliance obligations.",
    "Medium": "This project has moderate complexity or limited resources but is manageable with some adjustments.",
    "Low": "This project has clear scope, enough resources, and low compliance/technical risk."
}

# Semantic similarity-based risk level
def compute_scope_risk(scope_text):
    scope_embedding = model.encode(scope_text, convert_to_tensor=True)
    template_embeddings = {k: model.encode(v, convert_to_tensor=True) for k, v in risk_templates.items()}
    similarities = {k: util.pytorch_cos_sim(scope_embedding, v).item() for k, v in template_embeddings.items()}
    return max(similarities, key=similarities.get), max(similarities.values()) * 100

# Context-aware risk factor generator
def generate_risk_factors(scope_text, team_size, budget, duration):
    scope = scope_text.lower()
    factors = []

    if team_size < 3:
        factors.append({
            "name": "Team Size",
            "likelihood": 0.7,
            "impact": 0.6,
            "mitigation": "👥 Add more developers to reduce workload."
        })

    if budget < 200000:
        factors.append({
            "name": "Budget Constraints",
            "likelihood": 0.6,
            "impact": 0.7,
            "mitigation": "💸 Increase budget or reduce feature scope."
        })

    if duration < 60:
        factors.append({
            "name": "Timeline Pressure",
            "likelihood": 0.65,
            "impact": 0.75,
            "mitigation": "⏱️ Extend delivery time or reduce scope."
        })

    if any(word in scope for word in ["health", "patient", "privacy", "hipaa", "medical", "regulation", "compliance"]):
        likelihood = 0.8
        impact = 0.9
        if team_size >= 15 and budget >= 5000000 and duration >= 180:
            likelihood = 0.4
            impact = 0.5
        factors.append({
            "name": "Healthcare / Compliance Risk",
            "likelihood": likelihood,
            "impact": impact,
            "mitigation": "🛡️ Involve legal/compliance consultant early."
        })

    if any(word in scope for word in ["ai", "chatbot", "ml", "nlp", "intelligence", "predictive", "recommendation"]):
        likelihood = 0.6
        impact = 0.75
        if team_size >= 15 and budget >= 5000000 and duration >= 180:
            likelihood = 0.3
            impact = 0.4
        factors.append({
            "name": "AI/ML Complexity",
            "likelihood": likelihood,
            "impact": impact,
            "mitigation": "🔧 Ensure experienced AI/ML devs are on the team."
        })

    return factors

# Suggested mitigations
def suggest_mitigation(duration, team_size, budget, risk_level, scope_text):
    tips = []
    if risk_level == "High":
        tips.append("⚠️ Review project scope and resourcing.")
    if budget < 200000:
        tips.append("💰 Consider increasing the budget.")
    if "health" in scope_text.lower() or "privacy" in scope_text.lower():
        tips.append("🔍 Involve compliance/legal early.")
    if team_size < 3:
        tips.append("👥 Consider growing the core team.")
    if duration < 45:
        tips.append("🕒 Timeline is tight — consider extensions.")
    return tips or ["✅ No major mitigations needed."]

# UI
st.title("🛡️ Project Risk Analyzer (Local, Smart & Visual)")

st.header("📋 Project Inputs")
duration = st.number_input("Project Duration (days)", min_value=1, value=60)
team_size = st.number_input("Team Size", min_value=1, value=3)
budget = st.number_input("Budget (LKR)", min_value=10000, step=5000, value=150000)
scope_text = st.text_area("📝 Describe the project scope:", value="Healthcare app with an AI chatbot to help patients")

# Main logic
if st.button("🚨 Analyze Risk"):
    predicted_risk, confidence = compute_scope_risk(scope_text)
    confidence = round(confidence, 2)

    # NEW: Dampening logic
    if duration >= 180 and team_size >= 20 and budget >= 5000000:
        if predicted_risk == "High" and confidence < 70:
            predicted_risk = "Medium"
            confidence -= 15
        elif predicted_risk == "Medium" and confidence < 60:
            predicted_risk = "Low"
            confidence -= 10

    st.subheader("📊 Risk Analysis Result")
    st.markdown(f"🔎 **Overall Risk**: {confidence}% → **{predicted_risk} impact**")

    st.subheader("🛠️ Suggested Mitigations")
    for tip in suggest_mitigation(duration, team_size, budget, predicted_risk, scope_text):
        st.markdown(f"- {tip}")

    risk_factors = generate_risk_factors(scope_text, team_size, budget, duration)

    if risk_factors:
        st.subheader("📋 Risk Breakdown Table")
        df_risks = pd.DataFrame(risk_factors)
        df_risks["Likelihood (%)"] = (df_risks["likelihood"] * 100).round()
        df_risks["Impact (%)"] = (df_risks["impact"] * 100).round()
        df_risks = df_risks[["name", "Likelihood (%)", "Impact (%)", "mitigation"]]
        df_risks.columns = ["Risk", "Likelihood (%)", "Impact (%)", "Mitigation"]
        st.dataframe(df_risks)

        st.subheader("📉 Risk Matrix (Likelihood vs Impact)")
        plt.figure(figsize=(6, 5))
        for risk in risk_factors:
            plt.scatter(risk["likelihood"], risk["impact"], s=200, label=risk["name"])
            plt.text(risk["likelihood"] + 0.01, risk["impact"] + 0.01, risk["name"], fontsize=9)
        plt.xlabel("Likelihood")
        plt.ylabel("Impact")
        plt.xlim(0, 1)
        plt.ylim(0, 1)
        plt.grid(True)
        plt.title("Risk Matrix")
        st.pyplot(plt)

    st.subheader("📌 PM Summary Insights")
    summary_points = []
    if predicted_risk == "Low":
        summary_points.append("✅ Project is well-resourced and clearly scoped.")
    else:
        summary_points.append(f"⚠️ Risk level is **{predicted_risk}**, with **{confidence:.0f}% confidence**.")

    if team_size < 3:
        summary_points.append("👥 Small team — delivery risk possible.")
    if budget < 200000:
        summary_points.append("💸 Budget is limited for high-scope projects.")
    if duration < 45:
        summary_points.append("⏱️ Very tight timeline may increase risk.")
    if any(w in scope_text.lower() for w in ["privacy", "regulation", "health"]):
        summary_points.append("🛡️ Scope includes sensitive data or domains — plan for compliance.")

    for point in summary_points:
        st.markdown(f"- {point}")
