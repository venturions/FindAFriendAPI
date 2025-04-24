import { PetNotFoundError } from '../errors/PetNotFoundError'
import { PetRepository } from '../repositories/PetsRepository'
import { Pet } from 'generated/prisma'

interface GetPetDetailsRequest {
  id: string
}

interface GetPetDetailsResponse {
  pet: Pet
}

export class GetPetDetailsService {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: GetPetDetailsRequest): Promise<GetPetDetailsResponse> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
