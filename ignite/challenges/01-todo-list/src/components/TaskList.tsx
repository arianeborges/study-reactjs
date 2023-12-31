import {PlusCircle} from "@phosphor-icons/react";
import styles from "./TaskList.module.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {EmptyTodo} from "./EmptyTodo";
import {Todo} from "./Todo";

export interface ITodo {
  id: string;
  text: string;
  isComplete: boolean;
}

export function TaskList() {
  const [countCompletedTask, setCountCompletedTask] = useState(0);
  const [todoValue, setTodoValue] = useState("");
  const [arrayToDo, setArrayToDo] = useState<ITodo[]>([
    {id: uuidv4(), text: "Study Javascript", isComplete: false},
  ]);

  function calculateCompletedCountItems(array: ITodo[]) {
    return array.filter((item) => item.isComplete).length;
  }

  function handleTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoValue(event.target.value);
  }

  function handleCreateNewTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formatTodoValue: ITodo = {
      id: uuidv4(),
      text: todoValue,
      isComplete: false,
    };

    setArrayToDo([...arrayToDo, formatTodoValue]);

    setTodoValue("");
  }

  function deleteItem(idToDelete: string) {
    const itemToDelete = arrayToDo.filter((item) => item.id !== idToDelete);

    setArrayToDo(itemToDelete);

    const completedCount = calculateCompletedCountItems(itemToDelete);
    setCountCompletedTask(completedCount);
  }

  function checkItem(idToComplete: string) {
    const updateArrayTodo = arrayToDo.map((item) =>
      item.id === idToComplete ? {...item, isComplete: !item.isComplete} : item
    );

    setArrayToDo(updateArrayTodo);

    const completedCount = calculateCompletedCountItems(updateArrayTodo);
    setCountCompletedTask(completedCount);
  }

  const sortedTodos = arrayToDo.slice().sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    return 0;
  });

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

        <div>
          {arrayToDo.length ? (
            <div>
              {sortedTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onCheckItem={checkItem}
                  onDeleteItem={deleteItem}
                />
              ))}
            </div>
          ) : (
            <EmptyTodo />
          )}
        </div>
      </div>
    </div>
  );
}
