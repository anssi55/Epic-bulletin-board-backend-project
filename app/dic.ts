import PostsRouter from "./routes/postsRouter";
import { Post } from "./orm/entities/Post";

import awilix = require('awilix');


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

container.register({
  postsController: awilix.asClass(PostsRouter),
  Posts: awilix.asClass(Post)
})

export default container