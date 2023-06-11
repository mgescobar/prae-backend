import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class SessionsController {
  public async store ({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const senha = request.input('senha')
  
    const user = await User
      .query()
      .where('email', email)      
      .firstOrFail()
  
    if (!(await Hash.verify(user.senha, senha))) {
      return response.unauthorized('Credenciais inválidas.')
    }
    
    return response.ok({user})    
  }
}