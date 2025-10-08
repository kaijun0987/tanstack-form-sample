import { useFormikContext } from "formik";
import { ComponentProps } from "react";

type TFormButtonProps = ComponentProps<"button">;

export const FormikButton = ({ children, ...props }: TFormButtonProps) => {
  const { isSubmitting, isValid } = useFormikContext();

  const canSubmit = isValid && !isSubmitting;

  return (
    <button
      {...props}
      type="submit"
      disabled={!canSubmit}
      className={`border mt-5 ml-6 px-3 py-1 rounded ${
        !canSubmit ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}>
      {isSubmitting ? "..." : children}
    </button>
  );
};
