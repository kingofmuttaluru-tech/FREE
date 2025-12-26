
export interface LabTest {
  id: string;
  name: string;
  category: TestCategory;
  price: number;
  description: string;
  parameters: string[];
  referenceRange?: string;
}

export enum TestCategory {
  BLOOD = 'Blood Tests',
  BIOCHEMISTRY = 'Biochemistry',
  HORMONES = 'Hormones',
  VITAMINS = 'Vitamins',
  URINE = 'Urine Tests',
  SEROLOGY = 'Serology',
  SPECIAL = 'Special Tests'
}

export interface HealthPackage {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  testsIncluded: string[];
  description: string;
  isPopular?: boolean;
}

export type BookingStatus = 'Confirmed' | 'Sample Collected' | 'In Lab' | 'Processing' | 'Report Ready';

export interface Booking {
  id: string;
  patientName: string;
  testName: string;
  date: string;
  time: string;
  status: BookingStatus;
  location: 'Lab' | 'Home';
  trackingHistory: { status: BookingStatus; time: string; completed: boolean }[];
}

export interface Report {
  id: string;
  date: string;
  testName: string;
  category: TestCategory;
  status: 'Available' | 'Processing';
  patientInfo: {
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    id: string;
    referredBy: string;
  };
  results?: {
    parameter: string;
    value: string;
    unit: string;
    range: string;
    status: 'Normal' | 'Abnormal' | 'High' | 'Low';
  }[];
}
