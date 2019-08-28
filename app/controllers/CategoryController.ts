import { Request, Response, NextFunction } from 'express';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import CategoryService from '../services/CategoryService';
import { plainToClass } from 'class-transformer';

class CategoryController {
  private categoryService: CategoryService;
  constructor(opts: Dependencies) {
    this.categoryService = opts.categoryService;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await this.categoryService.getAllCategories();
      res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = parseInt(req.params.id);
    try {
      const result = await this.categoryService.getOneCategory(categoryId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const newCategory = plainToClass(Category, req.body, { excludeExtraneousValues: true });
    try {
      const result = await this.categoryService.createCategory(newCategory);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = parseInt(req.params.id);
    const modifiedCategory = plainToClass(Category, req.body, { excludeExtraneousValues: true });

    try {
      let result = await this.categoryService.modifyCategory(modifiedCategory, categoryId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = parseInt(req.params.id);
    try {
      const result = await this.categoryService.deleteCategory(categoryId);
      if (result) {
        res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
