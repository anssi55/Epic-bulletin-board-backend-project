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
  //Get one category spesified by id
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
  //Create one new category to database
  public create = async (req: Request, res: Response, next: NextFunction) => {
    let category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;
    try {
      await this.categoryRepo.save(category);

      res.status(200).send(category);
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };
  //Update one category in database
  public update(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
  public delete(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
}

export default CategoriesRouter;
