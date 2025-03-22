# Moodle - Quiz Portal

**Moodle** is a Quiz Portal where **users** can take quizzes, view their scores, and **admins** can add and manage quizzes and questions. The project follows a **microservices architecture** and is built with **ReactJS** for the frontend, **Spring Boot** (Java) for the backend, and **MySQL** for the database. The system is divided into three services: **QuestionService**, **QuizService**, and **UserService**.

## Features

### Admin Role:
- Admins can create new quizzes.
- Admins can add questions to quizzes.
- Admins can view and manage quizzes and their questions.

### User Role:
- Users can take any available quiz.
- After submitting a quiz, users can see their scores.

---

## Tech Stack

- **Frontend**:
  - ReactJS
  - Axios (for API communication)

- **Backend**:
  - Spring Boot (Java)
  - MySQL (Database)

- **Microservices**:
  - **QuestionService**: Manages the questions for quizzes.
  - **QuizService**: Manages quizzes and links questions to them.
  - **UserService**: Manages user authentication, login, and score tracking.

---

## Microservices Architecture

The project uses **three microservices**:

### **1. QuestionService**:
- Manages quiz questions.
- Allows the admin to add, update, and remove questions.

### **2. QuizService**:
- Manages quizzes and associates them with questions.
- Allows the admin to create quizzes and link questions.

### **3. UserService**:
- Handles user registration, login, and session management.
- Tracks user scores after quiz submission.

---

## Database Schema

### **1. User Table**
- **Columns**:
  - `id`: Unique identifier for the user.
  - `username`: User's login name.
  - `password`: Encrypted password.
  - `role`: User's role.

### **2. Quiz Table**
- **Columns**:
  - `id`: Unique identifier for the quiz.
  - `title`: Title of the quiz.
  - `description`: Description of the quiz.

### **3. Question Table**
- **Columns**:
  - `id`: Unique identifier for the question.
  - `quiz_id`: Foreign key to the Quiz table.
  - `question_text`: The question text.
  - `answer_options`: Answer options in JSON format.
  - `correct_answer`: The correct answer.

---

