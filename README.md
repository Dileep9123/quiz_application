# 🧠 Quiz Platform - Microservice Architecture with React Frontend

This is a full-stack Quiz Application built using a microservice architecture. The platform allows users  to register, create quizzes, submit responses, and view statistics and profiles.

---

## 🏗️ Architecture Overview
[React Frontend] → [API Gateway (Spring Boot)] → [Microservices: User | Quiz | Submission]


- **Frontend**: React with Tailwind CSS
- **Backend**: Java Spring Boot Microservices
- **Database**: MySQL / PostgreSQL (per service)
- **Context Management**: React Context API
- **UI Feedback**: `react-hot-toast`
- **Security**: Basic auth (extendable to JWT)

---

## 📁 Project Structure

├── frontend/
│ └── quiz-platform-react/ # React frontend
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── service/
│ └── ...
├── backend/
│ ├── api-gateway/ # Spring Boot Gateway
│ ├── user-service/ # Manages registration, login, profile
│ ├── quiz-service/ # Handles quizzes and questions
│ └── submission-service/ # Handles quiz submissions and results



---

## 🚀 Features

- 🔐 User Registration & Login
- 📝 Create & Attempt Quizzes
- 📊 View Submissions and Stats
- 👤 Profile Page with Logout
- 🎨 Clean Tailwind CSS styling
- ☁️ Backend Microservices with Spring Boot

---

## 🛠️ Technologies Used

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Spring Boot
- Spring Data JPA
- Spring Cloud Gateway
- MySQL / PostgreSQL
- Eureka (if service discovery is used)
- REST API

---

## 🧪 Running the Application
### 🔧 Frontend

```bash
cd frontend/quiz-platform-react
npm install
npm start

```
### 🔧 Backend (Microservices)
Each microservice is a separate Spring Boot application. Run them using your IDE or with:

```bash
cd backend/user-service
./mvnw spring-boot:run

cd ../quiz-service
./mvnw spring-boot:run

cd ../submission-service
./mvnw spring-boot:run

cd ../api-gateway
./mvnw spring-boot:run

