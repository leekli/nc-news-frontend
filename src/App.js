import styles from "./css/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import ArticleById from "./components/ArticleById";
import Login from "./components/Login";
import Topics from "./components/Topics";
import Users from "./components/Users";
import UserByUsername from "./components/UserByUsername";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/articles/:article_id" element={<ArticleById />}></Route>
          <Route path="/topics" element={<Topics />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:username" element={<UserByUsername />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
