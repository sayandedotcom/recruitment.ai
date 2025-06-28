"use client";

import { CandidateSheet } from "@/components/candidate-drawer";
import { Button } from "@/components/ui/button";
import UploadZoneComponent from "@/components/UploadZoneComponent";
import UseTableTanStackSSR from "@/hooks/react-table/useTableTanStackSSR";
import { useListCandidateData, useListFileDetailData } from "@/hooks/requests";
import { createColumnHelper } from "@tanstack/react-table";
import { ListCollapse, Trash2 } from "lucide-react";
import { useState } from "react";

function CandidatesPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useListCandidateData(1, 10);
  const columnHelper = createColumnHelper<CandidateModel>();

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { data: jobDetailsData, isFetching: jobDetailsDataisFetching } =
    useListFileDetailData(selectedCandidateId);

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

  const columns = [
    columnHelper.display({
      header: "ID",
      cell: ({ row }) => {
        return <p className="text-center">{row.index + 1}</p>;
      },
    }),
    columnHelper.accessor("candidate_name", {
      header: "Candidate Name",
      cell: (props) => <p className="text-center">{props.getValue()}</p>,
    }),
    columnHelper.accessor("email", {
      header: "Email Address",
      cell: (props) => <p className="text-center">{props.getValue()}</p>,
    }),
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
      cell: (props) => (
        <p className="text-center">
          {props.getValue() === "" ? "N/A" : props.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("comment", {
      header: "Summary",
      cell: ({ row }) => {
        if (!row.original.comment) {
          return null;
        }
        const rowId = row.id;
        const isExpanded = expandedRows[rowId] || false;
        const comment = row.original.comment;

        if (!comment) return null;

        const content = isExpanded ? comment : comment.slice(0, 200) + " .....";

        return (
          <>
            <div
              className="whitespace-pre-line text-left"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {comment.length > 200 && (
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
      header: "Date Created",
      cell: (props) => (
        <p className="text-center">
          {new Date(props.getValue()).toLocaleDateString()}
        </p>
      ),
    }),
    columnHelper.accessor("job_recommended", {
      header: "Recommended Jobs",
      cell: (props: any) => {
        const recommendedJobs = props.getValue();
        return (
          <div>
            {recommendedJobs.map((job: any, index: any) => (
              <p key={index}>
                • {job}
                {/* {index !== recommendedJobs.length - 1 ? ", " : ""} */}
              </p>
            ))}
          </div>
        );
      },
    }),
    columnHelper.display({
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={"default"}
              size={"icon"}
              onClick={() => handleDetail(row.original._id)}
              className="p-2 rounded-lg text-xs font-medium text-center focus:ring-4 focus:outline-none"
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
      <UploadZoneComponent refetch={refetch} />
      <CandidateSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        data={jobDetailsData}
        isFetching={jobDetailsDataisFetching}
      />
      <UseTableTanStackSSR
        listingType="candidate"
        columns={columns}
        data={
          data?.results || [
            {
              _id: "123",
              candidate_name: "John Doe",
              email: "fgrg",
              phone_number: "",
              cv_name: "John_Doe_CV.pdf",
              job_recommended: ["Software Engineer", "Data Analyst"],
              created_at: "2023-10-01",
            },
            {
              _id: "456",
              candidate_name: "Jane Smith",
              email: " tujyi7t ",
              phone_number: "0987654321",
              cv_name: "Jane_Smith_CV.pdf",
              job_recommended: ["Product Manager", "UX Designer"],
              created_at: "2023-10-02",
            },
          ]
        }
      />
    </div>
  );
}

export default CandidatesPage;
