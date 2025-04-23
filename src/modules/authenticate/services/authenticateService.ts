import { app } from '@/app'
import { OrgRepository } from '@/modules/orgs/repositories/OrgRepository'
import bcrypt from 'bcryptjs'

interface AuthenticateOrgRequest {
  email: string
  password: string
}

interface AuthenticateOrgResponse {
  token: string
}

export class AuthenticateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: AuthenticateOrgRequest,
  ): Promise<AuthenticateOrgResponse> {
    const org = await this.orgRepository.findByEmail(data.email)

    if (!org) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      org.password_hash,
    )

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    // Gerar o token JWT
    const token = app.jwt.sign(
      { orgId: org.id },
      { expiresIn: '1h' }, // Token expira em 1 hora
    )

    return { token }
  }
}
