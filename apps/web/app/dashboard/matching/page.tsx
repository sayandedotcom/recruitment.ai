"use client";

import { MatchingSheet } from "@/components/matching-drawer";
import { SelectJob } from "@/components/select-job";
import { Button } from "@/components/ui/button";
import UseTableTanStackSSR from "@/hooks/react-table/useTableTanStackSSR";
import {
  useAllJobData,
  useMachingData,
  useMatchingDetailData,
  useMatchingPageData,
} from "@/hooks/requests";
import { createColumnHelper } from "@tanstack/react-table";
import { Bot, ListCollapse, Mail, Trash2 } from "lucide-react";
import { useState } from "react";

function MatchingPage() {
  const [selectedJobName, setSelectedJobName] = useState<string>("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: jobDetailsData, isFetching: jobDetailsDataisFetching } =
    useMatchingDetailData(selectedCandidateId, selectedJobId);

  console.log("jobDetailsData", jobDetailsData);

  const [expandedRows, setExpandedRows] = useState<{
    [key: string]: boolean;
  }>({});

  const { data, isLoading, isError, refetch } = useMatchingPageData(
    selectedJobName,
    1,
    10
  );

  const { mutate: processMatching } = useMachingData();

  const [loadingMatching, setLoadingMatching] = useState<boolean>(false);

  const handleMatchingCandidate = async () => {
    if (selectedJobName !== "Position Name") {
      setLoadingMatching(true);
      processMatching(
        { jobName: selectedJobName },
        {
          onError: (error: any) => {
            // console.log('Matching error:', error.response.status);
            setLoadingMatching(false);
            // toast.error("Process Matching Candidate failed");
          },
          onSuccess: async () => {
            setLoadingMatching(false);
            // setIsOpenModalAdd(false);
            // setInputs([]);
            refetch();
            // toast.success("Process Matching Candidate success");
          },
        }
      );
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDetail = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setIsSheetOpen(true);
  };

  // Handle item selection
  const handleMenuItemClick = (jobId: string, jobName: string) => {
    setSelectedJobId(jobId);
    setSelectedJobName(jobName);

    // Call refetch to fetch data for the newly selected job
    refetch();
  };

  console.log(data?.results[0]?.status);

  const columnHelper = createColumnHelper<JobMatchingModel>();

  const columns = [
    columnHelper.display({
      header: "ID",
      cell: ({ row }) => <p className="text-center">{row.index + 1}</p>,
    }),
    columnHelper.display({
      header: "Candidate Name",
      cell: ({ row }) => {
        return <p className="text-center">{row.original.candidate_name}</p>;
      },
    }),
    columnHelper.display({
      header: "Email Address",
      cell: ({ row }) => {
        return <p className="text-center">{row.original.candidate_email}</p>;
      },
    }),
    columnHelper.accessor("summary_comment", {
      header: "Comment",
      cell: ({ row }) => {
        if (!row.original.summary_comment) {
          return null;
        }

        const rowId = row.id;
        const isExpanded = expandedRows[rowId] || false;
        const summary_comment = row.original.summary_comment;

        if (!summary_comment) return null;

        const content = isExpanded
          ? summary_comment
          : summary_comment.slice(0, 200) + " .....";

        return (
          <>
            <div
              className="whitespace-pre-line text-left"
              id="answer"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {row.original.summary_comment.length > 200 && (
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
    columnHelper.accessor("score", {
      header: "Matching Score",

      cell: (props) => {
        const defaltscore = props.getValue();
        let textColor = "text-red-500"; // Default to red

        // Cast score to a number
        const score = Number(defaltscore);

        switch (true) {
          case score < 40:
            textColor = "text-red-500";
            break;
          case score >= 40 && score < 50:
            textColor = "text-orange-500";
            break;
          case score >= 50 && score < 60:
            textColor = "text-yellow-500";
            break;
          case score >= 60 && score < 70:
            textColor = "text-blue-500"; // You can choose a different color
            break;
          default:
            textColor = "text-green-500"; // Highest score is green
            break;
        }
        return (
          <div className={`text-sm font-semibold ${textColor} text-center`}>
            {selectedJobName === "Position Name"
              ? null
              : `${score.toFixed(1)}%`}
          </div>
        );
      },
    }),
    columnHelper.display({
      header: "Status",
      cell: ({ row }) => {
        // Determine the CSS class based on the matching_status
        const statusClass =
          row.original.status === "accepted" ? "bg-green-400" : "bg-red-400";
        // Convert matching_status to a string
        const statusString =
          row.original.status === "accepted" ? "Accepted" : "Rejected";

        return (
          <div
            className={`inline-flex items-center mx-auto gap-1 rounded-full px-2 py-1 text-xs font-semibold text-gray-100 ${statusClass}`}
          >
            {statusString}
          </div>
        );
      },
    }),
    // columnHelper.display({
    //   header: "Mailing Status",
    //   cell: ({ row }) => {
    //     const statusClass = row.original.status ? "bg-green-400" : "bg-red-400";
    //     const statusString = row.original.status && "Mail Sent";
    //     return (
    //       <div
    //         className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-gray-100 ${statusClass}`}
    //       >
    //         <Mail className="h-3 w-3" />
    //         {statusString}
    //       </div>
    //     );
    //   },
    // }),
    columnHelper.display({
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              variant={"default"}
              size={"icon"}
              onClick={() => handleDetail(row.original.id)}
            >
              <ListCollapse />
            </Button>
            <Button
              variant={"destructive"}
              size={"icon"}
              className="p-2 rounded-lg text-xs font-medium text-center focus:ring-4 focus:outline-none"
              //  onClick={ () =>             showModalDelete(row.original._id, row.original.cv_name)
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
    <div className="mx-3 py-4">
      <div className="flex items-center justify-between my-2">
        <Button
          // className={`flex mb-4 px-3 py-2 text-sm font-medium text-center rounded-lg focus:outline-none ${
          //   loadingMatching
          //     ? "bg-gray-300 cursor-not-allowed"
          //     : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          // }`}
          onClick={() => handleMatchingCandidate()}
          disabled={loadingMatching}
        >
          <Bot />
          {loadingMatching ? "Matching..." : "Match Resumes"}
        </Button>

        <SelectJob handleMenuItemClick={handleMenuItemClick} />
      </div>
      <MatchingSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        data={jobDetailsData}
        isFetching={jobDetailsDataisFetching}
      />
      <UseTableTanStackSSR
        listingType="matching"
        columns={columns}
        data={
          data?.results || [
            {
              id: "1",
              candidate_name: "John Doe",
              candidate_email: "gbdhntj",
              comment:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              score: "85",
              matching_status: true,
            },
          ]
        }
      />
    </div>
  );
}

export default MatchingPage;
