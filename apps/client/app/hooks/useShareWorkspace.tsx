import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShareWorkspace } from "../../server/workspace";
import { Role } from "@repo/types";

export function useShareWorkspace(workspaceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; role?: Role }) =>
      ShareWorkspace(workspaceId, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      }),
  });
}
