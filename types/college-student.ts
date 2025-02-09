export interface DepartmentData {
  faculty: string; // 学部名
  department: string; // 学科名
  male: number; // 男性入学者数
  female: number; // 女性入学者数
}

export interface AdmissionResults {
  admission_results: {
    departments: DepartmentData[];
    total: {
      male: number;
      female: number;
    };
  };
}
