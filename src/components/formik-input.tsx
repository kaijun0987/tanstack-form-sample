import { useField } from "formik";
import { ComponentProps } from "react";
import { Input } from "./ui/input";

type TInputProps = {
  label: string;
} & ComponentProps<"input">;

export const FormikInput: React.FC<TInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField<string>(props.name);

  return (
    <div className="flex flex-col mb-3">
      {label && <label htmlFor={props.name}>{label}</label>}
      <Input
        {...field}
        {...props}
        id={props.name}
        className="border px-2 py-1 rounded border-gray-300 focus:ring"
      />
      {meta.touched && meta.error ? (
        <span className="text-red-500 text-sm">{meta.error}</span>
      ) : null}
    </div>
  );
};
