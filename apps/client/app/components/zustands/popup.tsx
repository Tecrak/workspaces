import { usePopupWS } from "./popupStore";
import styles from "../../styles/page.module.css";

export function ConfirmPopup({ message }: { message: string }) {
  const { handelDismiss, handleAccept } = usePopupWS();

  return (
    <div className={styles.blockingModal} onClick={(e) => e.stopPropagation()}>
      <p>{message}</p>
      <button onClick={handleAccept}>Yes</button>
      <button onClick={handelDismiss}>No</button>
    </div>
  );
}
