export interface Section {
  id?: number;
  section: string;
  data: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateSectionRequest {
  section: string;
  data?: any;
}

export interface UpdateSectionRequest {
  section?: string;
  data?: any;
}
