import  * as Yup from 'yup'

export const userSchema = Yup.object({
  id: Yup.number(),
  email: Yup.string().email(),
  password: Yup.string(),
});

export type User = Yup.InferType<typeof userSchema>;