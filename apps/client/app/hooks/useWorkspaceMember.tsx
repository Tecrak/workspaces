import { useQuery } from "@tanstack/react-query";
import { WorkspaceMember } from "@repo/types";
import { WorkspaceMembers } from "../../server/user";

export function useWorkspaceMembers(workspaceId: string) {
  return useQuery<WorkspaceMember[]>({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => WorkspaceMembers(workspaceId),
    enabled: !!workspaceId,
  });
}
