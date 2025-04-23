import { FastifyInstance } from 'fastify'
import { CreateOrgService } from './modules/orgs/services/CreateOrgService'
import { CreateOrgController } from './modules/orgs/controller/CreateOrgController'
import { PrismaOrgRepository } from './modules/orgs/repositories/OrgRepository'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', async (request, reply) => {
    const orgRepository = new PrismaOrgRepository()
    const createOrgService = new CreateOrgService(orgRepository)
    const createOrgController = new CreateOrgController(createOrgService)

    await createOrgController.handle(request, reply)
  })
}
