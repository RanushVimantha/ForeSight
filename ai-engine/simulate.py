import numpy as np

def run_simulation(budget_mean, budget_std, duration_mean, duration_std, n_simulations=10000):
    # Randomly simulate 10,000 projects
    budget_samples = np.random.normal(loc=budget_mean, scale=budget_std, size=n_simulations)
    duration_samples = np.random.normal(loc=duration_mean, scale=duration_std, size=n_simulations)

    # Define risk thresholds
    budget_limit = budget_mean * 1.15   # 15% overrun considered a risk
    duration_limit = duration_mean * 1.10  # 10% delay considered a risk

    # Calculate probabilities
    prob_budget_overrun = (budget_samples > budget_limit).mean()
    prob_duration_overrun = (duration_samples > duration_limit).mean()

    # Combine scores
    risk_score = prob_budget_overrun + prob_duration_overrun
    if risk_score > 1.4:
        risk_level = "High"
    elif risk_score > 0.6:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "prob_budget_overrun": round(float(prob_budget_overrun) * 100, 2),
        "prob_duration_overrun": round(float(prob_duration_overrun) * 100, 2),
        "risk_level": risk_level
    }
