import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from 'generated/prisma'
import { PetRepository } from '../PetsRepository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: { city },
    })

    return pets
  }

  async findByFilters(filters: {
    city: string
    age?: string
    energyLevel?: string
    size?: string
    independenceLevel?: string
  }): Promise<Pet[]> {
    const { city, age, energyLevel, size, independenceLevel } = filters

    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...(age && { age }),
        ...(energyLevel && { energyLevel }),
        ...(size && { size }),
        ...(independenceLevel && { independenceLevel }),
      },
    })

    return pets
  }
}
