import {
  ReactHookFormIntermediateInput,
  TRHFInputProps,
} from "@/components/react-hook-intermediate-input";
import { FieldValues } from "react-hook-form";

const CreateRHFInput =
  <T extends FieldValues>() =>
  (props: TRHFInputProps<T>) => (
    <ReactHookFormIntermediateInput<T> {...props} />
  );

export default CreateRHFInput;
