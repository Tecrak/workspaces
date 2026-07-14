"use client";

import { set, useForm } from "react-hook-form";
import { usePatchWSName } from "../hooks/usePatchWSName";
import { PopupType, usePopupWS } from "./zustands/popupStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchNameSchema } from "@repo/types";

interface FormPatchValues {
  name: string;
}

export default function FormPatchWSName({
  id,
  name,
  setEditingId,
}: {
  id: string;
  name: string;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { openPopup } = usePopupWS();
  const { mutate: patchWSName } = usePatchWSName();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(patchNameSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = (data: FormPatchValues) => {
    openPopup({
      type: PopupType.UPDATE_WORKSPACE,
      onAcceptCallBack: () => {
        patchWSName(
          { id, name: data.name },
          { onSuccess: () => setEditingId("") },
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"

        {...register("name")}

        style={
          errors.name
            ? { border: "1px red solid" }
            : { border: "1px green solid" }
        }
      />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit" value="Change">
        Change
      </button>
    </form>
  );
}
