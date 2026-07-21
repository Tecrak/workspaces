"use client";
import { useMutation } from "@tanstack/react-query";
import { AddWorkspace } from "../../server/workspace";
import { useGetCurrentUser } from "./useGetCurrentUser";
import { QueryKeys } from "@repo/types";
import { useInvalidateQuery } from "./useInvalidateQuery";

export function useAddWorkspace() {
  const invalidate = useInvalidateQuery();

  const { data: currentUser } = useGetCurrentUser();
  return useMutation({
    mutationFn: AddWorkspace,
    onSuccess: () => invalidate([QueryKeys.workspace, currentUser?.userId]),
  });
}
