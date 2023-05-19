export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  fullname: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  fullname: string;
  gender: string;
  dob: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  nationality: string;
  profession: string;
  phone: string;
  maritalStatus: string;
}

export interface IUserData {
  fullname: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    token: string;
  };
}

export interface IVisaApplicant {
  acceptTermsAndConditions: boolean;
  city: string;
  country: string;
  createdAt: string;
  dob: string;
  email: string;
  emailConfirmed: boolean;
  emailToken: string;
  fullname: string;
  gender: string;
  id: string;
  maritalStatus: string;
  nationality: string;
  password: string;
  phone: string;
  profession: string;
  street: string;
  updatedAt: string;
  zipCode: string;
}

export interface IVisaApplicationFormValues {
  fullName: string;
  gender: string;
  street: string;
  zipCode?: number;
  country: string;
  email: string;
  phone: string;
  nationality: string;
  residencePermit: string;
  profession: string;
  destinationCountry: string;
  kindOfVisa: string;
  expectedTravelStartDate: moment.Moment | null;
  expectedReturnFlightData: moment.Moment | null;
  cruise: string;
  invoiceSameAsApplicant: string;
  isSameAsApplicant: string;
  datel: moment.Moment | null;
  place: string;
}

export interface ISingleApplication {
  Agreement: IAgreement | null;
  Documents: Array<IDocument> | null;
  FlightInformation: IFlightInformation | null;
  country: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
  user: IVisaApplicant;
  userId: string;
  visaApplicationId: string;
  visaProcessingType: string;
}

export interface IFlightInformation {
  additionalAddress?: string;
  createdAt: string;
  updatedAt: string;
  cruise?: boolean;
  expectedReturnFlightDate?: string;
  expectedTravelStartDate?: string;
  id: string;
  invoiceRecipientSameAsApplicant?: boolean;
  kindOfTrip?: string;
  visa_ApplicationId?: string;
}

export interface IAgreement {
  id: string;
  createdAt: string;
  updatedAt: string;
  place?: string;
  date?: string;
}

export interface IDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  documentImageFilePath: string;
  documentNameType: string;
}
