import { useQuery } from "@tanstack/react-query";
import { GetMe } from "../../server/user";
import { QueryKeys } from "@repo/types";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: [QueryKeys.user],
    queryFn: GetMe,
    retry: false,
  });
}
