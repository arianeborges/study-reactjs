import {format, formatDistanceToNow} from "date-fns";
import {Comment} from "./Comment";
import styles from "./Post.module.css";
import {Avatar} from "./Avatar";
import {ChangeEvent, FormEvent, useState} from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface IPost {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

interface PostProps {
  post: IPost;
}

export function Post({post}: PostProps) {
  const {publishedAt, content, author} = post;
  const [comments, setComments] = useState(["Great post!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(publishedAt, "do LLLL yyyy',' HH:mm");

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    includeSeconds: true,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToBeDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToBeDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

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
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else {
            return (
              <p key={line.content}>
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
          required
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publish
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
