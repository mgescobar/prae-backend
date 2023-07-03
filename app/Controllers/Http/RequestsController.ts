import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Request from 'App/Models/Request'
import User from 'App/Models/User'
import Book from 'App/Models/Book'

export default class RequestsController {
    public async create ({ request, response }: HttpContextContract) {
        const { id_usuario, id_livro, status } = request.all()
        const user = await User.findOrFail(id_usuario)
        const book = await Book.findOrFail(id_livro)

        const bookRequest = await Request.query().where('id_livro', book.id).first()

        if (bookRequest) {
            return response.badRequest({ error: 'Não foi possivel realizar interesse no livro.' })
        } else {            
            const interest = await Request.create({ id_usuario: user.id, id_livro: book.id, status })
            return response.created({ interest })
        }
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
        const requests = await Request.all()
        return response.ok({ requests })
    }

    public async findByUser ({ params, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        const requests = await user.related('requests').query()
        return response.ok({ requests })
    }

    public async findByBook ({ params, response }: HttpContextContract) {
        const book = await Book.findOrFail(params.id)
        const requests = await book.related('requests').query()
        return response.ok({ requests })
    }

    public async findOne ({ params, response }: HttpContextContract) {
        const requests = await Request.findOrFail(params.id)
        return response.ok({ requests })
    }
}
