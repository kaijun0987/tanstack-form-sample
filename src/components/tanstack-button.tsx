import { ComponentProps } from "react";
import { useFormContext } from "../hooks/form-context";

type TFormButtonProps = {} & ComponentProps<"button">;

export const FormButton = ({ children, ...props }: TFormButtonProps) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <button
          {...props}
          disabled={!canSubmit || isSubmitting}
          className={`border mt-5 ml-6 ${
            !canSubmit || isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
          }`}>
          {isSubmitting ? "..." : children}
        </button>
      )}
    </form.Subscribe>
  );
};
