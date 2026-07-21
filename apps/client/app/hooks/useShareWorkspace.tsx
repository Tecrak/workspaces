import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShareWorkspace } from "../../server/workspace";
import { QueryKeys, Role } from "@repo/types";
import { useInvalidateQuery } from "./useInvalidateQuery";

export function useShareWorkspace(workspaceId: string) {
  const invalidate = useInvalidateQuery();

  return useMutation({
    mutationFn: (payload: { email: string; role?: Role }) =>
      ShareWorkspace(workspaceId, payload),
    onSuccess: () => invalidate([QueryKeys.workspace_member, workspaceId]),
  });
}
