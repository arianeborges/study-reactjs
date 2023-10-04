import "./global.css";
import {Header} from "./components/Header";
import {ToDoInput} from "./components/ToDoInput";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <Header />
      <main className={styles.mainWrapper}>
        <ToDoInput />
      </main>
    </div>
  );
}

export default App;
