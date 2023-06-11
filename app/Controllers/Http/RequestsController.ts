import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Request from 'App/Models/Request'

export default class RequestsController {
    public async create ({ request, response }: HttpContextContract) {
        const requestPayload = request.all()
        const user_request = await Request.create(requestPayload)
        return response.created({ user_request })
    }   

    public async update ({ params, request, response }: HttpContextContract) {
        const user_request = await Request.findOrFail(params.id)
        const requestPayload = request.all()
        user_request.merge(requestPayload)
        await user_request.save()
        return response.ok({ user_request })
    }

    public async delete ({ params, response }: HttpContextContract) {
        const user_request = await Request.findOrFail(params.id)
        await user_request.delete()
        return response.noContent()
    }

    public async findAll ({ response }: HttpContextContract) {
        const solicitacoes = await Request.all()
        return response.ok({ solicitacoes })
    }

    public async findOne ({ params, response }: HttpContextContract) {
        const solicitacao = await Request.findOrFail(params.id)
        return response.ok({ solicitacao })
    }
}
