import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Request from './Request'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public curso: string

  @column()
  public tipo: number

  @hasMany(() => Request, {
    localKey: 'id_solicitacao',
  })
  public requests: HasMany<typeof Request>

  @column()
  public email: string

  @column({ serializeAs: null })
  public senha: string

  @column()
  public remember_me_token?: string

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.senha = await Hash.make(User.senha)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
