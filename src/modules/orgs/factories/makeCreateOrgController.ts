import { CreateOrgService } from '../services/CreateOrgService'
import { CreateOrgController } from '../controller/CreateOrgController'
import { PrismaOrgRepository } from '../repositories/OrgRepository'

export function makeCreateOrgController(): CreateOrgController {
  const orgRepository = new PrismaOrgRepository()
  const createOrgService = new CreateOrgService(orgRepository)
  const createOrgController = new CreateOrgController(createOrgService)

  return createOrgController
}
