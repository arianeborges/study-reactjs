import {PlusCircle} from "@phosphor-icons/react";

import styles from "./ToDoInput.module.css";

export function ToDoInput() {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.input} placeholder="Add a new task" />
      <button className={styles.button}>
        Create
        <PlusCircle weight="bold" size={16} />
      </button>
    </div>
  );
}
