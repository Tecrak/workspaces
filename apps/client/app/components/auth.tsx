"use client";
import { useState } from "react";
import LoginUser from "./loginUser";
import RegisterUser from "./registerUser";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useLogout } from "../hooks/usLogOut";
import { PopupType, usePopupWS } from "./zustands/popupStore";

export default function AuthMenu() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { data: user, isLoading } = useGetCurrentUser();
  const { mutate, isPending } = useLogout();
  const { openPopup } = usePopupWS();

  const handleLogout = () => {
    openPopup({
      type: PopupType.LOGOUT_USER,
      onAcceptCallBack: () => {
        mutate();
      },
    });
  };

  if (user) {
    return (
      <>
        <p>Залогінений як {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => setIsLogin(!isLogin)}>
        Try to {isLogin ? "Register" : "Login"}
      </button>
      {isLogin ? <LoginUser /> : <RegisterUser />}
    </>
  );
}
