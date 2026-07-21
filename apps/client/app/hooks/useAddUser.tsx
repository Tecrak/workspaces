import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "../../server/user";
import { QueryKeys } from "@repo/types";
import { useInvalidateQuery } from "./useInvalidateQuery";

export function useAddUser() {
  const invalidate = useInvalidateQuery();

  return useMutation({
    mutationFn: CreateUser,
    onSuccess: () => invalidate([QueryKeys.user]),
  });
}
