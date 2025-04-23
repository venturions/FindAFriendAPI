import { FastifyInstance } from 'fastify'
import { makeCreateOrgController } from '@/modules/orgs/factories/makeCreateOrgController'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', async (request, reply) => {
    const createOrgController = makeCreateOrgController()

    await createOrgController.handle(request, reply)
  })
}
