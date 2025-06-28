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

export function CandidateSheet({
  children,
  data,
  isFetching,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  data?: CandidateDetailModel;
  isFetching?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const side = SHEET_SIDES[0];
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
                  {data?.candidate_name ? data?.candidate_name : "None"}
                </p>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Candidate Email Address
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.email ? data?.email : "None"}
                </p>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Candidate Phone Number
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.phone_number ? data?.phone_number : "None"}
                </p>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Candidate Summary
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.comment ? data?.comment : "None"}
                </p>

                <div className="text-base font-semibold leading-7 text-gray-900">
                  Recommended Jobs
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.job_recommended
                    ? data?.job_recommended.join(", ")
                    : "None"}
                </p>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Educations
                </div>
                <ul className="list-disc pl-6 text-sm leading-6 text-gray-600">
                  {(data?.degree || []).length > 0 ? (
                    data?.degree.map((edu, index) => <li key={index}>{edu}</li>)
                  ) : (
                    <li>None</li>
                  )}
                </ul>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Experiences
                </div>
                <ul className="list-disc pl-6 text-sm leading-6 text-gray-600">
                  {(data?.experience || []).length > 0 ? (
                    data?.experience.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Responsibilities
                </div>
                <ul className="list-disc pl-6 text-sm leading-6 text-gray-600">
                  {(data?.responsibility || []).length > 0 ? (
                    data?.responsibility.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Technicall Skills
                </div>
                <div className="px-2 max-w-[500px]">
                  {(data?.technical_skill || []).length > 0 ? (
                    <div className="flex flex-wrap">
                      {data?.technical_skill.map((edu, index) => (
                        <span
                          className="rounded-full bg-blue-500 text-white px-2 py-1 m-1"
                          key={index}
                        >
                          {edu.replace(/\s/g, "")}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div>None</div>
                  )}
                </div>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Soft Skills
                </div>
                <ul className="list-disc pl-6 text-sm leading-6 text-gray-600">
                  {(data?.soft_skill || []).length > 0 ? (
                    data?.soft_skill.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Certificates
                </div>
                <ul className="list-disc pl-6 text-sm leading-6 text-gray-600">
                  {(data?.certificate || []).length > 0 ? (
                    data?.certificate.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Candidate CV Name
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.cv_name ? data?.cv_name : "None"}
                </p>

                <div className="mt-2 text-base font-semibold leading-7 text-gray-900">
                  Candidate Created Date
                </div>
                <p className="text-sm leading-6 text-gray-60">
                  {data?.created_at ? data?.created_at : "None"}
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
