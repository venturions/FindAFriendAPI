import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { errorHandler } from './middlewares/errorHandler'
import { authenticateRoutes } from './routes/authenticate.routes'
import { orgRoutes } from './routes/orgs.routes'
import { petRoutes } from './routes/pets.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecretkey',
})

app.register(orgRoutes)
app.register(authenticateRoutes)
app.register(petRoutes)

// Middleware global para tratamento de erros
app.setErrorHandler(errorHandler)
