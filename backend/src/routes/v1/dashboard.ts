import { Router } from 'express';
import { getVisaApplicationById } from '../../controllers/visaApplication.controller';
import controller from '../../controllers/dashboard.controller';
import { validateJWT } from '../../middlewares/validateJWT';

const router = Router();

router.get('/validate', validateJWT, controller.validateToken);

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/getMe', validateJWT, controller.getUser);
router.get('/getAllUsers', validateJWT, controller.getAllUsers);
router.get('/:id', validateJWT, controller.getSingleVisaUser);
router.put('/:id', validateJWT, controller.updateUser);
router.delete('/delete/:id', validateJWT, controller.deleteUser);

router.get(
  '/visa-application/getAllVisaApplicationsByUser/:id',
  validateJWT,
  controller.getAllVisasByUser
);
router.get('/visa-application/:id', validateJWT, getVisaApplicationById);

router.get('/getAllCountries', validateJWT, controller.getAllCountries);
router.get(
  '/getSingleCountry/:id',
  validateJWT,
  controller.getSingleCountryById
);
router.post('/addNewCountry', validateJWT, controller.addNewCountry);
router.put('/updateCountry/:id', validateJWT, controller.updateCountry);
router.delete('/addNewCountry/:id', validateJWT, controller.deleteCountry);

export default router;
