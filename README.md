🌀 Atomberg Smart Fan Controller

A simple, production-ready web application that allows users to control their Atomberg smart fans using the Atomberg Home Public APIs (Phoenix Platform).

📌 Features

Secure input of API Key and Refresh Token

Generation of Access Token (valid for 24 hours)

Fetch and display list of smart fans associated with the user

View current fan state (power, speed)

Control fan:

Power ON / OFF

Set Speed (1–6)

Clean and responsive UI

Production-correct architecture with backend proxy

🧠 Architecture Overview

Due to CORS restrictions on Atomberg public APIs, the application follows a real-world IoT architecture:

Frontend (Browser / Netlify)
        ↓
Backend Proxy (Node.js + Express / Render)
        ↓
Atomberg Phoenix Public APIs

Why a Backend is Required

Atomberg APIs do not allow browser-side CORS requests

Backend securely proxies API requests

Prevents direct exposure of API credentials

Matches production deployment standards

🛠️ Tech Stack
Frontend

HTML

CSS

Vanilla JavaScript

Hosted on Netlify

Backend

Node.js

Express

node-fetch

Hosted on Render

🔐 Authentication Flow

User enables Developer Mode in Atomberg Home App

API Key & Refresh Token are generated

Refresh Token is used to fetch Access Token

Access Token is used for all device operations

🚀 Live URLs

Frontend:
https://atomberg.netlify.app/

Backend:
https://atomberg-backend.onrender.com

▶️ How to Run Locally
Backend
cd atomberg-backend
npm install
node server.js


✅ Summary

This project demonstrates:

API integration skills

Secure system design

Practical IoT architecture

Production-ready thinking
