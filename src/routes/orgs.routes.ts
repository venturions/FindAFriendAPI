import { create } from '@/modules/orgs/controllers/CreateOrgController'
import { FastifyInstance } from 'fastify'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
}
