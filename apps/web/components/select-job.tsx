"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllJobData } from "@/hooks/requests";

export function SelectJob({
  handleMenuItemClick,
}: {
  handleMenuItemClick: (id: string, jobName: string) => void;
}) {
  const { data } = useAllJobData();

  return (
    <Select
      onValueChange={(value) => {
        const selectedItem = data?.find((item) => item.job_name === value);
        if (selectedItem) {
          handleMenuItemClick(selectedItem._id, selectedItem.job_name);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a job" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {data?.map((item) => (
            <SelectItem key={item._id} value={item.job_name}>
              {item.job_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
