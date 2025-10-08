// hooks/useAppForm.ts
import { createFormHook } from "@tanstack/react-form";
import { FormButton } from "../components/tanstack-button";
import { TanstackInput } from "../components/tanstack-input";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TanstackInput,
  },
  formComponents: {
    FormButton,
  },
  fieldContext,
  formContext,
});
