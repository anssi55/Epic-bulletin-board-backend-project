import { mock, instance, when, verify } from 'ts-mockito';
import { Repository } from 'typeorm';
import Category from '../../app/orm/entities/Category';
import { Dependencies } from '../../app/Types';
import CategoryModel from '../../app/models/CategoryModel';

describe('PostModel unit tests', () => {
  let categoryRepoMock: Repository<Category>;
  let categoryRepoMockInstance: Repository<Category>;
  let category: Category;
  let categories: Category[];
  let categoryModel: CategoryModel;

  beforeAll(async () => {
    categoryRepoMock = <Repository<Category>>mock(Repository);

    categoryRepoMockInstance = instance(categoryRepoMock);
    categoryModel = new CategoryModel(<Dependencies>(<unknown>{
      categoryRepoMock: categoryRepoMockInstance
    }));
    category = new Category();
    category.id = 1;
    category.description = 'This is a cool category';
    category.name = 'The Cool Category';
    categories = [];
  });

  test('Get all categories', async () => {
    when(categoryRepoMock.find()).thenResolve(categories);
    await categoryModel.getAllCategories();
    verify(categoryRepoMock.find()).called();
  });
  test('Get one category', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    await categoryModel.getOneCategory(category.id);
    verify(categoryRepoMock.find(category)).called();
  });
  test('Create one category', async () => {
    when(categoryRepoMock.save(category)).thenResolve(category);
    await categoryModel.createCategory(category);
    verify(categoryRepoMock.save(category)).called();
  });
  test('Modify category', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(categoryRepoMock.save(category)).thenResolve(category);
    await categoryModel.modifyCategory;
    verify(categoryRepoMock.findOne(category)).called();
    verify(categoryRepoMock.save(category)).called();
  });
  test('Delete category', async () => {
    when(categoryRepoMock.findOne(category.id)).thenResolve(category);
    when(categoryRepoMock.remove(category)).thenResolve(category);
    await categoryModel.deleteCategory(category.id);
    verify(categoryRepoMock.findOne(category.id)).called();
    verify(categoryRepoMock.remove(category)).called();
  });
});
