import { useAppForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
import {
  DeepKeys,
  DeepValue,
  FieldValidateOrFn,
  FieldValidators,
  FormValidateOrFn,
  FormValidators,
} from "@tanstack/react-form";
import { FormEvent } from "react";
import z from "zod";

type TName<T> = DeepKeys<T>;
type TData<T> = DeepValue<T, DeepKeys<T>>;

/**
 * Configuration for form validation triggers
 */
export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  required?: boolean;
  className?: string;
  type: "text";
  placeholder?: string;
  disabled?: boolean;
  validators?: FieldValidators<
    T,
    TName<T>,
    TData<T>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>,
    undefined | FieldValidateOrFn<T, TName<T>, TData<T>>
  >;
};

/**
 * Configuration for the TanstackForm component
 * @template T - The Zod schema shape type
 */
type TTanstackForm<T extends z.ZodRawShape> = {
  schema: z.ZodObject<T>;
  defaultValues: z.infer<z.ZodObject<T>>;
  sections: {
    title: string;
    fields: (FieldConfig<z.infer<z.ZodObject<T>>> | undefined)[];
  }[];
  onSubmit?: (values: z.infer<z.ZodObject<T>>) => void | Promise<void>;
  className?: string;
  validators?: FormValidators<
    z.infer<z.ZodObject<T>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>,
    undefined | FormValidateOrFn<z.infer<z.ZodObject<T>>>
  >;
};

export const TanstackForm = <T extends z.ZodRawShape>({
  schema,
  defaultValues,
  sections,
  validators,
  onSubmit,
}: TTanstackForm<T>) => {
  const form = useAppForm({
    defaultValues: defaultValues as z.infer<typeof schema>,
    validators,
    onSubmit: async (submitEvent) => {
      const valid = schema.safeParse(submitEvent.value);
      if (!valid.success) {
        // show error message if needed
        return;
      }
      await onSubmit?.(valid.data);
      form.reset();
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {onSubmit && (
        <div className="flex flex-row w-full mb-3">
          <form.AppForm>
            <form.FormButton
              type="submit"
              className="border-2 mt-2 cursor-pointer">
              Submit
            </form.FormButton>
          </form.AppForm>
        </div>
      )}

      {sections.map((section) => {
        return (
          <div
            key={section.title}
            className="flex flex-col border-4 border-blue-500 p-2">
            <h2 className="text-4xl">{section.title}</h2>
            <div className="flex flex-row gap-2">
              {section.fields.map((item) => {
                if (!item) return <div key={"empty"} className="w-full h-4" />;
                if (item.type === "text") {
                  return (
                    <div key={item.name as string}>
                      <form.AppField
                        name={item.name as string}
                        validators={item.validators}>
                        {(field) => (
                          <field.TanstackInput
                            label={item.label as string}
                            className={cn("border-2", item.className)}
                            placeholder={item.placeholder}
                            disabled={item.disabled}
                          />
                        )}
                      </form.AppField>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </form>
  );
};
