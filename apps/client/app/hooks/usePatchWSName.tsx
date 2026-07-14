import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateWSName } from "../../server/workspace";
import { PatchWSNameVariables } from "@repo/types";
import { useGetCurrentUser } from "./useGetCurrentUser";

export function usePatchWSName() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useMutation({
    mutationFn: ({ id, name }: PatchWSNameVariables) => UpdateWSName(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", currentUser?.userId],
      });
    },
  });
}
