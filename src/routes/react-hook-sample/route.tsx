import { ReactHookInput } from "@/components/react-hook-input";
import { zodResolver } from "@hookform/resolvers/zod";
// import { yupResolver } from "@hookform/resolvers/yup";
import { createFileRoute } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = {
  username: string;
  age: string;
};

const zodSchema = z.object({
  username: z.string().min(5),
  age: z.string().min(5),
});

// const yupSchema = yup.object().shape({
//   username: yup
//     .string()
//     .required("Name is required")
//     .min(5, "Name must be at least 5 characters"), // 最少 5 个字符 :contentReference[oaicite:0]{index=0}
//   age: yup
//     .string()
//     .required("Age is required")
//     .min(5, "Age must be at least 5 characters"), // 最少 5 个字符 :contentReference[oaicite:1]{index=1}
// });

export const Route = createFileRoute("/react-hook-sample")({
  component: RouteComponent,
});

function RouteComponent() {
  const { control, handleSubmit } = useForm({
    defaultValues: { username: "", age: "" },
    mode: "onChange",
    resolver: zodResolver(zodSchema),
    // resolver: yupResolver(yupSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("提交成功 ✅", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <ReactHookInput
        control={control}
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        // rules={{
        //   required: "用户名不能为空",
        //   minLength: { value: 3, message: "至少 3 个字符" },
        // }}
      />

      <ReactHookInput
        control={control}
        name="age"
        label="年龄"
        type="text"
        placeholder="请输入年龄"
      />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        提交
      </button>
    </form>
  );
}
