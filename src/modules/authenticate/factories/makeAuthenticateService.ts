import { PrismaOrgRepository } from '@/modules/orgs/repositories/prisma/PrismaOrgRepository'
import { AuthenticateOrgService } from '../services/authenticateService'

export function makeAuthenticateService() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateOrgService = new AuthenticateOrgService(orgRepository)

  return authenticateOrgService
}
