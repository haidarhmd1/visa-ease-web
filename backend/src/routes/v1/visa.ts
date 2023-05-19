/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import { validateJWT } from '../../middlewares/validateJWT';
import { upload } from '../../middlewares/upload';
import {
  createVisaApplication,
  getAllVisaApplications,
  getVisaApplicationById,
  updateVisaApplication,
} from '../../controllers/visaApplication.controller';
import {
  createFlightInformation,
  getFlightInformationById,
  updateFlightInformation,
} from '../../controllers/flightInformation.controller';
import {
  getDocumentsByVisaId,
  updateDocuments,
  uploadDocuments,
} from '../../controllers/documents.controller';
import {
  getAgreementById,
  updateAgreement,
  setAgreement,
} from '../../controllers/agreement.controller';

const router = Router();

/*
VisaApplication routes
*/
router.get('/visa-application', validateJWT, getAllVisaApplications);
router.get('/visa-application/:id', validateJWT, getVisaApplicationById);
router.post('/visa-application', validateJWT, createVisaApplication);
router.put('/visa-application/:id', validateJWT, updateVisaApplication);
router.delete('/visa-application/:id', validateJWT);

/*
FlightInformation routes
 */
router.get(
  '/visa-application/:visaId/flight-information',
  validateJWT,
  getFlightInformationById
);
router.post(
  '/visa-application/:visaId/flight-information',
  validateJWT,
  createFlightInformation
);
router.put(
  '/visa-application/:visaId/flight-information/:flightInformationId',
  validateJWT,
  updateFlightInformation
);

/*
Documents routes
*/
router.get(
  '/visa-application/:visaId/documents',
  validateJWT,
  getDocumentsByVisaId
);
router.post(
  '/visa-application/:visaId/documents',
  validateJWT,
  upload.single('uploadFile'),
  uploadDocuments
);
router.put(
  '/visa-application/documents/:id/',
  validateJWT,
  upload.single('uploadFile'),
  updateDocuments
);

/**
 Agreement routes
 */
router.get('/agreement/:id', validateJWT, getAgreementById);
router.post('/visa-application/:visaId/agreement', validateJWT, setAgreement);
router.put(
  '/visa-application/:visaId/agreement/:id',
  validateJWT,
  upload.single('uploadFile'),
  updateAgreement
);

export default router;
