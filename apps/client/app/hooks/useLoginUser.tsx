import { useMutation } from "@tanstack/react-query";
import { LogInUser } from "../../server/user";
import { QueryKeys } from "@repo/types";
import { useInvalidateQuery } from "./useInvalidateQuery";

export function useLoginUser() {
  const invalidate = useInvalidateQuery();

  return useMutation({
    mutationFn: LogInUser,
    onSuccess: () => invalidate([QueryKeys.user]),
  });
}
