import PostsRouter from "./routes/postsRouter";
import { Posts } from "./orm/entities/Posts";

import awilix = require('awilix');


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

container.register({
    postsController: awilix.asClass(PostsRouter),
    Posts: awilix.asClass(Posts)
})

export default container