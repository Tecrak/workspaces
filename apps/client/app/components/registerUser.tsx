"use client";
import { UserValues } from "@repo/types";
import { useForm } from "react-hook-form";
import { useAddUser } from "../hooks/useAddUser";
import { PopupType, usePopupWS } from "./zustands/popupStore";

export default function RegisterUser() {
  const { openPopup } = usePopupWS();
  const { mutate, isPending } = useAddUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<UserValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: UserValues) => {
    openPopup({
      type: PopupType.CREATE_USER,
      onAcceptCallBack: () => mutate(data),
    });
  };

  return (
    <>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}>
        <label>Ur email</label>
        <input type="text" {...register("email")} />
        <label>Ur password</label>
        <input type="password" {...register("password")} />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
