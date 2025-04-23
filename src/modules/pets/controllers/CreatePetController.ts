import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrgRepository } from '@/modules/orgs/repositories/prisma/PrismaOrgRepository'
import { PrismaPetRepository } from '../repositories/prisma/PrismaPetsRepository'
import { CreatePetService } from '../repositories/services/CreatePetService'
import { OrganizationNotFoundError } from '@/shared/errors/OrganizationNotFoundError'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    environment: z.string(),
    description: z.string(),
    photos: z.array(z.string()),
    adoptionRequirements: z.array(z.string()),
    city: z.string(),
  })

  try {
    const data = createPetSchema.parse(request.body)

    const orgId = request.user.sub

    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()
    const createPetService = new CreatePetService(petRepository, orgRepository)

    const { pet } = await createPetService.execute({
      ...data,
      orgId,
    })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
