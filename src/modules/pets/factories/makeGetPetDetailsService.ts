import { PrismaPetRepository } from '../repositories/prisma/PrismaPetsRepository'
import { GetPetDetailsService } from '../services/GetPetDetailsService'

export function makeGetPetDetailsService() {
  const petRepository = new PrismaPetRepository()
  const getPetDetailsService = new GetPetDetailsService(petRepository)

  return getPetDetailsService
}
