import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPetsByCityService } from '../factories/makeListPetsByCityService'
import { CityNotProvidedError } from '../errors/CityNotProvidedErrors'

export async function listPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listPetsByCityQuerySchema = z.object({
    city: z.string().min(1, 'City is required'),
  })

  try {
    const { city } = listPetsByCityQuerySchema.parse(request.query)

    const listPetsByCityService = makeListPetsByCityService()

    const pets = await listPetsByCityService.execute({ city })

    return reply.status(200).send(pets)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new CityNotProvidedError()
    }

    return reply.status(400).send({ message: 'Invalid request' })
  }
}
