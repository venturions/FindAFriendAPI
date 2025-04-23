import { authenticate } from '@/modules/authenticate/controllers/authenticateController'
import { FastifyInstance } from 'fastify'

export async function authenticateRoutes(app: FastifyInstance) {
  app.post('/session', authenticate)
}
