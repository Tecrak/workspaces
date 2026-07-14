import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogInUser } from "../../server/user";

export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LogInUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["user"],
      }),
  });
}
