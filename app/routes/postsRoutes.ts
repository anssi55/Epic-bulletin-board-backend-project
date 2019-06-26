'use strict';
const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postController');

router.get('/', postsController.readAll);
router.post('/', postsController.create);
router.get('/:id', postsController.read);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.delete);
