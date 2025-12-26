
import { LabTest, TestCategory, HealthPackage, Report, Booking } from './types';

export const LAB_TESTS: LabTest[] = [
  { id: 't1', name: 'CBC / CBP (Complete Blood Picture)', category: TestCategory.BLOOD, price: 250, description: 'Hemoglobin, WBC, Platelets & 5-Part Differential.', parameters: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'ESR'] },
  { id: 't2', name: 'ESR (Erythrocyte Sedimentation Rate)', category: TestCategory.BLOOD, price: 100, description: 'Inflammation marker.', parameters: ['ESR'] },
  { id: 't3', name: 'Blood Group & Rh Typing', category: TestCategory.BLOOD, price: 100, description: 'Determines ABO and Rh group.', parameters: ['Blood Group', 'Rh Factor'] },
  { id: 't4', name: 'LFT (Liver Function Test)', category: TestCategory.BIOCHEMISTRY, price: 600, description: 'Liver health markers.', parameters: ['Bilirubin', 'SGOT', 'SGPT', 'Albumin'] },
  { id: 't5', name: 'KFT (Kidney Function Test)', category: TestCategory.BIOCHEMISTRY, price: 500, description: 'Kidney efficiency markers.', parameters: ['Urea', 'Creatinine', 'Uric Acid'] },
  { id: 't6', name: 'Lipid Profile', category: TestCategory.BIOCHEMISTRY, price: 600, description: 'Heart health / Cholesterol.', parameters: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'] },
  { id: 't7', name: 'Thyroid Profile (T3, T4, TSH)', category: TestCategory.HORMONES, price: 500, description: 'Metabolism screening.', parameters: ['T3', 'T4', 'TSH'] },
  { id: 't8', name: 'Vitamin D (25-OH)', category: TestCategory.VITAMINS, price: 800, description: 'Bone and immune health.', parameters: ['25-Hydroxy Vitamin D'] },
  { id: 't9', name: 'Vitamin B12', category: TestCategory.VITAMINS, price: 600, description: 'Nerve and blood health.', parameters: ['Vitamin B12'] },
  { id: 't10', name: 'Urine Routine', category: TestCategory.URINE, price: 150, description: 'Routine urine analysis.', parameters: ['Color', 'pH', 'Protein'] },
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 'rep1',
    date: '2024-05-15',
    testName: 'CBC / CBP (Complete Blood Picture)',
    category: TestCategory.BLOOD,
    status: 'Available',
    patientInfo: {
      name: 'Balu Kumar',
      age: 28,
      gender: 'Male',
      id: 'FB-102938',
      referredBy: 'Self'
    },
    results: [
      { parameter: 'Hemoglobin', value: '11.5', unit: 'g/dL', range: '13.0 - 17.0', status: 'Low' },
      { parameter: 'RBC Count', value: '4.8', unit: 'million/µL', range: '4.5 - 5.5', status: 'Normal' },
      { parameter: 'WBC Count', value: '12500', unit: 'cells/µL', range: '4000 - 11000', status: 'High' },
      { parameter: 'Platelet Count', value: '2.8', unit: 'lakh/µL', range: '1.5 - 4.5', status: 'Normal' },
      { parameter: 'Neutrophils', value: '72', unit: '%', range: '40 - 70', status: 'High' },
      { parameter: 'Lymphocytes', value: '22', unit: '%', range: '20 - 40', status: 'Normal' },
      { parameter: 'ESR', value: '18', unit: 'mm/hr', range: '< 15', status: 'High' }
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'B-9021',
    patientName: 'Balu Kumar',
    testName: 'Full Body Wellness',
    date: '2024-05-20',
    time: '08:30 AM',
    status: 'In Lab',
    location: 'Home',
    trackingHistory: [
      { status: 'Confirmed', time: '07:00 AM', completed: true },
      { status: 'Sample Collected', time: '08:45 AM', completed: true },
      { status: 'In Lab', time: '10:30 AM', completed: true },
      { status: 'Processing', time: '--', completed: false },
      { status: 'Report Ready', time: '--', completed: false }
    ]
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  { id: 'p1', name: 'Basic Checkup', price: 499, originalPrice: 1200, testsIncluded: ['CBC', 'Blood Group', 'Urine Routine'], description: 'Essential screening.', isPopular: false },
  { id: 'p2', name: 'Full Body Wellness', price: 999, originalPrice: 3500, testsIncluded: ['CBC', 'LFT', 'KFT', 'Lipid', 'Thyroid', 'Urine'], description: 'Complete organ screening.', isPopular: true }
];
