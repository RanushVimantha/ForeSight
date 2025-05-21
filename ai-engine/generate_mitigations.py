# generate_mitigations.py
import os
import pandas as pd

def generate_mitigations(risks):
    """
    Very basic rule-based suggestions.
    You can replace this with AI later (transformers, NLP).
    """
    suggestions = []

    for r in risks:
        category = r.get("category", "").lower()
        impact = r.get("impact", 3)
        probability = r.get("probability", 3)
        title = r.get("title", "")

        recs = []

        if "delay" in title.lower() or category == "schedule":
            recs.append("Review project schedule and milestones.")

        if category == "technical":
            recs.append("Assign more experienced developers.")
            recs.append("Plan buffer time for technical risks.")

        if category == "budget" or impact >= 4:
            recs.append("Review budget allocations.")

        if probability >= 4:
            recs.append("Increase stakeholder communication.")
            recs.append("Conduct early testing and prototyping.")

        suggestions.append({
            "risk_id": r.get("id"),
            "title": title,
            "recommendations": recs or ["No specific recommendations."]
        })

    return suggestions
