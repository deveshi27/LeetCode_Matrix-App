# 📊 LeetMetric App

A lightweight web app that fetches coding practice statistics from LeetCode using a GraphQL API and visualizes them in an interactive pie chart. Designed to give users a clear summary of their coding performance across problem difficulty levels.

---

## ✨ Features

- 🔄 **Fetch real-time data** from LeetCode using GraphQL
- 📊 **Pie chart visualization** of solved problems (Easy / Medium / Hard)
- ⚡ **Clean UI** using HTML, CSS, and JavaScript
- 🧠 Simple and fast insight into problem-solving distribution

---

## 🚀 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **API:** LeetCode GraphQL Endpoint (via POST request)
- **Chart Library:** Chart.js (or custom SVG, if used)

---

## 💡 How It Works

1. User inputs their LeetCode username (or it’s hardcoded).
2. A GraphQL POST request fetches problem statistics.
3. The data is parsed and displayed in a pie chart showing:
   - Easy problems solved
   - Medium problems solved
   - Hard problems solved

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/leetmetric-app.git
cd leetmetric-app
# Just open index.html in the browser
