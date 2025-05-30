# 💡 FoReSight – AI-Powered Risk Management Platform

An intelligent platform that predicts project risk levels, generates mitigation strategies, and provides SHAP-based explanations & Monte Carlo simulations.

---

## 🗂️ Project Structure

```
foresight-dashboard/     # React.js Frontend (MUI + Axios)
foresight-backend/       # Express.js API (Node.js + Sequelize + MySQL)
foresight-ai/            # Python Flask AI Engine (ML, SHAP, Monte Carlo)
```

---

## 🔧 Prerequisites

Before setup, ensure the following are installed:

- **Node.js** (v16 or later): https://nodejs.org
- **Python 3.9+**: https://python.org
- **MySQL** (Create DB `foresight_db`)
- **Git** (optional)

---

## 1️⃣ Backend Setup (Express + MySQL)

### 📍 Navigate:
```bash
cd foresight-backend
```

### 🔌 Install dependencies:
```bash
npm install
```
### ⚙️ Import Foresight Database
- Use the `foresight_db.sql` which is located in `foresight-backend > db` folder to import foresight database.

### 🛠️ Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=foresight_db
PORT=5000
DB_DIALECT=mysql

JWT_SECRET=supersecretjwtkey
```

### 🏃‍♂️ Run backend:
```bash
npx nodemon app.js
```

✅ API starts at `http://localhost:5000/api`

---

## 2️⃣ AI Engine Setup (Flask + ML)

### 📍 Navigate:
```bash
cd foresight-ai
```

### 🔁 (Optional) Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate (Windows)
```

### 🔌 Install Python dependencies:
```bash
pip install -r requirements.txt
```

### 📁 Ensure these files exist in `/models` and `/data`:
```
models/
├── risk_model.pkl
├── feature_columns.pkl
├── mitigation_model.pkl
data/
├── mitigation_examples.csv
```

### 🏃‍♂️ Run Flask app:
```bash
python app.py
```

✅ AI server starts at `http://localhost:5001`

---

## 3️⃣ Frontend Setup (React.js)

### 📍 Navigate:
```bash
cd foresight-dashboard
```

### 🔌 Install node modules:
```bash
npm install
```

### ⚙️ Update API endpoints (in `/api/axiosInstance.js` and `/api/aiService.js`):
```js
const API_BASE = "http://localhost:5000/api";     // backend
const AI_BASE  = "http://localhost:5001";         // AI engine
```

### 🏃‍♂️ Run frontend:
```bash
npm run dev
```

✅ Opens: http://localhost:3000

---

## 🔄 Commands Summary

| Task                  | Command                            |
|-----------------------|-------------------------------------|
| Start backend         | `npx nodemon app.js`               |
| Start AI engine       | `python app.py`                    |
| Start frontend        | `npm run dev`                      |
| Install backend deps  | `npm install`                      |
| Install frontend deps | `npm install`                      |
| Install AI deps       | `pip install -r requirements.txt`  |

---

## 🚀 Features

- 📊 **Project Risk Prediction**
- 🧠 **AI Mitigation Strategies** (Stored in DB)
- 📉 **SHAP Explanations**
- 🔁 **Monte Carlo Simulation**
- 📥 **Data-Driven Dashboards**
- 🔔 **Risk Alerts & Notifications**
- 🧩 **Extensible Risk Matrix**
- 🧾 **Logging & History Tracking**

---

## 🐞 Troubleshooting

- Ensure MySQL is running and accessible.
- You can find the foresight_db inside `foresight-backend > db` folder.
- Make sure `.env` values match DB credentials.
- Backend sync issues? Delete and recreate `foresight_db`.
- AI not responding? Check if `http://localhost:5001` is reachable.
- Make sure you have python version `Python 3.11.9 or below`. DO NOT INSTALL THE LATEST VERSION IT DOESN'T SUPPORT WITH THE CURRENT MODEL.

---

## 📬 Contact

For issues or improvements, please raise a GitHub issue or reach out to the project maintainer.