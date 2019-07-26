'use strict';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Boom from 'boom';

class CategoriesRouter {
  private categoryRepo: Repository<Category>;
  constructor(opts: Dependencies) {
    this.categoryRepo = opts.categoryRepo;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let results = await this.categoryRepo.find();
      res.status(200).send(results);
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const category = await this.categoryRepo.findOne(id);
      if (category) {
        res.status(200).send(category);
      } else {
        res.status(404).send(Boom.notFound('Category not found').output.payload);
      }
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    let category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;
    try {
      const result = await this.categoryRepo.save(category);
      res.status(200).send(result);
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      let category = await this.categoryRepo.findOne(id);
      if (category) {
        category.description = req.body.description;
        category.name = req.body.name;
        const result = await this.categoryRepo.save(category);
        res.status(200).send(result);
      } else {
        res.status(404).send(Boom.notFound('Category not found').output.payload);
      }
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      let category = await this.categoryRepo.findOne(id);
      if (category) {
        const result = await this.categoryRepo.delete(category);
        res.status(200).send('Deleted category: ' + JSON.stringify(category));
      } else {
        res.status(404).send(Boom.notFound('Category not found').output.payload);
      }
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };
}

export default CategoriesRouter;
