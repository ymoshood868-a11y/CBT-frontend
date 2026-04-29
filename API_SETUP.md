# 🚀 JSON Server API Setup - Complete!

## ✅ What's Been Set Up

### 1. JSON Server Installed
- `json-server` - Mock REST API
- `concurrently` - Run multiple servers together

### 2. Database File Created
**File:** `db.json`

**Collections:**
- `users` - Students, teachers, invigilators, admins
- `exams` - All exams with details
- `questions` - Exam questions (multiple choice & theory)
- `examSessions` - Active exam sessions
- `answers` - Student answers
- `results` - Exam results (15 results included)
- `students` - Student monitoring data

### 3. Scripts Updated
**package.json:**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:api\"",
    "dev:frontend": "vite",
    "dev:api": "json-server --watch db.json --port 3001"
  }
}
```

### 4. API Utility Updated
**File:** `src/lib/api.ts`
- Base URL: `http://localhost:3001`
- All CRUD endpoints configured
- Ready to use in components

---

## 🚀 How to Run

### Start Both Servers:
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

### Or Run Separately:
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - API
npm run dev:api
```

---

## 📡 API Endpoints

### Base URL: `http://localhost:3001`

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Exams
- `GET /exams` - Get all exams
- `GET /exams/:id` - Get exam by ID
- `POST /exams` - Create exam
- `PATCH /exams/:id` - Update exam
- `DELETE /exams/:id` - Delete exam

### Questions
- `GET /questions` - Get all questions
- `GET /questions?examId=1` - Get questions for exam
- `GET /questions/:id` - Get question by ID
- `POST /questions` - Create question
- `PATCH /questions/:id` - Update question
- `DELETE /questions/:id` - Delete question

### Exam Sessions
- `GET /examSessions` - Get all sessions
- `GET /examSessions?studentId=1` - Get student sessions
- `GET /examSessions/:id` - Get session by ID
- `POST /examSessions` - Create session
- `PATCH /examSessions/:id` - Update session

### Answers
- `GET /answers` - Get all answers
- `GET /answers?sessionId=1` - Get answers for session
- `POST /answers` - Create answer
- `PATCH /answers/:id` - Update answer

### Results
- `GET /results` - Get all results
- `GET /results?studentId=1` - Get student results
- `GET /results/:id` - Get result by ID
- `POST /results` - Create result

### Students (Monitoring)
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `PATCH /students/:id` - Update student status

---

## 💻 How to Use in Components

### Example 1: Fetch Results
```typescript
import { apiEndpoints } from '@/lib/api';
import { useEffect, useState } from 'react';

function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    apiEndpoints.getResults(1) // studentId = 1
      .then(data => setResults(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {results.map(result => (
        <div key={result.id}>{result.examName}: {result.score}%</div>
      ))}
    </div>
  );
}
```

### Example 2: Create Exam
```typescript
import { apiEndpoints } from '@/lib/api';

async function createExam(examData) {
  try {
    const newExam = await apiEndpoints.createExam({
      title: "New Exam",
      subject: "Mathematics",
      class: "SS3A",
      duration: 90,
      totalMarks: 100,
      passMark: 40,
      status: "draft",
      createdBy: 2,
      createdAt: new Date().toISOString()
    });
    console.log('Exam created:', newExam);
  } catch (error) {
    console.error('Error creating exam:', error);
  }
}
```

### Example 3: Update Student Status (Invigilator)
```typescript
import { apiEndpoints } from '@/lib/api';

async function pauseStudent(studentId) {
  try {
    await apiEndpoints.updateStudent(studentId, {
      status: 'paused'
    });
    alert('Student paused');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Example 4: Submit Answer
```typescript
import { apiEndpoints } from '@/lib/api';

