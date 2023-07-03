import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'

export default class Request extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_livro: number

  @column()
  public id_usuario: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public status: number
}
