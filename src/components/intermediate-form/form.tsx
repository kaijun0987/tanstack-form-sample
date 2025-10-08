import { z } from "zod";
import { TanstackForm } from "../tanstack-form";

type TIntermediateForm = {
  mode: "add" | "edit" | "view";
  data?: { name: string; age: string };
  onSubmit?: (values: { name: string; age: string }) => void;
};

const zodSchema = z.object({
  name: z.string().min(5),
  age: z.string().min(5),
});

export const IntermediateForm = ({
  mode,
  data,
  onSubmit,
}: TIntermediateForm) => {
  return (
    <TanstackForm
      schema={zodSchema}
      defaultValues={{
        name: data?.name || "",
        age: data?.age || "",
      }}
      validators={{
        onMount: mode !== "view" ? zodSchema : undefined,
        onSubmit: mode !== "view" ? zodSchema : undefined,
      }}
      sections={[
        {
          title: "User Information",
          fields: [
            {
              name: "name",
              label: "Name",
              required: true,
              type: "text",
              disabled: mode === "view",
              validators: {
                onChange: mode !== "view" ? zodSchema.shape.name : undefined,
              },
            },
            {
              name: "age",
              label: "Age",
              required: true,
              type: "text",
              disabled: mode === "view",
              validators: {
                onChange: mode !== "view" ? zodSchema.shape.age : undefined,
              },
            },
          ],
        },
      ]}
      onSubmit={onSubmit}
    />
  );
};
