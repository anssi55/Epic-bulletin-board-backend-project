import { mock, instance, when, verify, reset } from 'ts-mockito';
import PostService from '../../app/services/PostService';
import Post from '../../app/orm/entities/Post';
import { Repository } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';
import Boom from 'boom';

describe('PostService unit tests', () => {
  const postRepoMock = <Repository<Post>>mock(Repository);
  const categoryRepoMock = <Repository<Category>>mock(Repository);
  const postRepoMockInstance = instance(postRepoMock);
  const categoryRepoMockInstance = instance(categoryRepoMock);
  const postService = new PostService(<Dependencies>{
    postRepo: postRepoMockInstance,
    categoryRepo: categoryRepoMockInstance
  });
  const post = new Post();
  post.id = 1;
  post.pinned = true;
  post.topic = 'hello world';
  post.post = 'World is a wonderful place';
  const posts = [post];
  const emptyPosts: Post[] = [];
  const category = new Category();
  category.id = 1;

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
    when(postRepoMock.save(post)).thenResolve(post);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    await expect(postService.modifyPost(post, category.id)).resolves.toEqual(post);
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.save(post)).called();
    verify(categoryRepoMock.findOne(category.id)).called();
  });

  test('Modify post, bad post error test', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    when(postRepoMock.save(post)).thenResolve(post);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    await expect(postService.modifyPost(post, category.id)).rejects.toEqual(
      Boom.notFound('Post not found')
    );
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.save(post)).never();
    verify(categoryRepoMock.findOne(category.id)).called();
  });

  test('Modify post, bad category error test', async () => {
    expect.assertions(1);
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.save(post)).thenResolve(post);
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    await expect(postService.modifyPost(post, category.id)).rejects.toEqual(
      Boom.notFound('Category not found')
    );
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.save(post)).never();
    verify(categoryRepoMock.findOne(category.id)).called();
  });
});
