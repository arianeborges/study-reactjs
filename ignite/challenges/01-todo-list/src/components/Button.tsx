import {PlusCircle} from "@phosphor-icons/react";
import styles from "./Button.module.css";

export function Button() {
  return (
    <button className={styles.button}>
      Create
      <PlusCircle weight="bold" size={16} />
    </button>
  );
}
