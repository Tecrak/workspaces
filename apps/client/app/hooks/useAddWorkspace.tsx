"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddWorkspace } from "../../server/workspace";
import { useGetCurrentUser } from "./useGetCurrentUser";

export function useAddWorkspace() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useMutation({
    mutationFn: AddWorkspace,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["workspace", currentUser?.userId],
      }),
  });
}
