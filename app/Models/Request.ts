import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'

export default class Request extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_livro: number

  @hasOne(() => Book, {
    foreignKey: 'id_livro',
  })
  public Book: HasOne<typeof Book>

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>

  @column()
  public id_usuario: number

  @hasOne(() => User, {
    foreignKey: 'id_usuario',
  })
  public User: HasOne<typeof User>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public status: number
}
