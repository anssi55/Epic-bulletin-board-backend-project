'use strict';
import {Router, Request, Response, NextFunction} from 'express';
import {Categories} from "../orm/entities/Categories";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
const awilix = require('awilix');


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

//Router to handle all category REST-api calls
export class CategoriesRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }
    
    //Get all categories from the database
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let results = await getRepository(Categories).find();
            res.status(200).send(results);
        } catch(error) {
            res.status(400).send({"message": "Couldn't get the data"});
         
        }
        
    }
    //Get one category spesified by id
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    //Create one new category to database
    public async create(req: Request, res: Response, next: NextFunction) {
        let validateErrors;
        try {  
            let category = new Categories();
            category.name = req.body.name;
            category.description = req.body.description;
            validateErrors = await validate(category);
            if(validateErrors.length > 0) {
                throw 400;
            }
            let categoryRepository = getRepository(Categories);
            let sqlErrors = await categoryRepository.save(category);
            console.log(sqlErrors);
            res.status(200).send(category);
        } catch(error) {
            if (error === 400) {
                res.status(400).send({errors: validateErrors})
            } else {
                res.status(400).send({message: "Couldn't save the data", "Error": error.message});
            }
        }
        
        
            
        
    }
    //Update one category in database
    public update(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    public delete(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.put('/:id', this.update);
    }
}

container.register({
    CategoriesController: awilix.asClass(CategoriesRouter),
    Categories: awilix.asClass(Categories)
})

const categoriesRouter = new CategoriesRouter();
categoriesRouter.init();

export default categoriesRouter.router;
