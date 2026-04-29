export function rolePath(role: string) {
  return role === 'school_admin' ? 'admin' : role.replace('_', '-')
}