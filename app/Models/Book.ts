import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Request from './Request'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public autor: string

  @column()
  public capa: string

  @column()
  public categoria: string

  @column()
  public quantidade: number

  @hasMany(() => Request, {
    foreignKey: 'id_livro',
  })
  public requests: HasMany<typeof Request>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
