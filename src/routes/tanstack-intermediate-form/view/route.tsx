import { IntermediateForm } from "@/components/intermediate-form/form";
import { db } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tanstack-intermediate-form/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: () => {
      return db.getData();
    },
  });

  return (
    <div>
      <span className="text-3xl">View Form</span>
      <IntermediateForm
        mode="view"
        data={{
          name: data?.name || "",
          age: data?.age || "",
        }}
      />
    </div>
  );
}
