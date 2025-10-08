import { IntermediateForm } from "@/components/intermediate-form/form";
import { db } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tanstack-intermediate-form/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () => {
      return db.getData();
    },
  });

  const saveUserMutation = useMutation({
    mutationFn: async (value: { name: string; age: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      db.saveUser(value);
    },
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div>
      <span className="text-3xl">Edit Form</span>
      <IntermediateForm
        mode="edit"
        data={{
          name: data?.name || "",
          age: data?.age || "",
        }}
        onSubmit={saveUserMutation.mutateAsync}
      />
    </div>
  );
}
