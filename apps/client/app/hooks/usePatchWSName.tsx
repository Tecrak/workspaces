import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateWSName } from "../../server/workspace";
import { PatchWSNameVariables, QueryKeys } from "@repo/types";
import { useGetCurrentUser } from "./useGetCurrentUser";
import { useInvalidateQuery } from "./useInvalidateQuery";

export function usePatchWSName() {
  const invalidate = useInvalidateQuery();
  const { data: currentUser } = useGetCurrentUser();
  return useMutation({
    mutationFn: ({ id, name }: PatchWSNameVariables) => UpdateWSName(id, name),
    onSuccess: () => invalidate([QueryKeys.workspace, currentUser?.userId]),
  });
}
