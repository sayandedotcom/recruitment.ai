import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import {
  addFAQAxios,
  deleteFAQAxios,
  getAllJob,
  getDetailFAQAxios,
  getFAQAxios,
  getJobDetailAxios,
  updateFAQAxios,
} from "@/lib/job-api";
import {
  getMatchingCandidate,
  getMatchingDetailAxios,
  getMatchingPage,
} from "@/lib/matching-api";
import {
  deleteFileAxios,
  getListFileAxios,
  getListFileDetailAxios,
  uploadFileAxios,
} from "@/lib/candidates-api";

export function useFAQData(
  currentPage: number,
  pageSize: number
): UseQueryResult<FAQResponeModel, unknown> {
  return useQuery({
    queryKey: ["faq-list", currentPage, pageSize],
    queryFn: () => getFAQAxios(currentPage, pageSize),
  });
}

export function useMatchingPageData(
  jobName: string,
  currentPage: number,
  pageSize: number
): UseQueryResult<JobMatchingResponeModel, unknown> {
  return useQuery({
    queryKey: ["matching-page-data", currentPage, pageSize],
    queryFn: () => getMatchingPage(jobName, currentPage, pageSize),
  });
}

export function useAllJobData(): UseQueryResult<JobModel[], unknown> {
  return useQuery({
    queryKey: ["all-job-data"],
    queryFn: () => getAllJob(),
  });
}

export function useJobDetailData(
  jobId: string
): UseQueryResult<JobDetailModel> {
  return useQuery({
    queryKey: ["list-job-detail", jobId],
    queryFn: () => getJobDetailAxios(jobId),
    enabled: jobId !== "",
  });
}

export function useDetailFAQData(
  faqId: number
): UseQueryResult<JobModel, unknown> {
  return useQuery({
    queryKey: ["faq-detail", faqId],
    queryFn: () => getDetailFAQAxios(faqId),
    enabled: false,
  });
}

export function useDeleteFAQData(faqId: number): UseMutationResult<any> {
  return useMutation({
    mutationFn: () => deleteFAQAxios(faqId),
  });
}

export function useMachingData() {
  // : UseMutationResult<any>
  return useMutation({
    mutationFn: ({ jobName }: { jobName: string }) =>
      getMatchingCandidate(jobName),
  });
}

export function useAddFAQData() {
  // formData: ModifyFAQModel
  return useMutation({
    mutationFn: (formData: ModifyFAQModel) => addFAQAxios(formData),
  });
}

export function useUpdateFAQData(
  formData: ModifyFAQModel,
  faqId: number
): UseMutationResult<any> {
  return useMutation({
    mutationFn: () => updateFAQAxios(formData, faqId),
  });
}

export function useListCandidateData(
  currentPage: number,
  pageSize: number
): UseQueryResult<CandidateResponseModel> {
  return useQuery({
    queryKey: ["list-candidate-data", currentPage, pageSize],
    queryFn: () => getListFileAxios(currentPage, pageSize),
  });
}

export function useUploadFileData(files: File[]): UseMutationResult<any> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file_upload", file);
  });
  return useMutation({
    mutationFn: () => uploadFileAxios(formData),
  });
}

export function useListFileDetailData(
  fileId: string
): UseQueryResult<CandidateDetailModel> {
  return useQuery({
    queryKey: ["list-candidate-detail"],
    queryFn: () => getListFileDetailAxios(fileId),
    enabled: fileId !== "",
  });
}

export function useMatchingDetailData(
  candidateId: string,
  jobId: string
): UseQueryResult<MatchingDetailModel> {
  return useQuery({
    queryKey: ["matching-detail"],
    queryFn: () => getMatchingDetailAxios(candidateId, jobId),
    enabled: candidateId !== "" && jobId !== "",
  });
}

export function useDeleteFileData(fileId: string): UseMutationResult<any> {
  return useMutation({ mutationFn: () => deleteFileAxios(fileId) });
}
