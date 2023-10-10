import {ClipboardText, PlusCircle, Trash} from "@phosphor-icons/react";
import styles from "./TodoList.module.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {v4 as uuidv4} from "uuid";
interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

export function TaskList() {
  const [isChecked, setIsChecked] = useState(false);
  const [countCompletedTask, setCountCompletedTask] = useState(0);
  const [todoValue, setTodoValue] = useState("");
  const [arrayToDo, setArrayToDo] = useState<Todo[]>([
    {id: uuidv4(), text: "Study Javascript", isComplete: false},
  ]);

  function handleTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoValue(event.target.value);
  }

  function handleCreateNewTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formatTodoValue: Todo = {
      id: uuidv4(),
      text: todoValue,
      isComplete: false,
    };

    setArrayToDo([...arrayToDo, formatTodoValue]);

    setTodoValue("");
  }

  function handleDeleteTodo(idToDelete: string) {
    const itemToDelete = arrayToDo.filter((item) => item.id !== idToDelete);

    setArrayToDo(itemToDelete);
  }

  function handleCheckItem(idToComplete: string) {
    const newArrayTodo = arrayToDo.map((item) => {
      let itemToComplete: Todo = {
        id: "",
        text: "",
        isComplete: false,
      };

      if (item.id === idToComplete) {
        if (!item.isComplete) {
          setCountCompletedTask(countCompletedTask + 1);
        } else {
          setCountCompletedTask(countCompletedTask - 1);
        }

        itemToComplete = {...item, isComplete: !item.isComplete};
      } else {
        itemToComplete = {...item};
      }

      setIsChecked(itemToComplete.isComplete);

      return itemToComplete;
    });

    setArrayToDo(newArrayTodo);
  }

  return (
    <div className={styles.mainWrapper}>
      <form
        className={styles.inputWrapper}
        onSubmit={(event) => handleCreateNewTodo(event)}
      >
        <input
          name="todo"
          className={styles.input}
          placeholder="Add a new task"
          value={todoValue}
          onChange={(event) => handleTodoChange(event)}
        />
        <button className={styles.button} type="submit">
          Create
          <PlusCircle weight="bold" size={16} />
        </button>
      </form>

      <div className={styles.mainContent}>
        <div className={styles.mainContentHeader}>
          <div className={styles.headerInfoLeft}>
            <p>Created tasks</p>
            <span>{arrayToDo.length}</span>
          </div>
          <div className={styles.headerInfoRight}>
            <p>Completed</p>
            <span>
              {countCompletedTask} of {arrayToDo.length}
            </span>
          </div>
        </div>

        <div className={styles.taskList}>
          {arrayToDo.length ? (
            <div>
              {arrayToDo.map((todo, index) => (
                <div key={index} className={styles.itemContainer}>
                  <div className={styles.itemContent}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckItem(todo.id)}
                    />
                    <label>{todo.text}</label>
                  </div>
                  <div className={styles.itemDelete}>
                    <button
                      title="Delete task"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyTaskList}>
              <ClipboardText size={64} />
              <span>
                <p>You still don't have any tasks registered</p>
                <p>Create tasks and organize your to-dos</p>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
