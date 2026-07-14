import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteWorkspace } from "../../server/workspace";
import { useGetCurrentUser } from "./useGetCurrentUser";

export function useDeleteWorkspace() {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => DeleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", currentUser?.userId],
      });
    },
  });
}
