import styles from "./css/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsHeader from "./components/NewsHeader";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import ArticleById from "./components/ArticleById";
import Login from "./components/Login";
import Topics from "./components/Topics";
import Users from "./components/Users";
import UserByUsername from "./components/UserByUsername";
import ErrorPage from "./components/ErrorPage";
import "antd/dist/antd.css";
import { Layout } from "antd";

function App() {
  const { Content, Footer } = Layout;

  return (
    <>
      <BrowserRouter>
        <Layout className="layout">
          <NewsHeader />
          <Nav />
          <Content style={{ padding: "0 5px" }}>
            <div className={styles.App}>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/articles" element={<Articles />}></Route>
                <Route
                  path="/articles/:article_id"
                  element={<ArticleById />}
                ></Route>
                <Route path="/topics" element={<Topics />}></Route>
                <Route path="/users" element={<Users />}></Route>
                <Route
                  path="/users/:username"
                  element={<UserByUsername />}
                ></Route>
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
            <Footer style={{ textAlign: "center" }}>
              2022 Created by Lee Kirkham
            </Footer>
          </Content>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