async function submitAnswer(sessionId, questionId, answer) {
  try {
    await apiEndpoints.createAnswer({
      sessionId,
      questionId,
      answer,
      flagged: false,
      answeredAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
}
```

---

## 🔍 Testing the API

### Using Browser:
Visit: http://localhost:3001

You'll see:
```json
{
  "users": "http://localhost:3001/users",
  "exams": "http://localhost:3001/exams",
  "questions": "http://localhost:3001/questions",
  "examSessions": "http://localhost:3001/examSessions",
  "answers": "http://localhost:3001/answers",
  "results": "http://localhost:3001/results",
  "students": "http://localhost:3001/students"
}
```

### Using curl:
```bash
# Get all results
curl http://localhost:3001/results

# Get specific result
curl http://localhost:3001/results/1

# Create new exam
curl -X POST http://localhost:3001/exams \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Exam","subject":"Math","class":"SS3A"}'

# Update student
curl -X PATCH http://localhost:3001/students/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"paused"}'
```

---

## 📊 Sample Data Included

### Users (4):
- Student (student@test.com)
- Teacher (teacher@test.com)
- Invigilator (invigilator@test.com)
- Admin (admin@test.com)

### Exams (3):
- Mathematics Mid-Term Exam
- English Language Quiz
- Physics Final Exam

### Questions (3):
- Sample multiple choice
- Sample theory question

### Results (15):
- All 15 subjects with complete data
- Grades A, B, C, F
- Pass/Fail status

### Students (3):
- In Progress
- Not Started
- Flagged with suspicious activities

---

## 🔄 JSON Server Features

### Filtering:
```
GET /results?studentId=1
GET /questions?examId=1
GET /results?status=passed
```

### Sorting:
```
GET /results?_sort=score&_order=desc
GET /exams?_sort=createdAt&_order=asc
```

### Pagination:
```
GET /results?_page=1&_limit=10
```

### Full-text Search:
```
GET /exams?q=mathematics
```

### Relationships:
```
GET /exams?_embed=questions
GET /results?_expand=exam
```

---

## 🎯 Next Steps

### To Replace Mock Data:

1. **Student Results Page:**
```typescript
// Before (mock data)
const results = [/* hardcoded */];

// After (API)
import { apiEndpoints } from '@/lib/api';
const [results, setResults] = useState([]);
useEffect(() => {
  apiEndpoints.getResults(studentId).then(setResults);
}, []);
```

2. **Teacher Create Exam:**
```typescript
// In handlePublish function
const newExam = await apiEndpoints.createExam(examData);
navigate('/teacher/exams');
```

3. **Invigilator Monitor:**
```typescript
// Real-time updates
useEffect(() => {
  const interval = setInterval(() => {
    apiEndpoints.getStudents(examId).then(setStudents);
  }, 5000); // Update every 5 seconds
  return () => clearInterval(interval);
}, []);
```

---

## 🛠️ Troubleshooting

### Port Already in Use:
```bash
# Change port in package.json
"dev:api": "json-server --watch db.json --port 3002"

# Update API_BASE_URL in src/lib/api.ts
const API_BASE_URL = 'http://localhost:3002'
```

### CORS Issues:
JSON Server automatically handles CORS, but if needed:
```bash
json-server --watch db.json --port 3001 --host 0.0.0.0
```

### Data Not Persisting:
- Changes are saved to `db.json` automatically
- Check file permissions
- Don't edit `db.json` while server is running

---

## ✅ Summary

**What's Working:**
- ✅ JSON Server running on port 3001
- ✅ Frontend running on port 5173
- ✅ Both start with `npm run dev`
- ✅ Full REST API with CRUD operations
- ✅ Sample data for all collections
- ✅ API utility with all endpoints
- ✅ Ready to integrate with components

**To Use:**
1. Run `npm run dev`
2. Import `apiEndpoints` in components
3. Replace mock data with API calls
4. Test with browser/curl

**Database File:** `db.json` (edit to add more data)
**API Docs:** http://localhost:3001
**Frontend:** http://localhost:5173

🚀 **Ready to use!**
