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

  console.log(orm.em); // access EntityManager via `em` property

  const authorRepo = orm.em.getRepository(Author)

  console.log(authorRepo)

  const author = new Author('Yo', "myEmail");
  // wrap(author).assign(req.body);
  await authorRepo.persistAndFlush(author);

  const authors = await authorRepo.findAll()

  console.log(authors)


}

run()