import { useMutation } from "@tanstack/react-query";
import { DeleteWorkspace } from "../../server/workspace";
import { useGetCurrentUser } from "./useGetCurrentUser";
import { QueryKeys } from "@repo/types";
import { useInvalidateQuery } from "./useInvalidateQuery";

export function useDeleteWorkspace() {
  const { data: currentUser } = useGetCurrentUser();
  const invalidate = useInvalidateQuery();

  return useMutation({
    mutationFn: (id: string) => DeleteWorkspace(id),
    onSuccess: () => invalidate([QueryKeys.workspace, currentUser?.userId]),
  });
}
