"use client";

import { DataTable } from "@/components/table-jobs";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  position: number;
  job_description: "pending" | "processing" | "success" | "failed";
  job_created: string;
  action: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "job_description",
    header: "Job Description",
  },
  {
    accessorKey: "job_created",
    header: "Job Created",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Button onClick={() => alert("View")}>View</Button>
          <Button onClick={() => console.log("Edit", job.id)}>Edit</Button>
        </div>
      );
    },
  },
];

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

export default function DemoPage() {
  const data = [
    {
      id: "728ed52f",
      position: 1,
      job_description: "pending",
      job_created: "2023-10-01",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
