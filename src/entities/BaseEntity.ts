import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
// import { ObjectId } from '@mikro-orm/postgresql';
import { v4 } from 'uuid'

export abstract class BaseEntity {

  // @PrimaryKey()
  // _id!: number;

  // @SerializedPrimaryKey()
  // id!: string;
  @PrimaryKey({ type: 'uuid' })
  id: string

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(){
    this.id = v4()
  }
}
