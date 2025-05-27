"use client";

import React from "react";

import UseTableTanStackSSR from "@/hooks/react-table/useTableTanStackSSR";
import {
  useDetailFAQData,
  useFAQData,
  useJobDetailData,
} from "@/hooks/requests";

import { createColumnHelper, Row } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

import { DataTable } from "@/components/table-jobs";
import { Button } from "@/components/ui/button";
import { JobSheet } from "@/components/job-drawer";
import { JobDialog } from "@/components/job-dialog";

function JobPage() {
  const [showFullContent, setShowFullContent] = React.useState(false);
  const [showJobSheet, setShowJobSheet] = React.useState(false);
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);

  const {
    data: jobDetailsData,
    isFetching: jobDetailsDataisFetching,
  } = useJobDetailData(selectedJobId || "");

  const { data, refetch } = useFAQData(1, 10);
  const columnHelper = createColumnHelper<JobModel>();

  const handleDetail = async (jobId: string) => {
    setSelectedJobId(jobId);
    setShowJobSheet(true);
  };

  // Reset selected job when sheet closes
  const handleSheetOpenChange = (open: boolean) => {
    setShowJobSheet(open);
    if (!open) {
      setSelectedJobId(null);
    }
  };

  const columns = [
    columnHelper.display({
      header: "ID",
      cell: ({ row }: { row: Row<any> }) => {
        return <p className="text-center">{row.index + 1}</p>;
      },
    }),
    columnHelper.display({
      header: "Position Name",
      cell: ({ row }: { row: Row<any> }) => {
        return <>{row.original.job_name}</>;
      },
    }),
    columnHelper.accessor("job_description", {
      header: "Job Description",
      cell: ({ row }: { row: Row<any> }) => {
        if (!row.original.job_description) {
          return null;
        }
        const content = showFullContent
          ? row.original.job_description
          : row.original.job_description.slice(0, 200);
        return (
          <>
            <div
              className="whitespace-pre-line text-left"
              id="answer"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {row.original.job_description.length > 200 && (
              <button
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={() => setShowFullContent(!showFullContent)}
              >
                {showFullContent ? "Show less" : "Show more"}
              </button>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      header: "Job Created Date",
      cell: (props) => <p className="text-center">{props.getValue()}</p>,
    }),
    columnHelper.display({
      header: "Action",
      cell: ({ row }: { row: Row<any> }) => {
        return (
          <>
            {/* <button
              className="p-2 mr-2 rounded-lg text-xs font-medium text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              // onClick={() => handleModifyFAQ(row.original._id)}
            >
              Update
            </button> */}
            {/* <button
              className="p-2 mr-2 rounded-lg text-xs font-medium text-center text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              // onClick={() => handleDeleteFAQ(row.original._id)}
            >
              Delete
            </button> */}
            <JobSheet
              open={showJobSheet}
              onOpenChange={handleSheetOpenChange}
              data={jobDetailsData}
              isFetching={jobDetailsDataisFetching}
            >
              <Button
                // onClick={() => setJobId(row.original._id)}
                onClick={() => handleDetail(row.original._id)}
                className="p-2 mr-2 rounded-lg text-xs font-medium text-center text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" // onClick={() => handleAddFAQ()}
              >
                Detail
              </Button>
            </JobSheet>
            {/* <Button
              className="p-2 mr-2 rounded-lg text-xs font-medium text-center text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              // onClick={() => handleDetail(row.original._id)}
            >
              Detail
            </Button> */}
          </>
        );
      },
    }),
  ];

  return (
    <div className="mx-3 py-4">
      <JobDialog refetch={refetch}>
        <Button className="mb-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Create New Job
        </Button>
      </JobDialog>
      <UseTableTanStackSSR
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

// [
//   {
//     _id: "123",
//     job_name: "Software Engineer",
//     job_description: "Develop and maintain software applications.",
//     created_at: "2023-10-01",
//   },
//   {
//     _id: "456",
//     job_name: "Data Scientist",
//     job_description:
//       "Analyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data setsAnalyze and interpret complex data sets.",
//     created_at: "2023-10-02",
//   },
//   {
//     _id: "789",
//     job_name: "Product Manager",
//     job_description: "Oversee product development and strategy.",
//     created_at: "2023-10-03",
//   },
//   {
//     _id: "101112",
//     job_name: "UX Designer",
//     job_description: "Design user-friendly interfaces and experiences.",
//     created_at: "2023-10-04",
//   },
//   {
//     _id: "131415",
//     job_name: "DevOps Engineer",
//     job_description: "Manage and automate deployment processes.",
//     created_at: "2023-10-05",
//   },
// ];
