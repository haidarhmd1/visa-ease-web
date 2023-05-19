// eslint-disable-next-line import/no-cycle
import { IUser } from './user';

export interface IVisaApplication {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  visaProcessingType: 'STANDARD' | 'EXPRESS';
  visaApplicationId: string;
  user: IUser;
  userId: string;
  FlightInformation?: IFlightInformation;
  Documents?: IDocuments;
  Agreement?: IAgreement;
}

interface IFlightInformation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expectedTravelStartDate: Date;
  expectedReturnFlightDate: Date;
  cruise: boolean;
  invoiceRecipientSameAsApplicant: boolean;
  additionalAddress?: string;
  kindOfTrip: 'SINGLE_ENTRY' | 'MULTIPLE_ENTRY' | 'TRANSIT';
  visa: IVisaApplication;
  visa_ApplicationId: string;
}

interface IDocuments {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  passportImageFilePath?: string;
  biometricImageFilePath?: string;
  residencePermitFrontImageFilePath?: string;
  residencePermitBackImageFilePath?: string;
  visa: IVisaApplication;
  visa_ApplicationId: string;
}

interface IAgreement {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  place: string;
  date: Date;
  signatureFile: string;
  visa: IVisaApplication;
  visa_ApplicationId: string;
}
