import { PrismaPetRepository } from '../repositories/prisma/PrismaPetsRepository'
import { ListPetsByCityService } from '../services/ListPetsByCityService'

export function makeListPetsByCityService() {
  const petRepository = new PrismaPetRepository()
  const listPetsByCityService = new ListPetsByCityService(petRepository)

  return listPetsByCityService
}
