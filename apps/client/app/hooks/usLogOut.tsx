import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOutUser } from "../../server/user";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LogOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
