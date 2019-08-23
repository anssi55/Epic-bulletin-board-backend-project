import { mock, instance, when, verify, reset, anything, anyString, anyOfClass } from 'ts-mockito';
import PostService from '../../app/services/PostService';
import Post from '../../app/orm/entities/Post';
import { Repository, UpdateResult } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';
import Boom from 'boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

describe('Post Service unit tests', () => {
  const postRepoMock = <Repository<Post>>mock(Repository);
  const categoryRepoMock = <Repository<Category>>mock(Repository);
  const postRepoMockInstance = instance(postRepoMock);
  const categoryRepoMockInstance = instance(categoryRepoMock);
  const postService = new PostService(<Dependencies>{
    postRepo: postRepoMockInstance,
    categoryRepo: categoryRepoMockInstance
  });

  const results = new UpdateResult();
  const post = new Post();
  const category = new Category();
  const partial: QueryDeepPartialEntity<Post> = post;
  category.id = 1;
  post.id = 1;
  post.pinned = true;
  post.topic = 'hello world';
  post.post = 'World is a wonderful place';
  post.category = category;
  const posts = [post];
  const emptyPosts: Post[] = [];

  beforeEach(async () => {
    reset(postRepoMock);
    reset(categoryRepoMock);
  });

  test('Get all posts', async () => {
    expect.assertions(1);
    when(postRepoMock.find()).thenResolve(posts);
    await expect(postService.getAllPosts()).resolves.toEqual(posts);
    verify(postRepoMock.find()).called();
  });

  test('Get all posts, error test', async () => {
    expect.assertions(1);
    when(postRepoMock.find()).thenResolve(emptyPosts);
    await expect(postService.getAllPosts()).rejects.toEqual(Boom.notFound('Posts not found'));
    verify(postRepoMock.find()).called();
  });

  test('Get one post', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    await expect(postService.getOnePost(post.id)).resolves.toEqual(post);
    verify(postRepoMock.findOne(post.id)).called();
  });

  test('Get one post, error test', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    await expect(postService.getOnePost(post.id)).rejects.toEqual(Boom.notFound('Post not found'));
    verify(postRepoMock.findOne(post.id)).called();
  });

  test('Create post', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(postRepoMock.save(post)).thenResolve(post);
    await expect(postService.createPost(post, category.id)).resolves.toEqual(post);
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(postRepoMock.save(post)).called();
  });

  test('Create post, error test', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    when(postRepoMock.save(post)).thenResolve(post);
    await expect(postService.createPost(post, category.id)).rejects.toEqual(
      Boom.notFound('Category not found')
    );
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(postRepoMock.save(post)).never();
  });

  test('Delete post', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.remove(post)).thenResolve(post);
    await expect(postService.deletePost(post.id)).resolves.toEqual(post);
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.remove(post)).called();
  });

  test('Delete post, error test', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    when(postRepoMock.remove(post)).thenResolve(post);
    await expect(postService.deletePost(post.id)).rejects.toEqual(Boom.notFound('Post not found'));
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.remove(post)).never();
  });

  test('Modify post', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.update(post.id, partial)).thenResolve(results);
    await expect(postService.modifyPost(post, post.id)).resolves.toEqual(post);
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.update(post.id, partial)).called();
  });

  test('Modify post, error test', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    when(postRepoMock.update(post.id, partial)).thenResolve(results);
    await expect(postService.modifyPost(post, post.id)).rejects.toEqual(
      Boom.notFound('Post not found')
    );
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.update(post.id, partial)).called();
  });
});
