export type DirectorCategory = 'executive' | 'board' | 'additional' | 'secretary';

export interface ManagementMember {
  name: string;
  designation: string;
  category: DirectorCategory;
  tenure: string;
  description: string;
}

export interface CompanyIdentity {
  cin: string;
  name: string;
  status: string;
  rocCode: string;
  registrationNumber: string;
  category: string;
  subCategory: string;
  classOfCompany: string;
  dateOfIncorporation: string;
}

export interface CapitalStructure {
  authorizedCapital: string;
  authorizedCapitalWords: string;
  paidUpCapital: string;
  paidUpCapitalWords: string;
  operatingRevenue: string;
  fiscalYear: string;
  paidUpPercentage: number;
}

export interface ContactDetails {
  address: string;
  email: string;
  phone: string;
  city: string;
  pinCode: string;
}

export interface OperationsDetails {
  principalActivity: string;
  nicCode: string;
  lastAgmDate: string;
  sector: string;
}

export interface CompanyDetails {
  identity: CompanyIdentity;
  capital: CapitalStructure;
  contact: ContactDetails;
  management: ManagementMember[];
  operations: OperationsDetails;
}

export type ModalType =
  | 'identity'
  | 'capital'
  | 'management'
  | 'operations'
  | 'calculator'
  | 'contact'
  | 'searchGrounding'
  | 'mapsGrounding'
  | 'userPortal';

export interface ModalContent {
  title: string;
  subtitle: string;
  type: ModalType;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface GroundingResult {
  text: string;
  sources: GroundingSource[];
  searchQueries?: string[];
}
