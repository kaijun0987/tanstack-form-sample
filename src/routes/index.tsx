import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent } from "react";

import { zodSchema } from "@/schema/zod-schema";
// import { TYupSchema, yupSchema } from "./schema/yup-schema";
// import { useForm } from "@tanstack/react-form";

import { db } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import z from "zod";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const saveUserMutation = useMutation({
    mutationFn: async (value: { name: string; age: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      db.saveUser(value);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      age: "",
    } as z.infer<typeof zodSchema>,
    validators: {
      onChange: zodSchema,
      // onBlur: zodSchema,
      // onMount: zodSchema
      // onSubmit: zodSchema,
    },
    onSubmit: async (form: { value: z.infer<typeof zodSchema> }) => {
      await saveUserMutation.mutateAsync(form.value);
      console.log("values", form.value);
    },
  });
  // const form = useAppForm({
  //   defaultValues: {
  //     name: "",
  //     age: "",
  //   },

  //   validators: {
  //     //Not Support YupSchema
  //     // Currently support Schema refer
  //     // https://github.com/standard-schema/standard-schema
  //     // onSubmit: yupSchema,
  //     // onBlurAsync: zodSchema,
  //     // onChange: zodSchema,
  //     onMount: zodSchema,
  //     onSubmit: zodSchema,
  //   },
  //   onSubmit: async ({ formApi, value }) => {
  //     // console.log("values", form.value);
  //     await saveUserMutation.mutateAsync(value);

  //     // Reset the form to start-over with a clean state
  //     formApi.reset();
  //   },
  // });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="flex flex-col">
      <div className="text-5xl ">Main Page Tanstack Form basic sample</div>
      <div className="flex flex-row text-3xl gap-5 pb-20">
        <Link to="/formik-sample" className="border-2">
          Formik
        </Link>
        <Link to="/react-hook-sample" className="border-2">
          React Hook Form Sample
        </Link>
        <Link to="/react-hook-intermediate-form" className="border-2">
          React Hook Form Intermediate
        </Link>
        <Link to="/tanstack-intermediate-form" className="border-2">
          Tanstack Intermediate Form
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <form.Field
          name="name"
          children={(field) => (
            <input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border-2"
            />
          )}
        />

        {/* <form.AppField
          name="name"
          validators={{
            onChange: zodSchema.shape.name,
            onBlur: zodSchema.shape.name,
          }}>
          {(field) => <field.TanstackInput label="Name" className="border-2" />}
        </form.AppField> */}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />

        {/* <form.AppField
          name="age"
          validators={{
            onChange: zodSchema.shape.age,
            onBlur: zodSchema.shape.age,
          }}>
          {(field) => <field.TanstackInput label="Age" className="border-2" />}
        </form.AppField>

        <form.AppForm>
          <form.FormButton
            type="submit"
            className="border-2 mt-2 cursor-pointer">
            Submit
          </form.FormButton>
        </form.AppForm> */}
      </form>
    </div>
  );
}
