// eslint-disable-next-line import/no-cycle
import { IVisaApplication } from './visa';

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dob: Date;
  street: string;
  email: string;
  password: string;
  acceptTermsAndConditions: boolean;
  zipCode: string | null;
  city: string;
  country: string;
  nationality: string;
  profession: string;
  phone: string;
  emailConfirmed: boolean;
  emailToken: string;
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  visaApplication?: IVisaApplication[];
}

export interface ILogin {
  id: string;
  email: string;
  password: string;
}
