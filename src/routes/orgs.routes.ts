import { FastifyInstance } from 'fastify'
import { create } from '@/modules/orgs/controller/CreateOrgController'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
}
