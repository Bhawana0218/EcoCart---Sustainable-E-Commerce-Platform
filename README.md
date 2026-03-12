# 🌱 Sustainability Impact Dashboard with AI Chatbot

A full-stack web application that helps businesses track their sustainability impact through product usage, orders, and environmental savings while interacting with an AI-powered chatbot for quick assistance.

This project provides a **real-time dashboard**, **product and order management system**, and a **chatbot interface** that helps users retrieve product information and order insights from the database.

---

## ✨ Features

### 📦 Product Management

* Add new sustainable products to the system
* Edit product details to update sustainability metrics
* Delete products when they are no longer available
* View all products in an organized table format

### 🛒 Order Management

* Place product orders directly from the dashboard
* Automatically generate unique order IDs
* Track order history and sustainability impact

### 📊 Dashboard Analytics

* Interactive dashboard displaying sustainability metrics
* Visual data representation using **Donut Charts and Bar Graphs**
* Monthly environmental impact analysis
* Summary cards showing total orders, products, and environmental savings

### 📄 Reports

* Generate and download sustainability reports
* Export product and order data for analysis

### 🤖 AI Chatbot

* Real-time chatbot interface for interacting with the system
* Fetches product-related information from the database
* Provides quick insights about products and sustainability metrics

### 🔄 Real-Time Updates

* Live conversation updates using **WebSockets**
* Dynamic UI updates without page refresh

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* Socket.io Client
* Lucide React Icons
* Recharts (for charts)

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* OpenAI API / AI Integration

## Tools

* Vite (React build tool)
* Git & GitHub
* Postman
* VS Code

---

# 📂 Project Structure

```
project-root
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── components
│   │   ├── ProductTable
│   │   ├── OrderTable
│   │   ├── ImpactChart
│   │   ├── SummaryCards
│   │   └── ChatBubble
│   │
│   ├── pages
│   │   ├── Dashboard
|   |   |---Produsts
|   |   |---Orders
│   │   └── Conversations
│   │
│   ├── api
│   │   └── api.js
│   │
│   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

Run backend:

```bash
npm start
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the backend folder.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

---

# 📊 Key Functionalities

### Sustainability Metrics

The system calculates environmental impact such as:

* Plastic saved
* Carbon emissions reduced
* Order sustainability metrics
* Monthly environmental impact

---

### Chatbot Integration

The chatbot can:

* Answer product-related questions
* Provide sustainability insights
* Fetch information directly from the database
* Respond in real time

---

# 🖥 Screenshots

### Dashboard

Displays sustainability analytics and product statistics.

### Chatbot Interface

Real-time conversation with AI chatbot.

### Product Management

Add, edit, and manage sustainable products.

---

# 🌍 Use Case

This project can be used by:

* Eco-friendly product companies
* Sustainability tracking platforms
* Environmental analytics tools
* Green commerce applications

---

# 📈 Future Improvements

* User authentication
* Admin dashboard
* Advanced AI chatbot with RAG
* Sustainability reports
* Data export (PDF / CSV)
* Order tracking system

---

# 👩‍💻 Author

Developed by **Bhawana Bisht**

---

# ⭐ Contribute

Contributions, issues, and feature requests are welcome!

If you like this project, consider giving it a ⭐ on GitHub.
