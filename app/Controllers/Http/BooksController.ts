import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import sharp from 'sharp'
import fs from 'fs/promises'

export default class BooksController {
    public async index ({ response }: HttpContextContract) {
        return response.ok({message: 'Books Controller'})
    }

    public async create ({ response, request }: HttpContextContract) {
        const bookPayload = request.only(['titulo', 'autor', 'capa', 'categoria', 'quantidade'])

        const imagem = request.file('capa', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],            
        });

        await imagem?.move(`public/uploads`)              

        const imagemData = {
            path: `${imagem?.fileName}`,
        }     

        await Database
                .insertQuery()
                .table('books')
                .insert({
                    titulo: bookPayload.titulo,
                    autor: bookPayload.autor,
                    capa: imagemData.path,
                    categoria: bookPayload.categoria,
                    quantidade: bookPayload.quantidade,
                })

        return response.created({ Book: await Book.query().orderBy('id', 'desc').first()})
    }

    public async update ({ request, response }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))
        const bookPayload = request.all()

        const imagem = request.file('cover', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],
        });

        if (imagem) {
            const tmpPath = imagem.tmpPath!;
            const imageData = await fs.readFile(tmpPath);
            const resizedImageData = await sharp(imageData)
            .resize(200, 300)
            .toBuffer();
            const hexString = '\\x' + resizedImageData.toString('hex');
            bookPayload.cover = hexString;
          }

        if(!book) return response.notFound({message: 'Livro não encontrado'})

        await Database
                .insertQuery()
                .table('books')
                .insert({
                    titulo: bookPayload.titulo? bookPayload.titulo : book.titulo,
                    autor: bookPayload.autor? bookPayload.autor : book.autor,
                    capa: bookPayload.capa? bookPayload.capa : book.capa,
                    categoria: bookPayload.categoria? bookPayload.categoria : book.categoria,
                    quantidade: bookPayload.quantidade? bookPayload.quantidade : book.quantidade, 
                })

        return response.ok({ Book: await Book.findByOrFail('id', request.param('id'))})
    }

    public async delete ({ request, response }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))

        if(!book) return response.notFound({message: 'Livro não encontrado'})

        await book.delete()
        return response.ok({book})
    }

    public async findOne ({ response, request }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))

        if(!book) return response.notFound({message: 'Livro não encontrado'})

        return response.ok({book})
    }
    
    public async findAll ({ response }: HttpContextContract){
        const books = await Book.all()
        return response.ok({books})
    }
}
