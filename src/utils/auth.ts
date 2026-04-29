export interface User {
  email?: string
  studentId?: string
  password: string
  role: string
}

const STORAGE_KEY = "cbt_users"

// Save user
export function saveUser(user: User) {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

// Get all users
export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// Find user
export function findUser(identifier: string, password: string) {
  const users = getUsers()

  return users.find(
    (u) =>
      (u.email === identifier || u.studentId === identifier) &&
      u.password === password
  )
}