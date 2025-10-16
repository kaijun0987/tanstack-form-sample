import { ReactHookFormIntermediateButton } from "@/components/react-hook-intermediate-button";
import { ReactHookFormIntermediateInput } from "@/components/react-hook-intermediate-input";
import { db } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/react-hook-intermediate-form")({
  component: RouteComponent,
});

type TUserForm = {
  username: string;
  email: string;
};

const zodSchema = z.object({
  username: z.string().min(5),
  email: z.string().min(5),
});

function RouteComponent() {
  const saveUserMutation = useMutation({
    mutationFn: async (value: { name: string; email: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      db.saveUser(value);
    },
  });

  const methods = useForm<TUserForm>({
    defaultValues: { username: "", email: "" },
    mode: "onChange",
    resolver: zodResolver(zodSchema),
    // reValidateMode: "onChange",
  });

  const onSubmit = async (data: TUserForm) => {
    console.log("✅ 提交成功", data);
    await saveUserMutation.mutateAsync({
      name: data.username,
      email: data.email,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center">
        <ReactHookFormIntermediateInput<TUserForm>
          name="username"
          label="用户名"
          placeholder="输入用户名"
        />
        <ReactHookFormIntermediateInput<TUserForm>
          name="email"
          label="邮箱"
          placeholder="输入邮箱"
        />
        <ReactHookFormIntermediateButton>
          Submit
        </ReactHookFormIntermediateButton>
      </form>
    </FormProvider>
  );
}
