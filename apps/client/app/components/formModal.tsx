"use client";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles/formModal.module.css";

import BoardFields from "./boardFields";
import { useAddWorkspace } from "../hooks/useAddWorkspace";
import { PopupType, usePopupWS } from "./zustands/popupStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, workspaceSchema } from "@repo/types";
import { useFormWS } from "./zustands/formStore";

export default function FormModal() {
  const { openPopup } = usePopupWS();
  const { closeForm } = useFormWS();
  const { mutate, isPending } = useAddWorkspace();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(workspaceSchema), // тут буде проходити валідація , щоби не писати min,max і тд у input
    defaultValues: {
      name: "",
      boards: [],
    },
  });

  const {
    fields: boardFields,
    append: appendBoard,
    remove: removeBoard,
  } = useFieldArray({
    control,
    name: "boards",
  });

  const handleBGClick = () => {
    if (!isDirty) {
      closeForm();
      return;
    }
    openPopup({
      type: PopupType.EXIT_FORM,
      onAcceptCallBack: () => closeForm(),
    });
  };
  const onSubmit = (data: FormValues) => {
    openPopup({
      type: PopupType.CREATE_WORKSPACE,
      onAcceptCallBack: () => {
        mutate(data, { onSuccess: closeForm });
      },
    });
  };

  return (
    <div className={styles.formBG} onClick={handleBGClick}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}>
        <label>New workspace name</label>
        <input
          type="text"

          {...register("name")}
          style={
            errors.name
              ? { border: "1px red solid" }
              : { border: "1px green solid" }
          }></input>
        {errors.name && <span>{errors.name.message}</span>}
        {/* Повідомлення про помилку за допомогою Formstate:errors і витягання
        повідомлення з message */}
        {boardFields.map((board, boardIndex) => (
          // boardIndex не бажано юзати, але id напевно не дуже підходящій у дб, не хочу ризикувати
          <BoardFields
            key={board.id}
            boardIndex={boardIndex}
            control={control}
            register={register}
            removeBoard={removeBoard}
          />
        ))}
        <button
          type="button"
          onClick={() => appendBoard({ name: "", tasks: [] } as const)}>
          {/* Створить новий пустий input для boardName імя для якого потім в інпуті підставиться*/}{" "}
          + Add board
        </button>

        <button type="submit" disabled={isPending}>
          Створити
        </button>
      </form>
    </div>
  );
}
