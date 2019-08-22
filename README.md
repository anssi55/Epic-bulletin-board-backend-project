# Epic-bulletin-board-backend-project

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [About](#about)
- [Setup and running the app](#Installation-and-running-the-app)
- [Tests](#Tests)
- [Technologies used](#technologies-used)
- [Live Demo](#Live-Demo)
- [API](#API)

<!-- /TOC -->

## About

The Epic Bulletin board is bulletin board which allows to make posts, comment posts and like posts and comments.  
You can also make categories for the posts and have account so will be able to follow the conversation easier.

## Installation and running the app

### Prerequisites

Node.js is needed when running npm commands.  
This application is using version 12.5.0 of node.js.

Download compatible version from:  
https://nodejs.org

Docker is need when running docker commands.  
Docker version of this applicaton is 19.03.1

Download Docker from:  
https://www.docker.com/

### Installation

`> npm install`

### Running the application

Building and running app in Docker container:

`> docker-compose up`

## Tests

Run tests with:

`> npm run test`

## Technologies used

### Language

Application is written in typescript.

## Live Demo

Application has been deployed to cloud application platform called Heroku.  
Live demo of this application can be found in:  
https://epicbulletinboard.herokuapp.com/api/v1/posts

## API

Requests should be made in JSON (application/json) form.

### Request & Response Examples

#### API Resources

- [GET /posts](#get-posts)
- [GET /posts/[id]](#get-postsid)
- [POST /posts](#post-posts)
- [GET /categories](#get-categories)
- [GET /categories/[id]](#get-categoriesid)
- [POST /categories](#post-categories)

## Get /posts

Example: https://epicbulletinboard.herokuapp.com/api/v1/posts

Response body:

```json
[
  {
    "id": 1,
    "topic": "Cool post",
    "post": "This post is really cool",
    "datetime": "2019-08-16T15:57:47.000Z",
    "pinned": true,
    "modified": null
  },
  {
    "id": 2,
    "topic": "Even cooler post",
    "post": "This post is even cooler",
    "datetime": "2019-08-19T09:52:21.000Z",
    "pinned": true,
    "modified": null
  }
]
```

## Get /posts[id]

Example: https://epicbulletinboard.herokuapp.com/api/v1/posts/3

Response body:

```json
{
  "id": 3,
  "topic": "The best post",
  "post": "This post is the best post ever",
  "datetime": "2019-08-29T07:42:51.000Z",
  "pinned": false,
  "modified": null
}
```

## Post /posts

Example: https://epicbulletinboard.herokuapp.com/api/v1/posts

Request body:

```json
{
  "post": "Nice post",
  "topic": "This post is nice",
  "pinned": true,
  "categoryId": 1
}
```

Response body:

```json
{
  "topic": "Nice post",
  "post": "This post is very nice",
  "pinned": true,
  "datetime": "2019-08-20T09:33:52.348Z",
  "category": {
    "id": 1,
    "name": "Nice category",
    "description": "category for nice things"
  },
  "modified": null,
  "id": 5
}
```

## Get /categories

Example: https://epicbulletinboard.herokuapp.com/api/v1/categories

Response body:

```json
[
  {
    "id": 1,
    "name": "example category",
    "description": "very cool category"
  },
  {
    "id": 2,
    "name": "another example category",
    "description": "not so cool category"
  }
]
```

## Get /categories/[id]

Example: https://epicbulletinboard.herokuapp.com/api/v1/categories/3

Response body:

```json
{
  "id": 3,
  "name": "the best example category",
  "description": "the coolest category"
}
```

## Post /categories

Example: https://epicbulletinboard.herokuapp.com/api/v1/categories

Request body:

```json
{
  "name": "category for nice posts",
  "description": "only nice things here"
}
```

Response body:

```json
{
  "name": "category for nice posts",
  "description": "only nice things here",
  "id": 3
}
```
