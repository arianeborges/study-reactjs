import {ClipboardText, PlusCircle} from "@phosphor-icons/react";
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

      <div className={styles.mainContent}>
        <div className={styles.mainContentHeader}>
          <div className={styles.headerInfoLeft}>
            <p>Created tasks</p>
            <span>0</span>
          </div>
          <div className={styles.headerInfoRight}>
            <p>Completed</p>
            <span>0</span>
          </div>
        </div>

        <div className={styles.taskList}>
          <div className={styles.emptyTaskList}>
            <ClipboardText size={64} />
            <span>
              <p>You still don't have any tasks registered</p>
              <p>Create tasks and organize your to-dos</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
