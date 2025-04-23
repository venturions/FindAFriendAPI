import fastify from 'fastify'
import { errorHandler } from './middlewares/errorHandler'

export const app = fastify()

app.setErrorHandler(errorHandler)
