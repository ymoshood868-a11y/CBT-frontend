import { http, HttpResponse, delay } from 'msw'
import { teacherMock, studentMock, adminMock, superAdminMock, invigilatorMock } from './mock-data'

export const demoHandlers = [
  // Student endpoints
  http.get('*/api/student/exams', async () => {
    await delay(200)
    return HttpResponse.json(studentMock.exams)
  }),
  http.get('*/api/student/results', async () => {
    await delay(250)
    return HttpResponse.json(studentMock.results)
  }),
  http.post('*/api/sessions/:examId/join', async ({ params }) => {
    await delay(300)
    return HttpResponse.json({ session_id: `session-${params.examId}`, message: 'Session created' })
  }),
  http.get('*/api/sessions/:sessionId', async ({ params }) => {
    await delay(200)
    return HttpResponse.json({
      id: params.sessionId,
      exam_name: 'Mathematics Mid-Term Exam',
      remaining_seconds: 5400,
      questions: [],
    })
  }),
  http.put('*/api/sessions/:sessionId/answers', async () => {
    await delay(100)
    return HttpResponse.json({ success: true })
  }),
  http.put('*/api/sessions/:sessionId/answers/bulk', async () => {
    await delay(150)
    return HttpResponse.json({ success: true })
  }),
  http.post('*/api/sessions/:sessionId/submit', async () => {
    await delay(400)
    return HttpResponse.json({ success: true, message: 'Exam submitted successfully' })
  }),
  http.post('*/api/sessions/:sessionId/events', async () => {
    await delay(50)
    return HttpResponse.json({ success: true })
  }),

  // Teacher endpoints
  http.get('*/api/exams', async () => {
    await delay(300)
    return HttpResponse.json(teacherMock.exams)
  }),
  http.get('*/api/teacher/stats', async () => {
    await delay(250)
    return HttpResponse.json(teacherMock.stats)
  }),
  http.post('*/api/exams', async () => {
    await delay(500)
    return HttpResponse.json({ id: 'exam-new', message: 'Exam created successfully' })
  }),
  http.put('*/api/exams/:id', async () => {
    await delay(400)
    return HttpResponse.json({ success: true, message: 'Exam updated' })
  }),
  http.delete('*/api/exams/:id', async () => {
    await delay(300)
    return HttpResponse.json({ success: true, message: 'Exam deleted' })
  }),
  http.get('*/api/questions', async () => {
    await delay(300)
    return HttpResponse.json([])
  }),
  http.post('*/api/questions', async () => {
    await delay(400)
    return HttpResponse.json({ id: 'question-new', message: 'Question created' })
  }),

  // Admin endpoints
  http.get('*/api/admin/users', async () => {
    await delay(300)
    return HttpResponse.json(adminMock.users)
  }),
  http.get('*/api/admin/stats', async () => {
    await delay(250)
    return HttpResponse.json(adminMock.stats)
  }),
  http.get('*/api/admin/exams/pending', async () => {
    await delay(200)
    return HttpResponse.json(adminMock.exams_pending)
  }),
  http.post('*/api/exams/:id/approve', async () => {
    await delay(500)
    return HttpResponse.json({ success: true, status: 'PUBLISHED', message: 'Exam approved successfully' })
  }),
  http.post('*/api/exams/:id/reject', async () => {
    await delay(500)
    return HttpResponse.json({ success: true, message: 'Exam rejected' })
  }),
  http.post('*/api/admin/users', async () => {
    await delay(400)
    return HttpResponse.json({ id: 'user-new', message: 'User created' })
  }),

  // Super Admin endpoints
  http.get('*/api/super-admin/analytics', async () => {
    await delay(400)
    return HttpResponse.json(superAdminMock.analytics)
  }),
  http.get('*/api/super-admin/schools', async () => {
    await delay(350)
    return HttpResponse.json(superAdminMock.schools)
  }),
  http.post('*/api/super-admin/schools', async () => {
    await delay(600)
    return HttpResponse.json({ id: 'school-new', message: 'School created successfully' })
  }),
  http.put('*/api/super-admin/schools/:id', async () => {
    await delay(500)
    return HttpResponse.json({ success: true, message: 'School updated' })
  }),
  http.post('*/api/super-admin/schools/:id/suspend', async () => {
    await delay(400)
    return HttpResponse.json({ success: true, message: 'School suspended' })
  }),
  http.post('*/api/super-admin/schools/:id/activate', async () => {
    await delay(400)
    return HttpResponse.json({ success: true, message: 'School activated' })
  }),

  // Invigilator endpoints
  http.get('*/api/invigilator/rooms', async () => {
    await delay(300)
    return HttpResponse.json(invigilatorMock.rooms)
  }),
  http.get('*/api/invigilator/rooms/:id/students', async () => {
    await delay(250)
    return HttpResponse.json(invigilatorMock.students)
  }),
  http.post('*/api/invigilator/retake-request', async () => {
    await delay(500)
    return HttpResponse.json({ success: true, message: 'Retake request submitted' })
  }),

  // Auth endpoints
  http.post('*/api/auth/login', async () => {
    await delay(400)
    return HttpResponse.json({
      user: studentMock,
      access_token: 'demo-token',
      refresh_token: 'demo-refresh',
    })
  }),
  http.post('*/api/auth/refresh', async () => {
    await delay(200)
    return HttpResponse.json({
      access_token: 'demo-token-new',
      refresh_token: 'demo-refresh-new',
    })
  }),
  http.post('*/api/auth/logout', async () => {
    await delay(150)
    return HttpResponse.json({ success: true })
  }),

  // Notifications
  http.get('*/api/notifications', async () => {
    await delay(200)
    return HttpResponse.json([
      { id: '1', type: 'info', message: 'New exam assigned', read: false, created_at: '2026-04-25T09:00:00Z' },
      { id: '2', type: 'success', message: 'Result released', read: false, created_at: '2026-04-24T14:00:00Z' },
      { id: '3', type: 'warning', message: 'Exam starting soon', read: true, created_at: '2026-04-23T10:00:00Z' },
    ])
  }),
  http.put('*/api/notifications/:id/read', async () => {
    await delay(100)
    return HttpResponse.json({ success: true })
  }),
]
