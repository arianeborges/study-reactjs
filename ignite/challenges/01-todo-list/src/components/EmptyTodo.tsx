import {ClipboardText} from "@phosphor-icons/react";
import styles from "./EmptyTodo.module.css";

export function EmptyTodo() {
  return (
    <div className={styles.emptyTodoContainer}>
      <ClipboardText size={64} />
      <span>
        <p>You still don't have any tasks registered</p>
        <p>Create tasks and organize your to-dos</p>
      </span>
    </div>
  );
}
