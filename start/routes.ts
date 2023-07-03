/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/showImage/:file', 'FilesController.show')

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'SessionsController.store').as('sessions.store')

Route.group(() => {
    Route.post('/', 'UsersController.create')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.delete')
    Route.get('/:id', 'UsersController.findOne')
    Route.get('/', 'UsersController.findAll')
}).prefix('users')

Route.group(() => {
    Route.post('/', 'BooksController.create')
    Route.put('/:id', 'BooksController.update')
    Route.delete('/:id', 'BooksController.delete')
    Route.get('/:id', 'BooksController.findOne')
    Route.get('/', 'BooksController.findAll')
}).prefix('books')

Route.group(() => {
    Route.post('/', 'RequestsController.create')  
    Route.put('/:id', 'RequestsController.update')
    Route.delete('/:id', 'RequestsController.delete')
    Route.get('/', 'RequestsController.findAll')
    Route.get('/:id', 'RequestsController.findOne')
    Route.get('/user/:id', 'RequestsController.findByUser')
    Route.get('/book/:id', 'RequestsController.findByBook')
}).prefix('requests')