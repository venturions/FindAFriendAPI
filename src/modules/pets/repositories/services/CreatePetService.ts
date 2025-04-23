import { OrgRepository } from '@/modules/orgs/repositories/OrgRepository'
import { Pet } from 'generated/prisma'
import { PetRepository } from '../PetsRepository'
import { OrganizationNotFoundError } from '@/shared/errors/OrganizationNotFoundError'

interface CreatePetRequest {
  name: string
  age: string
  size: string
  energyLevel: string
  independenceLevel: string
  environment: string
  description: string
  photos: string[]
  adoptionRequirements: string[]
  city: string
  orgId: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute(data: CreatePetRequest): Promise<CreatePetResponse> {
    const orgExists = await this.orgRepository.findById(data.orgId)

    if (!orgExists) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petRepository.create(data)

    return { pet }
  }
}
