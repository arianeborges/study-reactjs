import {Comment} from "./Comment";
import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src="https://github.com/arianeborges.png"
          />

          <div className={styles.authorInfo}>
            <strong>Ariane</strong>
            <span>Frontend developer</span>
          </div>
        </div>

        <time
          title="29th of September at 14:50pm"
          dateTime="2023-09-29 14:50:00"
        >
          Published 1h ago
        </time>
      </header>

      <div className={styles.content}>
        <p>Hey guys 👋 </p>
        <p>
          I just uploaded another project to my portfolio. It`&apos;`s a project
          I did at NLW Return, a Rocketseat event. The name of the project is
          DoctorCare 🚀
        </p>
        <p>
          👉{"  "}
          <a href="#">jane.design/doctorcare </a>
        </p>
        <p>
          <a href="#">#newproject</a>
          {"  "}
          <a href="#">#nlw</a>
          {"  "}
          <a href="#">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Leave your feedback</strong>

        <textarea placeholder="Leave a comment" />

        <footer>
          <button type="submit">Publish</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
