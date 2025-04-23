import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateService } from '../factories/makeAuthenticateService'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  })

  try {
    const { email, password } = authenticateSchema.parse(request.body)

    const authenticateOrgService = makeAuthenticateService()

    const { token } = await authenticateOrgService.execute({ email, password })

    return reply.status(200).send({ token })
  } catch (error) {
    return reply.status(401).send()
  }
}
