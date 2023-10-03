import {Trash, ThumbsUp} from "@phosphor-icons/react";
import styles from "./Comment.module.css";
import {Avatar} from "./Avatar";

export function Comment({content, onDeleteComment}) {
  function handleDeleteComment() {
    onDeleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/arianeborges.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Ariane</strong>
              <time
                title="29th of September at 14:50pm"
                dateTime="2023-09-29 14:50:00"
              >
                Published 1h ago
              </time>
            </div>
            <button title="Delete comment" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20} />
            Like <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
