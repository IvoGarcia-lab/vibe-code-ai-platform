import { Request, Response, NextFunction } from 'express'
import { APIResponse } from '../types/index.js'

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error.message)
  console.error('Stack:', error.stack)

  const response: APIResponse<null> = {
    success: false,
    error: error.message || 'Internal server error'
  }

  res.status(500).json(response)
}

export const notFoundHandler = (req: Request, res: Response): void => {
  const response: APIResponse<null> = {
    success: false,
    error: `Route ${req.originalUrl} not found`
  }

  res.status(404).json(response)
}