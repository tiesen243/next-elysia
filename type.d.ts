interface Error {
  message?: string
  response?: string
  fieldsError?: Record<string, string>
}

interface Res<T = any> {
  message: string
  data?: T
}
