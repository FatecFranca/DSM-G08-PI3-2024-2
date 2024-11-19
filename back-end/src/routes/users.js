import { Router } from 'express';
import controller from '../controllers/usuario.js';

const router = Router();

/* GET all users */
router.get('/', controller.retrieveAll);

/* GET a specific user by ID */
router.get('/:id', controller.retrieveOne);

/* POST a new user */
router.post('/register', controller.create);

/* PATCH (update) a user by ID */
router.patch('/:id', controller.update);

/* DELETE a user by ID */
router.delete('/:id', controller.delete);

export default router;
