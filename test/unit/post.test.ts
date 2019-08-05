import { mock, instance, when, verify } from 'ts-mockito';
import PostModel from '../../app/models/PostModel';
import Post from '../../app/orm/entities/Post';
import { Repository } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';

describe('PostModel unit tests', () => {
  let postRepoMock: Repository<Post>;
  let postRepoMockInstance: Repository<Post>;
  let categoryRepoMock: Repository<Category>;
  let categoryRepoMockInstance: Repository<Category>;
  let postmodel: PostModel;
  let post: Post;
  let posts: Post[];
  let category: Category;

  beforeAll(async () => {
    postRepoMock = <Repository<Post>>mock(Repository);
    categoryRepoMock = <Repository<Category>>mock(Repository);
    postRepoMockInstance = instance(postRepoMock);
    categoryRepoMockInstance = instance(categoryRepoMock);
    postmodel = new PostModel(<Dependencies>(<unknown>{
      postRepoMock: postRepoMockInstance,
      categoryRepoMock: categoryRepoMockInstance
    }));
    post = new Post();
    post.id = 1;
    post.pinned = true;
    post.topic = 'hello world';
    post.post = 'World is a wonderful place';
    posts = [];
    category = new Category();
    category.id = 1;
  });

  test('Get all posts', async () => {
    when(postRepoMock.find()).thenResolve(posts);
    await postmodel.getAllPosts();
    verify(postRepoMock.find()).called();
  });

  test('Get one post', async () => {
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    await postmodel.getOnePost(post.id);
    verify(postRepoMock.findOne(post.id)).called();
  });

  test('Create post', () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(postRepoMock.save(post)).thenResolve(post);
    postmodel.createPost(post, category.id);
    verify(categoryRepoMock.findOne(category.id));
    verify(postRepoMock.save(post));
  });

  test('Delete one post', () => {
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.remove(post)).thenResolve(post);
    postmodel.deletePost(post.id);
    verify(postRepoMock.findOne(post));
    verify(postRepoMock.remove(post));
  });

  test('Update one post', () => {
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.save(post)).thenResolve(post);
    postmodel.modifyPost(post, category.id);
    verify(postRepoMock.findOne(post.id));
    verify(postRepoMock.save(post));
  });
});
