import {PlusCircle} from "@phosphor-icons/react";
import styles from "./TodoList.module.css";

export function TaskList() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.inputWrapper}>
        <input className={styles.input} placeholder="Add a new task" />
        <button className={styles.button}>
          Create
          <PlusCircle weight="bold" size={16} />
        </button>
      </div>
    </div>
  );
}
