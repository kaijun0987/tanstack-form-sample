import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "./ui/input";

type TInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

export function ReactHookInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: TInputFieldProps<T>) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`border rounded px-3 py-2 w-full ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldState.error && (
              <span className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}
