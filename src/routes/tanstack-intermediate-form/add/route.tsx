import { IntermediateForm } from "@/components/intermediate-form/form";
import { db } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tanstack-intermediate-form/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const saveUserMutation = useMutation({
    mutationFn: async (value: { name: string; age: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      db.saveUser(value);
    },
    onSuccess: () => {
      navigate({ to: "/tanstack-intermediate-form/view" });
    },
  });

  return (
    <div>
      <span className="text-3xl">Add Form</span>
      <IntermediateForm mode="add" onSubmit={saveUserMutation.mutateAsync} />
    </div>
  );
}
