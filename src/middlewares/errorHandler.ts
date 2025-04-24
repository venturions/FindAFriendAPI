import { CityNotProvidedError } from '@/modules/pets/errors/CityNotProvidedErrors'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  // Tratamento de erros de validação do Zod
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.errors,
    })
  }

  if (error instanceof CityNotProvidedError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
