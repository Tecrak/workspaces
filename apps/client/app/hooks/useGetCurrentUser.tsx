import { useQuery } from "@tanstack/react-query";
import { GetMe } from "../../server/user";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: GetMe,
    retry: false,
  });
}
