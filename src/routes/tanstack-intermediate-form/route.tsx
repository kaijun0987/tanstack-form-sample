import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tanstack-intermediate-form")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="text-5xl ">Main Page Tanstack Intermediate Page</div>
      <div className="flex flex-row text-3xl gap-5 pb-20">
        <Link to="/tanstack-intermediate-form/add" className="border-2">
          Add
        </Link>
        <Link to="/tanstack-intermediate-form/edit" className="border-2">
          Edit
        </Link>
        <Link to="/tanstack-intermediate-form/view" className="border-2">
          View
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
