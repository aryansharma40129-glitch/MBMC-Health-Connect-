export type RecordType = 'prescription' | 'lab_report' | 'vaccination';

export interface MedicalRecord {
  id: string;
  title: string;
  doctorName: string;
  date: string;
  type: RecordType;
  notes?: string;
  fileUrl?: string;
}

export interface UserProfile {
  name: string;
  abhaId: string;
  age: string;
  gender: string;
  bloodGroup: string;
}
