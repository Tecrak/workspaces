import { Control, useFieldArray } from "react-hook-form";
import styles from "./styles/formModal.module.css";
import { FormValues } from "@repo/types";

export default function TaskFields({
  control,
  boardIndex,
  register,
}: {
  boardIndex: number;
  control: Control<FormValues>;
  register: any;
}) {
  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `boards.${boardIndex}.tasks`,
  });

  return (
    <div className={styles.tasksBlock}>
      {taskFields.map((task, taskIndex) => (
        <div key={task.id}>
          <input
            type="text"
            placeholder={`Task ${taskIndex + 1}`}
            {...register(
              `boards.${boardIndex}.tasks.${taskIndex}.title` as const,
              //  Підставити імя для taks'у в array board. де є index.в array tasks. де є такий індекс нове імя
            )}
          />
          <button type="button" onClick={() => removeTask(taskIndex)}>
            {/* Видалити task із arrayField де є такий index */}✕
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendTask({ title: "" } as const)}>
        {/* Додати новий пустий task до arrayField імя до якого підставиться в інпуті вище */}
        + Add task
      </button>
    </div>
  );
}
