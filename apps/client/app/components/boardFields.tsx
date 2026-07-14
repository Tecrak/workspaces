"use client";
import { BoardFormValues, FormValues } from "@repo/types";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import styles from "./styles/formModal.module.css";
import TaskFields from "./taskFields";
import { useState } from "react";

interface BoardFieldsProps {
  boardIndex: number;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  removeBoard: (index: number) => void;
}

export default function BoardFields({
  boardIndex,
  control,
  register,
  removeBoard,
}: BoardFieldsProps) {
  const [boardName, setBoardName] = useState<string>("");

  return (
    <div className={styles.boardBlock}>
      <p>New board name: {boardName}</p>
      <input
        type="text"
        placeholder={`Board ${boardIndex + 1} name`} // Щоби я сам не загубився де який board за рахунком створюю
        {...register(`boards.${boardIndex}.name` as const)} // Підставити нове імя в array де такий boardIndex присутній
        onChange={(e) => setBoardName(e.target.value)}
      />
      <button type="button" onClick={() => removeBoard(boardIndex)}>
        {/* Видалити Board зі arrayField де такий index(по хорошому має board.id) присутній  */}
        ✕ Remove board
      </button>
      <TaskFields
        control={control}
        boardIndex={boardIndex}
        register={register}
      />
    </div>
  );
}
