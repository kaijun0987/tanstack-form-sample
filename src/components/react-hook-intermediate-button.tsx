import { ComponentProps } from "react";
import { useFormContext, useFormState } from "react-hook-form";

type TFormButtonProps = ComponentProps<"button">;

export const ReactHookFormIntermediateButton = ({
  children,
  ...props
}: TFormButtonProps) => {
  const { control } = useFormContext();
  const { isSubmitting, isValid } = useFormState({
    control,
  });

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
