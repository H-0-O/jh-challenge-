## 🧠 NestJS Challenge: Q\&A Platform

### 📝 Description

You're tasked to build a **Q\&A platform backend**, similar to StackOverflow, using NestJS. Users can post questions, assign tags to them, answer others’ questions, and vote on answers.

Please consider not using AI chats like chatGPT, your own writing is much appreciated rather than AI generated codes.

---

### ✅ Requirements

Implement the following RESTful APIs:

#### 👤 Users

- `POST /users` — Create user
- `GET /users` — List all users

#### 🏷️ Tags

- `POST /tags` — Create tag
- `GET /tags` — List all tags

#### ❓ Questions

- `POST /questions` — Create question (authenticated)
- `GET /questions` — Get all questions with pagination (`?page=1&limit=10`)
- `GET /questions/:id` — Get a single question with number of answers
- `POST /questions/:id/tags` — Assign tags to a question (authenticated)
- `GET /questions?tag=nestjs` — Filter questions by tag name

#### 💬 Answers

- `POST /questions/:id/answers` — Answer a question (authenticated)
- `PATCH /answers/:id/mark-correct` — Mark answer as correct (only the question owner)
- `GET /answers/:id/statistics` — Get answer stats (e.g., total votes)
- `POST /answers/:id/vote` — Vote (up/down) on an answer (authenticated)

---

### 📊 Stats to Return

- **`GET /questions/:id`**

  ```json
  {
    "id": 1,
    "title": "How to use Guards in NestJS?",
    "description": "...",
    "tags": ["nestjs", "guards"],
    "answersCount": 4
  }
  ```

- **`GET /answers/:id/statistics`**

  ```json
  {
    "id": 23,
    "content": "...",
    "votes": 12
  }
  ```

---

### ⚙️ Tech Constraints

- Use **PostgreSQL** with **TypeORM** or **Prisma**
- Use **NestJS Modules** (User, Question, Answer, Tag, Vote)

---

### 🌟 Bonus (Optional)

- Add `correct: boolean` to answer model and update it accordingly
- Return if the current user has voted on an answer
- Add Swagger for API documentation

---

### 🗂️ Models Overview

Here’s a rough entity relationship:

- `User` (id, name, email, password)
- `Tag` (id, name)
- `Question` (id, title, description, userId)
- `Answer` (id, content, userId, questionId, correct: boolean)
- `Vote` (id, userId, answerId, value: +1 or -1)
- Many-to-Many: `Question <-> Tag`
