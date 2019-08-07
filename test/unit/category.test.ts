import { mock, instance, when, verify, reset } from 'ts-mockito';
import { Repository } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';
import CategoryModel from '../../app/models/CategoryModel';
import Boom from 'boom';

describe('Category Model unit tests', () => {
  const categoryRepoMock = <Repository<Category>>(<unknown>mock(Repository));
  const categoryRepoMockInstance = instance(categoryRepoMock);
  const categoryModel = new CategoryModel(<Dependencies>{
    categoryRepo: categoryRepoMockInstance
  });
  const category = new Category();
  category.id = 1;
  category.description = 'This is a cool category';
  category.name = 'The Cool Category';
  const categories = [category];
  const emptyCategories: Category[] = [];

  beforeEach(async () => {
    reset(categoryRepoMock);
  });

  test('Get all categories', async () => {
    expect.assertions(1);
    when(categoryRepoMock.find()).thenResolve(categories);
    await expect(categoryModel.getAllCategories()).resolves.toEqual(categories);
    verify(categoryRepoMock.find()).called();
  });

  test('Get all categories, error test', async () => {
    expect.assertions(1);
    when(categoryRepoMock.find()).thenResolve(emptyCategories);
    await expect(categoryModel.getAllCategories()).rejects.toEqual(
      Boom.notFound('Categories not found')
    );
    verify(categoryRepoMock.find()).called();
  });

  test('Get category', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    await expect(categoryModel.getOneCategory(category.id)).resolves.toEqual(category);
    verify(categoryRepoMock.findOne(category.id)).called();
  });

  test('Get category, error test', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    await expect(categoryModel.getOneCategory(category.id)).rejects.toEqual(
      Boom.notFound('Category not found')
    );
    verify(categoryRepoMock.findOne(category.id)).called();
  });

  test('Create category', async () => {
    expect.assertions(1);
    when(categoryRepoMock.save(category)).thenResolve(category);
    await expect(categoryModel.createCategory(category)).resolves.toEqual(category);
    verify(categoryRepoMock.save(category)).called();
  });

  test('Modify category', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(categoryRepoMock.save(category)).thenResolve(category);
    await expect(categoryModel.modifyCategory(category)).resolves.toEqual(category);
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.save(category)).called();
  });

  test('Modify category, error test', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    when(categoryRepoMock.save(category)).thenResolve(category);
    await expect(categoryModel.modifyCategory(category)).rejects.toEqual(
      Boom.notFound('Category not found')
    );
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.save(category)).never();
  });
  test('Delete category', async () => {
    expect.assertions(1);
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(categoryRepoMock.remove(category)).thenResolve(category);
    await expect(categoryModel.deleteCategory(category.id)).resolves.toEqual(category);
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.remove(category)).called();
  });

  test('Delete category, error test', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    when(categoryRepoMock.remove(category)).thenResolve(category);
    await expect(categoryModel.deleteCategory(category.id)).rejects.toEqual(
      Boom.notFound('Category not found')
    );
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.remove(category)).never();
  });
});
