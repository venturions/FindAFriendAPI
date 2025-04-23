import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { errorHandler } from './middlewares/errorHandler'

export const app = fastify()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecretkey',
})

// Middleware global para tratamento de erros
app.setErrorHandler(errorHandler)
