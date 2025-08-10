export function successResponse<T>(data: T, message = 'Success', statusCode = 200) {
  return { statusCode, message, data };
}

export function errorResponse(message: string, statusCode = 400, data: any = null) {
  return { statusCode, message, data };
}
