import { mock, instance, when, verify, reset } from 'ts-mockito';
import PostModel from '../../app/models/PostModel';
import Post from '../../app/orm/entities/Post';
import { Repository } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';

describe('PostModel unit tests', () => {
  const postRepoMock = <Repository<Post>>mock(Repository);
  const categoryRepoMock = <Repository<Category>>mock(Repository);
  const postRepoMockInstance = instance(postRepoMock);
  const categoryRepoMockInstance = instance(categoryRepoMock);
  const postmodel = new PostModel(<Dependencies>{
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
    let result;
    try {
      when(postRepoMock.find()).thenResolve(posts);
      result = await postmodel.getAllPosts();
      verify(postRepoMock.find()).called();
      expect(result).toEqual(posts);
    } catch (error) {
      console.log(error);
    }
  });

  test('Get all posts, error test', async () => {
    when(postRepoMock.find()).thenResolve(emptyPosts);
    postmodel
      .getAllPosts()
      .then(() => {
        expect(postmodel.getOnePost(post.id)).toThrowError();
      })
      .catch(() => {});
    verify(postRepoMock.find()).called();
  });

  test('Get one post', async () => {
    let result;
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    try {
      result = await postmodel.getOnePost(post.id);
    } catch (error) {
      console.log(error);
    }
    verify(postRepoMock.findOne(post.id)).called();
    expect(result).toEqual(post);
  });

  test('Get one post, error test', async () => {
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    postmodel
      .getOnePost(post.id)
      .then(() => {
        expect(postmodel.getOnePost(post.id)).toThrowError();
      })
      .catch(() => {});

    verify(postRepoMock.findOne(post.id)).called();
  });

  test('Create post', async () => {
    let result;
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(postRepoMock.save(post)).thenResolve(post);
    try {
      result = await postmodel.createPost(post, category.id);
    } catch (error) {
      console.log(error);
    }
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(postRepoMock.save(post)).called();
    expect(result).toEqual(post);
  });

  test('Create post, error test', async () => {
    let result;
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    when(postRepoMock.save(post)).thenResolve(post);

    postmodel
      .createPost(post, category.id)
      .then(() => {
        expect(postmodel.createPost(post, category.id)).toThrowError();
      })
      .catch(() => {});

    verify(categoryRepoMock.findOne(category.id)).called();
    verify(postRepoMock.save(post)).never();
  });

  test('Delete post', async () => {
    let result;
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.remove(post)).thenResolve(post);
    try {
      result = await postmodel.deletePost(post.id);
    } catch (error) {
      console.log(error);
    }
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.remove(post)).called();
    expect(result).toEqual(post);
  });
  test('Delete post, error test', async () => {
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    when(postRepoMock.remove(post)).thenResolve(post);

    postmodel
      .deletePost(post.id)
      .then(() => {
        expect(postmodel.deletePost(post.id)).toThrowError('Post not found');
      })
      .catch(() => {});
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.remove(post)).never();
  });

  test('Modify post', async () => {
    let result;
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.save(post)).thenResolve(post);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    try {
      result = await postmodel.modifyPost(post, category.id);
    } catch (error) {
      console.log(error);
    }
    verify(postRepoMock.findOne(post.id)).called();
    verify(postRepoMock.save(post)).called();
    verify(categoryRepoMock.findOne(category.id)).called();
    expect(result).toEqual(post);
  });

  test('Modify post, bad post error test', async () => {
    when(postRepoMock.findOne(post.id)).thenResolve(undefined);
    when(postRepoMock.save(post)).thenResolve(post);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    postmodel
      .modifyPost(post, category.id)
      .then(() => {
        expect(postmodel.modifyPost(post, category.id)).toThrowError('Category not found');
        verify(postRepoMock.findOne(post.id)).called();
        verify(postRepoMock.save(post)).never();
        verify(categoryRepoMock.findOne(category.id)).called();
      })
      .catch(() => {});
  });

  test('Modify post, bad category error test', async () => {
    when(postRepoMock.findOne(post.id)).thenResolve(post);
    when(postRepoMock.save(post)).thenResolve(post);
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);

    postmodel
      .modifyPost(post, category.id)
      .then(() => {
        expect(postmodel.modifyPost(post, category.id)).toThrowError('Post not found');
        verify(postRepoMock.findOne(post.id)).called();
        verify(postRepoMock.save(post)).never();
        verify(categoryRepoMock.findOne(category.id)).called();
      })
      .catch(() => {});
  });
});
