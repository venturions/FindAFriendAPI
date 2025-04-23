import { PrismaOrgRepository } from '../repositories/prisma/PrismaOrgRepository'
import { CreateOrgService } from '../services/CreateOrgService'

export function makeCreateOrgService() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgService = new CreateOrgService(orgRepository)

  return createOrgService
}
