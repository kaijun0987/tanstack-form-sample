import * as yup from "yup";

export const yupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Name must be at least 5 characters"), // 最少 5 个字符 :contentReference[oaicite:0]{index=0}
  age: yup
    .string()
    .required("Age is required")
    .min(5, "Age must be at least 5 characters"), // 最少 5 个字符 :contentReference[oaicite:1]{index=1}
});

export type YupSchemaType = yup.InferType<typeof yupSchema>;
