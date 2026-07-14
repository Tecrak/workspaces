import { AuthValues } from "@repo/types";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../hooks/useLoginUser";
import { PopupType, usePopupWS } from "./zustands/popupStore";

export default function LoginUser() {
  const { mutate, isPending } = useLoginUser();
  const { openPopup } = usePopupWS();

  const { handleSubmit, register } = useForm<AuthValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthValues) => {
    openPopup({
      type: PopupType.LOGIN_USER,
      onAcceptCallBack: () => {
        mutate(data, {
          onSuccess: () => {
            console.log("Logged in");
          },
          onError: (err) => {
            console.error(err.message);
          },
        });
      },
    });
  };

  return (
    <>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="text" {...register("email")}></input>
        <label>Password:</label>
        <input type="password" {...register("password")}></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
