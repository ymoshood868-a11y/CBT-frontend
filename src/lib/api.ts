import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

// JSON Server API (for development)
const API_BASE_URL = 'http://localhost:3001'

export const api = axios.create({ 
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      // For json-server, we'll skip refresh token logic
      // In production, implement proper refresh token flow
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const apiEndpoints = {
  // Users
  getUsers: () => api.get('/users'),
  getUser: (id: number) => api.get(`/users/${id}`),
  createUser: (data: any) => api.post('/users', data),
  updateUser: (id: number, data: any) => api.patch(`/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/users/${id}`),

  // Exams
  getExams: () => api.get('/exams'),
  getExam: (id: number) => api.get(`/exams/${id}`),
  createExam: (data: any) => api.post('/exams', data),
  updateExam: (id: number, data: any) => api.patch(`/exams/${id}`, data),
  deleteExam: (id: number) => api.delete(`/exams/${id}`),

  // Questions
  getQuestions: (examId?: number) => 
    examId ? api.get(`/questions?examId=${examId}`) : api.get('/questions'),
  getQuestion: (id: number) => api.get(`/questions/${id}`),
  createQuestion: (data: any) => api.post('/questions', data),
  updateQuestion: (id: number, data: any) => api.patch(`/questions/${id}`, data),
  deleteQuestion: (id: number) => api.delete(`/questions/${id}`),

  // Exam Sessions
  getExamSessions: (studentId?: number) => 
    studentId ? api.get(`/examSessions?studentId=${studentId}`) : api.get('/examSessions'),
  getExamSession: (id: number) => api.get(`/examSessions/${id}`),
  createExamSession: (data: any) => api.post('/examSessions', data),
  updateExamSession: (id: number, data: any) => api.patch(`/examSessions/${id}`, data),

  // Answers
  getAnswers: (sessionId?: number) => 
    sessionId ? api.get(`/answers?sessionId=${sessionId}`) : api.get('/answers'),
  createAnswer: (data: any) => api.post('/answers', data),
  updateAnswer: (id: number, data: any) => api.patch(`/answers/${id}`, data),

  // Results
  getResults: (studentId?: number) => 
    studentId ? api.get(`/results?studentId=${studentId}`) : api.get('/results'),
  getResult: (id: number) => api.get(`/results/${id}`),
  createResult: (data: any) => api.post('/results', data),

  // Students (for monitoring)
  getStudents: (examId?: number) => 
    examId ? api.get(`/students?examId=${examId}`) : api.get('/students'),
  getStudent: (id: number) => api.get(`/students/${id}`),
  updateStudent: (id: number, data: any) => api.patch(`/students/${id}`, data),

  // Schools (Super Admin)
  getSchools: () => api.get('/schools'),
  getSchool: (id: number) => api.get(`/schools/${id}`),
  createSchool: (data: any) => api.post('/schools', data),
  updateSchool: (id: number, data: any) => api.patch(`/schools/${id}`, data),
  deleteSchool: (id: number) => api.delete(`/schools/${id}`),

  // Subscriptions (Super Admin)
  getSubscriptions: (schoolId?: number) => 
    schoolId ? api.get(`/subscriptions?schoolId=${schoolId}`) : api.get('/subscriptions'),
  getSubscription: (id: number) => api.get(`/subscriptions/${id}`),
  createSubscription: (data: any) => api.post('/subscriptions', data),
  updateSubscription: (id: number, data: any) => api.patch(`/subscriptions/${id}`, data),

  // Backups (Super Admin)
  getBackups: () => api.get('/backups'),
  getBackup: (id: number) => api.get(`/backups/${id}`),
  createBackup: (data: any) => api.post('/backups', data),
  deleteBackup: (id: number) => api.delete(`/backups/${id}`),

  // System Configuration (Super Admin)
  getSystemConfig: () => api.get('/systemConfig'),
  updateSystemConfig: (data: any) => api.put('/systemConfig', data),

  // Subjects
  getSubjects: () => api.get('/subjects'),
  getSubject: (id: number) => api.get(`/subjects/${id}`),
  createSubject: (data: any) => api.post('/subjects', data),
  updateSubject: (id: number, data: any) => api.patch(`/subjects/${id}`, data),
  deleteSubject: (id: number) => api.delete(`/subjects/${id}`),

  // Classes
  getClasses: () => api.get('/classes'),
  getClass: (id: number) => api.get(`/classes/${id}`),
  createClass: (data: any) => api.post('/classes', data),
  updateClass: (id: number, data: any) => api.patch(`/classes/${id}`, data),
  deleteClass: (id: number) => api.delete(`/classes/${id}`),

  // Notifications
  getNotifications: (userId?: number) => 
    userId ? api.get(`/notifications?userId=${userId}`) : api.get('/notifications'),
  getNotification: (id: number) => api.get(`/notifications/${id}`),
  createNotification: (data: any) => api.post('/notifications', data),
  updateNotification: (id: number, data: any) => api.patch(`/notifications/${id}`, data),
  deleteNotification: (id: number) => api.delete(`/notifications/${id}`),
  markNotificationAsRead: (id: number) => api.patch(`/notifications/${id}`, { isRead: true }),
}
