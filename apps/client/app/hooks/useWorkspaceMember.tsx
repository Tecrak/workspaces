import { useQuery } from "@tanstack/react-query";
import { QueryKeys, WorkspaceMember } from "@repo/types";
import { WorkspaceMembers } from "../../server/workspace";

export function useWorkspaceMembers(workspaceId: string) {
  return useQuery<WorkspaceMember[]>({
    queryKey: [QueryKeys.workspace_member, workspaceId],
    queryFn: () => WorkspaceMembers(workspaceId),
    enabled: !!workspaceId,
  });
}
