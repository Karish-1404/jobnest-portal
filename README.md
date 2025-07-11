# JobNest – Full Stack Job Portal

JobNest is a responsive job portal where users can post and apply for jobs. It includes user authentication, resume upload, and company logo support.

## Tech Stack

- Frontend: React.js, HTML, CSS
- Backend: Node.js, Express.js
- Database: MySQL

## Features

- User registration and login (JWT based)
- Post jobs (only for logged-in users)
- Apply for jobs with resume, name, and email
- Upload company logo with job posts
- View job details
- “Posted X days ago” info
- Responsive and professional UI
- Redirect to login if not authenticated
- Protected .env and uploads

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/jobnest.git
cd jobnest
```

### 2. Import SQL

- Open MySQL Workbench
- Import `jobnest.sql` from the `database/` folder

### 3. Set up `.env` in `backend/`

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=jobnest
JWT_SECRET=your_secret_key
```

### 4. Start Backend

```bash
cd backend
npm install
node server.js
```

### 5. Start Frontend

```bash
cd ../frontend
npm install
npm start
```

## Notes

- Frontend: http://localhost:3000  
- Backend: http://localhost:5000  
- `.env`, `node_modules`, `uploads/`, and `.sql` are ignored in `.gitignore`

---


