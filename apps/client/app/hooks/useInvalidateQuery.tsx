import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  return useCallback(
    (...queryKeys: QueryKey[]) => {
      // розпаковую всі ключі які передалися і надаю їм тип QueryKey(ts матюкається якщо не додаю)
      queryKeys.forEach(
        (queryKey) =>
          // для кожного ключа
          queryClient.invalidateQueries({ queryKey }), // інвалідуємо його
      );
    },
    [queryClient], // повторити створення якщо клієнт зміниться
  );
}
