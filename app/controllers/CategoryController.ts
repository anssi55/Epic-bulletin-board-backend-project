import { Request, Response, NextFunction } from 'express';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import CategoryModel from '../models/CategoryModel';
import { plainToClass } from 'class-transformer';

class CategoryController {
  private categoryModel: CategoryModel;
  constructor(opts: Dependencies) {
    this.categoryModel = opts.categoryModel;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await this.categoryModel.getAllCategories();
      res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    try {
      const result = await this.categoryModel.getOneCategory(categoryId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const newCategory = plainToClass(Category, req.body, { excludeExtraneousValues: true });
    try {
      const result = await this.categoryModel.createCategory(newCategory);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const modifiedCategory = plainToClass(Category, req.body, { excludeExtraneousValues: true });
    modifiedCategory.id = categoryId;
    try {
      let result = await this.categoryModel.modifyCategory(modifiedCategory);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    try {
      this.categoryModel.deleteCategory(categoryId).then(() => {
        res.sendStatus(204);
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
