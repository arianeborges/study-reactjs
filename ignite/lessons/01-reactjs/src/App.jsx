import {Header} from "./components/Header";
import "./global.css";
import styles from "./App.module.css";
import {Sidebar} from "./components/Sidebar";
import {Post} from "./components/Post";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/arianeborges.png",
      name: "Ariane Santos Borges",
      role: "Frontend developer",
    },
    content: [
      {type: "paragraph", content: "Hey guys 👋"},
      {
        type: "paragraph",
        content:
          "I just uploaded another project to my portfolio. It's a project I did at NLW Return, a Rocketseat event. The name of the project is DoctorCare 🚀",
      },
      {type: "link", content: "jane.design/doctorcare "},
    ],
    publishedAt: new Date("2023-10-02 16:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO",
    },
    content: [
      {type: "paragraph", content: "Hey guys 👋"},
      {
        type: "paragraph",
        content:
          "I just uploaded another project to my portfolio. It's a project I did at NLW Return, a Rocketseat event. The name of the project is DoctorCare 🚀",
      },
      {type: "link", content: "jane.design/doctorcare "},
    ],
    publishedAt: new Date("2023-10-02 17:00:00"),
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
