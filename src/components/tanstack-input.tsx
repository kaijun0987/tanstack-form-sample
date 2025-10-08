import { useStore } from "@tanstack/react-form";
import { ComponentProps } from "react";
import { useFieldContext } from "../hooks/form-context";
import { Input } from "./ui/input";

type TInputProps = {
  label: string;
} & ComponentProps<"input">;

export const TanstackInput = ({ label, ...props }: TInputProps) => {
  const field = useFieldContext<string>();
  const { errors, isTouched, isDirty } = useStore(field.store, (state) => ({
    errors: state.meta.errors,
    isTouched: state.meta.isTouched,
    isDirty: state.meta.isDirty,
  }));

  const shouldShowError = isTouched || isDirty;

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <Input
        {...props}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {shouldShowError && errors.length > 0 && (
        <div style={{ color: "red" }}>{errors[0].message}</div>
      )}
    </div>
  );
};
