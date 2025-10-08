import { FormikButton } from "@/components/formik-button";
import { FormikInput } from "@/components/formik-input";
import { createFileRoute } from "@tanstack/react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("用户名必填"),
  email: Yup.string().email("邮箱格式不正确").required("邮箱必填"),
});

export const Route = createFileRoute("/formik-sample")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Formik
      initialValues={{ username: "", email: "" }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("提交", values);
      }}>
      <Form className="max-w-sm mx-auto">
        <FormikInput name="username" label="用户名" placeholder="输入用户名" />
        <FormikInput name="email" label="邮箱" placeholder="输入邮箱" />
        <FormikButton>提交</FormikButton>
      </Form>
    </Formik>
  );
}
