import { Dispatch, ReactNode, SetStateAction } from "react";
import { create } from "zustand";
import { ConfirmPopup } from "./popup";

export enum PopupType {
  // Які можуть бути типи попапів
  CREATE_WORKSPACE = "create-workspace",
  DELETE_WORKSPACE = "delete-workspace",
  UPDATE_WORKSPACE = "update-workspace",
  CREATE_USER = "create-user",
  LOGIN_USER = "login-user",
  LOGOUT_USER = "logout-user",
  EXIT_FORM = "exit_form",
}

type WorkspaceState = {
  // що можна буде підставляти
  open: boolean;
  metadata: null | string;
  type: PopupType;
  onAcceptCallBack?: () => void;
  onDismissCallBack?: () => void;
  handleAccept: () => void;
  handelDismiss: () => void;
  openPopup: (payload: {
    type: PopupType;
    metadata?: string;
    onAcceptCallBack?: () => void;
    onDismissCallBack?: () => void;
  }) => void;
};

export const popupTypeComponentMap: Record<PopupType, ReactNode> = {
  // коли я викличу PopupType і виберу тип, воно викличе цей компонент та надасть йому потрібне повідомлення
  [PopupType.CREATE_WORKSPACE]: <ConfirmPopup message="Create workspace?" />,
  [PopupType.DELETE_WORKSPACE]: <ConfirmPopup message="Delete workspace?" />,
  [PopupType.UPDATE_WORKSPACE]: (
    <ConfirmPopup message="Change name of the workspace?" />
  ),
  [PopupType.CREATE_USER]: <ConfirmPopup message="Create user?" />,
  [PopupType.LOGIN_USER]: <ConfirmPopup message="Login?" />,
  [PopupType.LOGOUT_USER]: <ConfirmPopup message="Really Logout?" />,
  [PopupType.EXIT_FORM]: <ConfirmPopup message="Exit form without saving?" />,
};

// То шо може бути викликане
export const usePopupWS = create<WorkspaceState>()((set, get) => ({
  open: false,
  metadata: null,
  type: PopupType.EXIT_FORM,
  onAcceptCallBack: () => "",
  onDismissCallBack: () => "",
  handleAccept: () => {
    const callback = get().onAcceptCallBack;
    callback?.();
    set({ open: false, onAcceptCallBack: undefined, metadata: null });
  },
  handelDismiss: () => {
    const callback = get().onDismissCallBack;
    callback?.();
    set({ open: false, onDismissCallBack: undefined, metadata: null });
  },
  // Тут payload просто використовується, щоб не писати вручну:
  // set({
  //   type: payload.type,
  //   metadata: payload.metadata,
  //   onAcceptCallBack: payload.onAcceptCallBack,
  //   onDismissCallBack: payload.onDismissCallBack,
  //   open: true,
  // });
  // Воно тупо виводить всі весь array з інфою, яка має бути за типом WorkspaceState.openPopup
  // за допомогою .... та підставляє значення true, щоби показати попап
  openPopup: (payload) => {
    set({ ...payload, open: true });
  },
}));
