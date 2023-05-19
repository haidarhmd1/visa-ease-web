import { Router } from 'express';
import controller from '../../controllers/user.controller';
import { validateJWT } from '../../middlewares/validateJWT';

const router = Router();

router.get('/validate', validateJWT, controller.validateToken);

router.post('/register', controller.register);
router.post('/verifyAccount/:id', controller.verifyAccount);
router.get('/resendToken/:id', controller.resendEmailToken);
router.post('/login', controller.login);
router.post('/forgotPassword', controller.forgotPassword);

router.get('/', validateJWT, controller.getAllUsers);
router.get('/user', validateJWT, controller.getUser);
router.put('/user', validateJWT, controller.updateUser);
router.post('/changePassword', validateJWT, controller.changePassword);
router.delete('/user/delete', validateJWT, controller.deleteUser);

export default router;
