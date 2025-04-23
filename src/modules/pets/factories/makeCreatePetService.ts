import { PrismaOrgRepository } from '@/modules/orgs/repositories/prisma/PrismaOrgRepository'
import { PrismaPetRepository } from '../repositories/prisma/PrismaPetsRepository'
import { CreatePetService } from '../services/CreatePetService'

export function makeCreatePetService() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const createPetService = new CreatePetService(petRepository, orgRepository)

  return createPetService
}
