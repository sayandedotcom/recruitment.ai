import useAxios from "@/hooks/lib/use-axios";

export const getMatchingCandidate = async (jobName: string) => {
  const { data } = await useAxios.post("/process-matching", {
    job_name: jobName,
  });
  return data;
};

export const getMatchingPage = async (
  jobName: string,
  currentPage: number,
  pageSize: number
) => {
  const { data } = await useAxios.post("/data-matching", {
    job_name: jobName,
    page_size: pageSize,
    page: currentPage,
  });
  return data;
};

export const getMatchingDetailAxios = async (
  candidateId: string,
  jobId: string
) => {
  const { data } = await useAxios.get(
    `/candidate/${candidateId}/job/${jobId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
