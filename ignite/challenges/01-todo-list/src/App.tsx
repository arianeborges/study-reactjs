import "./global.css";
import {Header} from "./components/Header";
import {TaskList} from "./components/TodoList";

function App() {
  return (
    <div>
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
