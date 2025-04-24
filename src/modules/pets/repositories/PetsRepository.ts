import { Prisma, Pet } from 'generated/prisma'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(city: string): Promise<Pet[]>
  findByFilters(filters: {
    city: string
    age?: string
    energyLevel?: string
    size?: string
    independenceLevel?: string
  }): Promise<Pet[]>
}
