"use client";

import { useState } from "react";

import UseTableTanStackSSR from "@/hooks/react-table/useTableTanStackSSR";
import { useFAQData, useJobDetailData } from "@/hooks/requests";
import { Button } from "@/components/ui/button";
import { JobSheet } from "@/components/job-drawer";
import { JobDialog } from "@/components/job-dialog";

import { createColumnHelper } from "@tanstack/react-table";
import {
  CircleEllipsis,
  EllipsisVertical,
  ListCollapse,
  Plus,
  Trash2,
} from "lucide-react";

function JobPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [expandedRows, setExpandedRows] = useState<{
    [key: string]: boolean;
  }>({});

  const { data: jobDetailsData, isFetching: jobDetailsDataisFetching } =
    useJobDetailData(selectedJobId);

  const { data, refetch } = useFAQData(1, 10);
  const columnHelper = createColumnHelper<JobModel>();

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDetail = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsSheetOpen(true);
  };

  const columns = [
    columnHelper.display({
      header: "ID",
      cell: ({ row }) => {
        return <p className="text-center">{row.index + 1}</p>;
      },
    }),
    columnHelper.display({
      header: "Position Name",
      cell: ({ row }) => {
        return <>{row.original.job_name}</>;
      },
    }),
    columnHelper.accessor("job_description", {
      header: "Job Description",
      cell: ({ row }) => {
        if (!row.original.job_description) {
          return null;
        }
        const rowId = row.id;
        const isExpanded = expandedRows[rowId] || false;
        const job_description = row.original.job_description;

        if (!job_description) return null;

        const content = isExpanded
          ? job_description
          : job_description.slice(0, 200) + " .....";

        return (
          <>
            <div
              className="whitespace-pre-line text-left"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {job_description.length > 200 && (
              <button
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={() => toggleRow(rowId)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      header: "Job Created Date",
      cell: (props) => (
        <p className="text-center">
          {new Date(props.getValue()).toLocaleDateString()}
        </p>
      ),
    }),
    columnHelper.display({
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              variant={"default"}
              size={"icon"}
              onClick={() => handleDetail(row.original._id)}
              className="p-2 rounded-lg text-xs font-medium text-center focus:ring-4 focus:outline-none"
            >
              <ListCollapse />
              {/* Detail */}
            </Button>
            {/* <Button
              className="p-2 rounded-lg text-xs font-medium text-center"
              // onClick={() => handleModifyFAQ(row.original._id)}
            >
              Update
            </Button> */}
            <Button
              variant={"destructive"}
              size={"icon"}
              className="p-2 rounded-lg text-xs font-medium text-center focus:ring-4 focus:outline-none"
              // onClick={() => handleDeleteFAQ(row.original._id)}
            >
              <Trash2 />
              {/* Delete */}
            </Button>
          </div>
        );
      },
    }),
  ];

  return (
    <div className="mx-5 py-4">
      <div className="mb-4">
        <JobDialog refetch={refetch}>
          <Button>
            <Plus />
            Create New Job
          </Button>
        </JobDialog>
      </div>
      <JobSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        data={jobDetailsData}
        isFetching={jobDetailsDataisFetching}
      />
      <UseTableTanStackSSR
        listingType="job"
        columns={columns}
        data={
          data?.results || [
            {
              _id: "123",
              job_name: "Software Engineer",
              job_description: "Develop and maintain software applications.",
              created_at: "2023-10-01",
            },
            {
              _id: "456",
              job_name: "Data Scientist",
              job_description:
                "Analyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data sets.",
              created_at: "2023-10-02",
            },
            {
              _id: "789",
              job_name: "Product Manager",
              job_description: "Oversee product development and strategy.",
              created_at: "2023-10-03",
            },
            {
              _id: "101112",
              job_name: "UX Designer",
              job_description:
                "Design user-friendly interfaces and experiences.",
              created_at: "2023-10-04",
            },
            {
              _id: "131415",
              job_name: "DevOps Engineer",
              job_description: "Manage and automate deployment processes.",
              created_at: "2023-10-05",
            },
          ]
        }
      />
    </div>
  );
}

export default JobPage;

// "mb-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
