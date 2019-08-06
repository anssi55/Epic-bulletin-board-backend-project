import { mock, instance, when, verify, reset } from 'ts-mockito';
import { Repository } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';
import CategoryModel from '../../app/models/CategoryModel';

describe('Category Model unit tests', () => {
  const categoryRepoMock = <Repository<Category>>mock(Repository);

  const categoryRepoMockInstance = instance(categoryRepoMock);

  const categoryModel = new CategoryModel({
    categoryRepo: categoryRepoMockInstance
  } as Dependencies);
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
    let result;
    when(categoryRepoMock.find()).thenResolve(categories);
    try {
      result = await categoryModel.getAllCategories();
    } catch (error) {
      console.log(error);
    }
    verify(categoryRepoMock.find()).called();
    expect(result).toEqual(categories);
  });

  test('Get all categories, error test', async () => {
    when(categoryRepoMock.find()).thenResolve(emptyCategories);
    categoryModel
      .getAllCategories()
      .then(() => {
        expect(categoryModel.getAllCategories()).toThrowError('Categories not found');
        verify(categoryRepoMock.find()).called();
      })
      .catch(() => {});
  });

  test('Get category', async () => {
    let result;
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    try {
      result = await categoryModel.getOneCategory(category.id);
    } catch (error) {
      console.log(error);
    }
    verify(categoryRepoMock.findOne(category.id)).called();
    expect(result).toEqual(category);
  });

  test('Get category, error test', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    categoryModel
      .getOneCategory(category.id)
      .then(() => {
        expect(categoryModel.getOneCategory(category.id)).toThrowError('Category not found');
        verify(categoryRepoMock.findOne(category.id)).called();
      })
      .catch(() => {});
  });

  test('Create category', async () => {
    let result;
    when(categoryRepoMock.save(category)).thenResolve(category);
    try {
      result = await categoryModel.createCategory(category);
    } catch (error) {
      console.log(error);
    }
    verify(categoryRepoMock.save(category)).called();
    expect(result).toEqual(category);
  });

  test('Modify category', async () => {
    let result;
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(categoryRepoMock.save(category)).thenResolve(category);
    try {
      result = await categoryModel.modifyCategory(category);
    } catch (error) {
      console.log(error);
    }
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.save(category)).called();
    expect(result).toEqual(category);
  });

  test('Modify category, error test', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    when(categoryRepoMock.save(category)).thenResolve(category);
    categoryModel
      .modifyCategory(category)
      .then(() => {
        expect(categoryModel.modifyCategory(category)).toThrowError('Category not found');
        verify(categoryRepoMock.findOne(category.id)).called();
        verify(categoryRepoMock.save(category)).never();
      })
      .catch(() => {});
  });
  test('Delete category', async () => {
    let result;
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(categoryRepoMock.remove(category)).thenResolve(category);
    try {
      result = await categoryModel.deleteCategory(category.id);
    } catch (error) {
      console.log(error);
    }
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.remove(category)).called();
    expect(result).toEqual(category);
  });

  test('Delete category, error test', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(undefined);
    when(categoryRepoMock.remove(category)).thenResolve(category);
    categoryModel
      .deleteCategory(category.id)
      .then(() => {
        expect(categoryModel.deleteCategory(category.id)).toThrowError('Category not found');
        verify(categoryRepoMock.findOne(category.id)).called();
        verify(categoryRepoMock.remove(category)).never();
      })
      .catch(() => {});
  });
});
