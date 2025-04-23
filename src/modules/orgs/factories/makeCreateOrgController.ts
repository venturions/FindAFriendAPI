import { CreateOrgService } from '../services/CreateOrgService'
import { PrismaOrgRepository } from '../repositories/OrgRepository'

export function makeCreateOrgService() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgService = new CreateOrgService(orgRepository)

  return createOrgService
}
