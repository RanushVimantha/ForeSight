def extract_tags(scope_text):
    tags = {
        "AI":  0,
        "Healthcare" : 0,
        "Finance" : 0,
        "Ecommerce" : 0,
        "Logistics" : 0,
        "Cybersecurity" : 0,
        "ComplianceRisk" : 0
    }

    lowered = scope_text.lower()

    if "ai" in lowered or "artificial intelligence" in lowered:
        tags["AI"] = 1
    if "healthcare" in lowered or "medical" in lowered:
        tags["Healthcare"] = 1
    if "finance" in lowered or "banking" in lowered:
        tags["Finance"] = 1
    if "ecommerce" in lowered or "online store" in lowered:
        tags["Ecommerce"] = 1
    if "logistics" in lowered or "supply chain" in lowered:
        tags["Logistics"] = 1
    if "compliance" in lowered or "regulation" in lowered:
        tags["ComplianceRisk"] = 1
    if "cybersecurity" in lowered or "data breach" in lowered:
        tags["Cybersecurity"] = 1

    return tags