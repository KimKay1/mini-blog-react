import './App.css';
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Page import
import MainPage from './component/page/MainPage';
import PostViewPage from './component/page/PostViewPage';
import PostWritePage from './component/page/PostWritePage';

const MainTitletext = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function App() {

  return (
    <BrowserRouter>
    <MainTitletext>나의 미니 블로그</MainTitletext>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="post-write" element={<PostWritePage />} />
        {/* post/:postID 에서 :postID는 useParam */}
        <Route path="post/:postId" element={<PostViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*

  react-router-dom - 라우팅(routing)을 위한 라이브러리
  Route - 노선, 경로라는 뜻
  웹사이트에서 라우팅 - 사용자가 원하는 경로로 보내는 것
  <BrowserRouter>
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="places" element={<PlacePage />} />
      <Route path="games" element={<GamePage />} />
    </Routes>
  </BrowserRouter>

  / -> MainPage 컴포넌트가 렌더링되어 화면에 나옴
  /places -> PlacePage 컴포넌트가 렌더링되어 화면에 나옴
  /games -> GamePage 컴포넌트가 렌더링되어 화면에 나옴

*/
