import { ComponentProps } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { Input } from "./ui/input";

export type TRHFInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
} & Omit<ComponentProps<"input">, "name">;

export const ReactHookFormIntermediateInput = <T extends FieldValues>({
  name,
  label,
  ...props
}: TRHFInputProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    field,
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });

  const shouldShowError = isTouched || isDirty;

  return (
    <div className="flex flex-col mb-3">
      {label && <label htmlFor={name}>{label}</label>}
      <Input {...field} {...props} id={name} />
      {shouldShowError && error && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  );
};
