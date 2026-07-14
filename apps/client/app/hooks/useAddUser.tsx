import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "../../server/user";

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
