import * as Yup from 'yup';

export const createSectionSchema = Yup.object({
  section: Yup.string()
    .required('Section name is required')
    .min(1, 'Section name cannot be empty')
    .max(255, 'Section name is too long'),
  data: Yup.mixed()
    .optional()
    .default({})
});

export const updateSectionSchema = Yup.object({
  section: Yup.string()
    .optional()
    .min(1, 'Section name cannot be empty')
    .max(255, 'Section name is too long'),
  data: Yup.mixed()
    .optional()
});

export type CreateSectionType = Yup.InferType<typeof createSectionSchema>;
export type UpdateSectionType = Yup.InferType<typeof updateSectionSchema>;
