import re
from difflib import SequenceMatcher

# 🔧 Define base categories and keywords
CATEGORY_RULES = {
    "budget": [
        "budget", "cost", "finance", "expense", "overspend"
    ],
    "scope": [
        "scope", "requirement", "change request", "feature creep"
    ],
    "schedule": [
        "delay", "timeline", "schedule", "milestone", "deadline"
    ],
    "security": [
        "data breach", "encryption", "compliance", "security", "access"
    ],
    "resources": [
        "staff", "team", "workload", "resources", "expertise"
    ],
    "client": [
        "client", "communication", "feedback", "stakeholder"
    ]
}

MITIGATION_TEMPLATES = {
    "budget": "Review budget planning and explore additional funding sources.",
    "scope": "Freeze scope early and introduce formal change request procedures.",
    "schedule": "Use project tracking tools and set buffer times in the schedule.",
    "security": "Conduct audits and enforce strict access and data policies.",
    "resources": "Reassign or hire resources with suitable expertise.",
    "client": "Increase touchpoints with stakeholders and formalize approvals."
}

def match_category(title, category):
    content = f"{title} {category}".lower()
    for cat, keywords in CATEGORY_RULES.items():
        for keyword in keywords:
            if keyword in content or SequenceMatcher(None, keyword, content).ratio() > 0.8:
                return cat
    return "general"

def generate_mitigations(risks):
    suggestions = []

    for risk in risks:
        title = risk.get("title", "")
        category_text = risk.get("category", "")
        probability = risk.get("probability", 3)
        impact = risk.get("impact", 3)

        matched_category = match_category(title, category_text)
        base_suggestion = MITIGATION_TEMPLATES.get(matched_category, "Monitor the risk and involve key stakeholders.")

        # Adjust suggestion dynamically
        if probability >= 4 and impact >= 4:
            base_suggestion += " 🔺 This is high severity — escalate to project leadership."

        suggestions.append(base_suggestion)

    return suggestions
