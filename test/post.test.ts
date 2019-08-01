import { mock } from 'ts-mockito';
import PostModel from '../app/models/PostModel';
import Post from '../app/orm/entities/Post';
import { Repository } from 'typeorm';
import Category from '../app/orm/entities/Category';

beforeAll(async () => {
  console.log('Server starting!');
});

afterAll(() => {
  console.log('server closed!');
});

test('lol', () => {
  //const postRepoMock: Repository<Post> = mock(Repository<Post>);
  // const categoryRepoMock: Repository<Category>;
  // private postRepo: Repository<Post>;
  //private categoryRepo: Repository<Category>;
  //luo mokit dependecisistä
  //luo instanssi luokasta postmodel
  //Stubbing getter value
  //kutsu funktiota
});
