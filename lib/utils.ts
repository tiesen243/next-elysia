import { QueryClient } from '@tanstack/react-query'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Create a new query client
const createQueryClient = () => new QueryClient()
let clientQueryClientSingleton: QueryClient | undefined = undefined
export const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}
