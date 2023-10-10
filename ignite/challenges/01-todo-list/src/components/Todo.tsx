import {Trash} from "@phosphor-icons/react";
import styles from "./Todo.module.css";
import {ITodo} from "./TaskList";

interface TodoProps {
  todo: ITodo;
  onCheckItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export function Todo({todo, onCheckItem, onDeleteItem}: TodoProps) {
  function handleCheckItem() {
    onCheckItem(todo.id);
  }

  function handleDeleteItem() {
    onDeleteItem(todo.id);
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemContent}>
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={handleCheckItem}
        />
        <label>{todo.text}</label>
      </div>
      <div className={styles.itemDelete}>
        <button title="Delete task" onClick={handleDeleteItem}>
          <Trash size={24} />
        </button>
      </div>
    </div>
  );
}
