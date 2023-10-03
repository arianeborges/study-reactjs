import {format, formatDistanceToNow} from "date-fns";
import {Comment} from "./Comment";
import styles from "./Post.module.css";
import {Avatar} from "./Avatar";
import {useState} from "react";

export function Post({author, publishedAt, content}) {
  const [comments, setComments] = useState(["Great post!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(publishedAt, "do LLLL yyyy',' HH:mm");

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    includeSeconds: true,
    addSuffix: true,
  });

  function handleCreateNewComment(event) {
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText("");
  }

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value);
  }

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line, index) => {
          if (line.type === "paragraph") {
            return <p key={index}>{line.content}</p>;
          } else {
            return (
              <p key={index}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form
        className={styles.commentForm}
        onSubmit={(event) => handleCreateNewComment(event)}
      >
        <strong>Leave your feedback</strong>

        <textarea
          name="comment"
          placeholder="Leave a comment"
          value={newCommentText}
          onChange={(event) => handleNewCommentChange(event)}
        />

        <footer>
          <button type="submit">Publish</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return <Comment key={index} content={comment} />;
        })}
      </div>
    </article>
  );
}
