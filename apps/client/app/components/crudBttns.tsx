"use client";
import { useState } from "react";
import { useDeleteWorkspace } from "../hooks/useDeleteWorkspace";
import styles from "../styles/page.module.css";
import FormPatchWSName from "./formPatchWSName";
import { PopupType, usePopupWS } from "./zustands/popupStore";

export default function CrudBttns({
  itemId,
  itemName,
  isSelected,
  currentWS,
  setCurrentWS,
}: {
  itemId: string;
  itemName: string;
  isSelected: any;
  currentWS: string;
  setCurrentWS: any;
}) {
  const { mutate: deleteWorkspace, isPending } = useDeleteWorkspace();
  const { openPopup } = usePopupWS();
  const [editingId, setEditingId] = useState<string>("");

  const handleDelete = () => {
    openPopup({
      type: PopupType.DELETE_WORKSPACE,
      onAcceptCallBack: () => {
        deleteWorkspace(itemId);
      },
    });
  };

  return (
    <div className={styles.crudBttns}>
      <div>
        <button onClick={() => handleDelete()} disabled={isPending}>
          -
        </button>
        <button
          onClick={() => setEditingId(editingId === itemId ? "" : itemId)}>
          {editingId !== itemId ? "E" : "S"}
        </button>
      </div>

      {editingId !== itemId ? (
        <h3
          className={`${styles.wsNameBttn} ${isSelected(currentWS, itemId) ? styles.activeBttn : ""}`}
          onClick={() =>
            isSelected(currentWS, itemId)
              ? setCurrentWS("")
              : setCurrentWS(itemId)
          }>
          {itemName}
        </h3>
      ) : (
        <FormPatchWSName
          id={itemId}
          name={itemName}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
}
