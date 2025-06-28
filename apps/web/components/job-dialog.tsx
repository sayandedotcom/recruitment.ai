"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useAddFAQData } from "@/hooks/requests";

type FormModel = {
  job_name: string;
  job_description: string;
};

export function JobDialog({
  children,
  refetch,
}: {
  children?: React.ReactNode;
  refetch: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormModel>({});

  const { mutate: addFAQ } = useAddFAQData();

  const confirmAddFAQ = (value: FormModel) => {
    addFAQ(
      {
        job_name: value.job_name,
        job_description: value.job_description,
      },
      {
        onError: (error: any) => {
          console.log("Create New Job error:", error.response.status);
          // toast.error("Create New Job failed");
        },
        onSuccess: async () => {
          refetch();
          reset();
          // toast.success("Create New Job successfully");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Create new job</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            Fill in the details below to create a new job listing.
          </DialogDescription>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(confirmAddFAQ)}>
          <div className="grid gap-6 py-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2  sm:col-span-2">
              <Label>Job Name</Label>
              <Input
                className="border border-gray-400 focus:ring-1"
                type="text"
                {...register("job_name")}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label>Job Description</Label>
              <Textarea
                className="border border-gray-400 focus:ring-1 h-32"
                rows={14}
                {...register("job_description")}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                variant={"default"}
                type="submit"
                disabled={!watch("job_name") || !watch("job_description")}
                // className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
