import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrganizationAlreadyExistsError } from '../errors/OrganizationAlreadyExistsError'
import { makeCreateOrgService } from '../factories/makeCreateOrgService'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    address: z.string().min(1, 'Address is required'),
    whatsapp: z.string().min(10, 'WhatsApp must have at least 10 characters'),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'Invalid CEP format'),
  })

  try {
    const data = createOrgSchema.parse(request.body)

    const createOrgService = makeCreateOrgService()

    await createOrgService.execute(data)

    reply.status(201).send()
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
