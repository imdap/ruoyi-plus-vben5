export function warnLog(): string
export function errLog(): string

export interface VxeGlobalLog {
  create (type: 'log' | 'warn' | 'error', name?: string): ((key: string, args?: any) => string)
  warn(key: string, args?: any): string
  err(key: string, args?: any): string
}
