'use strict';
import { Router, Request, Response, NextFunction } from 'express';
import Category from '../orm/entities/Category';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

//Router to handle all category REST-api calls
class CategoriesRouter {
  constructor() {}

  //Get all categories from the database
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let results = await getRepository(Category).find();
      res.status(200).send(results);
    } catch (error) {
      res.status(400).send({ message: "Couldn't get the data" });
    }
  }
  //Get one category spesified by id
  public getOne(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
  //Create one new category to database
  public async create(req: Request, res: Response, next: NextFunction) {
    let validateErrors;
    try {
      let category = new Category();
      category.name = req.body.name;
      category.description = req.body.description;
      validateErrors = await validate(category);
      if (validateErrors.length > 0) {
        throw 400;
      }
      let categoryRepository = getRepository(Category);
      let sqlErrors = await categoryRepository.save(category);
      console.log(sqlErrors);
      res.status(200).send(category);
    } catch (error) {
      if (error === 400) {
        res.status(400).send({ errors: validateErrors });
      } else {
        res.status(400).send({ message: "Couldn't save the data", Error: error.message });
      }
    }
  }
  //Update one category in database
  public update(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
  public delete(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
}

export default CategoriesRouter;
