import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Boom from 'boom';

class CategoryModel {
  private categoryRepo: Repository<Category>;

  constructor(opts: Dependencies) {
    this.categoryRepo = opts.categoryRepo;
  }

  public getAllCategories = async () => {
    try {
      const categories = await this.categoryRepo.find();
      if (categories.length > 0) {
        return categories;
      } else {
        throw Boom.notFound('Categories not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public getOneCategory = async (categoryId: number) => {
    try {
      const category = await this.categoryRepo.findOne(categoryId);
      if (category) {
        return category;
      } else {
        throw Boom.notFound('Category not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public createCategory = async (newCategory: Category) => {
    try {
      const result = await this.categoryRepo.save(newCategory);
      return result;
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public modifyCategory = async (modifiedCategory: Category) => {
    try {
      let originalCategory = await this.categoryRepo.findOne(modifiedCategory.id);
      if (originalCategory) {
        originalCategory.name = originalCategory.name;
        originalCategory.description = originalCategory.description;
        const result = await this.categoryRepo.save(originalCategory);
        return result;
      } else {
        throw Boom.notFound('Category not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public deleteCategory = async (categoryId: number) => {
    try {
      const categoryToDelete = await this.categoryRepo.findOne(categoryId);
      if (categoryToDelete) {
        return await this.categoryRepo.remove(categoryToDelete);
      } else {
        throw Boom.notFound('Category not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };
}
export default CategoryModel;
