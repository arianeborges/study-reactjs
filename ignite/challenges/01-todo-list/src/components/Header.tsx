import styles from "./Header.module.css";
import logo from "../assets/todo-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo todo list" />
    </header>
  );
}
