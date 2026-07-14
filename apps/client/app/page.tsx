"use client";
import styles from "./styles/page.module.css";
import { useState } from "react";
import { Workspace } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { GetAll } from "../server/workspace";
import FormModal from "./components/formModal";
import CrudBttns from "./components/crudBttns";
import {
  popupTypeComponentMap,
  usePopupWS,
} from "./components/zustands/popupStore";
import { useFormWS } from "./components/zustands/formStore";
import AuthMenu from "./components/auth";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import ShareWorkspace from "./components/shareWorkspace";

export default function Home() {
  const [currentWS, setCurrentWS] = useState<string>("");
  const { open, type } = usePopupWS();
  const { data: currentUser } = useGetCurrentUser();
  const { isFormOpen, openForm } = useFormWS();

  const {
    data: workspaces,
    isLoading,
    isError,
  } = useQuery<Workspace[]>({
    queryKey: ["workspace", currentUser?.userId],
    queryFn: GetAll,
    enabled: !!currentUser,
  });

  const isSelected = (current: string, item: string) => current === item;

  return (
    <div className={styles.page}>
      <AuthMenu />
      {isFormOpen && <FormModal />}
      {open && popupTypeComponentMap[type]}
      {currentUser && (
        <main className={styles.main}>
          <h2>Workspaces</h2>
          <button className={styles.addWSBttn} onClick={openForm}>
            Add workspace +
          </button>
          <div className={styles.workspace}>
            {workspaces?.map((item) => (
              <div key={item.id} className={styles.item}>
                <CrudBttns
                  itemId={item.id}
                  itemName={item.name}
                  isSelected={isSelected}
                  currentWS={currentWS}
                  setCurrentWS={setCurrentWS}
                />
                <ul
                  className={`${styles.boardBox} ${isSelected(currentWS, item.id) ? styles.activeWS : ""}`}>
                  {item?.boards?.map((board) => (
                    <div key={board.id} className={styles.boardContent}>
                      <h3>{board.name}</h3>
                      <ul className={styles.taskBox}>
                        {board?.tasks?.map((task) => (
                          <li key={task.id}>{task.title}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
                <ShareWorkspace workspaceId={item.id} />
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
