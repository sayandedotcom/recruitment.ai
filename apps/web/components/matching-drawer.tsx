"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SHEET_SIDES = ["right"] as const;

export function MatchingSheet({
  children,
  data,
  isFetching,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  data?: MatchingDetailModel;
  isFetching?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const side = SHEET_SIDES[0];
  const textColor = data ? "bg-green-400" : "bg-red-400";

  return (
    <Sheet key={side} open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={side}
        className="overflow-y-auto overflow-x-hidden transition-transform duration-300 sm:max-w-lg"
      >
        {/* <SheetHeader >
          <SheetTitle>Detail Analyse Job Description</SheetTitle>
          <SheetDescription>
            View detailed information about the job position.
          </SheetDescription>
        </SheetHeader> */}
        <div className="flex items-center p-2 justify-center bg-blue-700 text-white">
          <div className="text-base font-bold">
            Detail Analyse Job Description
          </div>
        </div>
        <div className="w-[500px] text-sm">
          {!data || isFetching ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <>
              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Candidate Name
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {candidateData?.candidate_name
                    ? candidateData?.candidate_name
                    : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Candidate Phone Number
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.phone_number ? data?.phone_number : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Candidate CV Name
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.cv_name ? data?.cv_name : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Job Name
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.job_name ? data?.job_name : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Matching Score
                </div>
                <p className={`text-sm font-semibold leading-6 ${textColor}`}>
                  {data?.score ? data?.score : "0"}%
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Summary Analyse Candidate
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.summary_comment ? data?.summary_comment : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Recommended Jobs
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.job_recommended ? data?.job_recommended : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Analyse Educations
                </div>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Comment:{" "}
                  {data?.degree.comment ? data?.degree.comment : "None"}
                </p>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Score: {data?.degree.score ? data?.degree.score : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Experiences
                </div>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Comment:{" "}
                  {data?.experience.comment ? data?.experience.comment : "None"}
                </p>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Score:{" "}
                  {data?.experience.score ? data?.experience.score : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Responsibilities
                </div>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Comment:{" "}
                  {data?.responsibility.comment
                    ? data?.responsibility.comment
                    : "None"}
                </p>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Score:{" "}
                  {data?.responsibility.score
                    ? data?.responsibility.score
                    : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Technicall Skills
                </div>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Comment:{" "}
                  {data?.technical_skill.comment
                    ? data?.technical_skill.comment
                    : "None"}
                </p>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Score:{" "}
                  {data?.technical_skill.score
                    ? data?.technical_skill.score
                    : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Soft Skills
                </div>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Comment:{" "}
                  {data?.soft_skill.comment ? data?.soft_skill.comment : "None"}
                </p>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Score:{" "}
                  {data?.soft_skill.score ? data?.soft_skill.score : "None"}
                </p>
              </div>

              <div className="p-2">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  Certificates
                </div>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Comment:{" "}
                  {data?.certificate.comment
                    ? data?.certificate.comment
                    : "None"}
                </p>
                <p className="px-2 text-sm leading-6 text-gray-60">
                  Score:{" "}
                  {data?.certificate.score ? data?.certificate.score : "None"}
                </p>
              </div>
            </>
          )}
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
