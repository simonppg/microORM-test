import { MikroORM, RequestContext } from '@mikro-orm/core'
import express, {Request, Response, NextFunction} from 'express'
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

async function initORM() {
 const orm = await MikroORM.init({
    entities: [BaseEntity, Author, Book, Publisher, BookTag],
    dbName: 'micro-orm-db',
    // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    type: 'postgresql',
    // defaults to 'mongodb://localhost:27017' for mongodb driver
    clientUrl: 'postgresql://postgres:postgres@localhost:5432',
  });

  return orm
}
async function run (){
  const app = express();

  app.use((req:Request, res:Response, next:NextFunction) => {
    RequestContext.create(orm.em, next);
  });

  const orm = await initORM()

  const authorRepo = orm.em.getRepository(Author)

  await authorRepo.nativeDelete({})

  const entities = [
    new Author('some name', "myEmail"+new Date()),
    new Author('this is a name', "an example email"+new Date())
  ]

  await authorRepo.persistAndFlush(entities)

  const authors = await authorRepo.findAll()

  console.log(authors)
}

run()