import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

import { Layout } from "./modules/Layout/Layout";
import { MainPage } from "./pages/MainPage/MainPage";
import { FavoritePage } from "./pages/FavoritesPage/FavoritePage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import { fetchToken, setDataFromStorage } from "./redux/mainSlice";

import "./App.scss";


function App() {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.main.authorization);

  useLayoutEffect(() => {
    dispatch(setDataFromStorage());
  }, []);

  useEffect(() => {
    if (!authorization) {
      return;
    }
    if (authorization === 'empty') {
      dispatch(fetchToken());
    } else {
      const dateNow = Date.now() / 1000;
      if (authorization.ttl < dateNow) {
        dispatch(fetchToken());
      }
    }
  }, [authorization]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="vacancies" element={<MainPage />} />
          <Route path="vacancies/:id" element={<VacancyPage />} />
          <Route path="favorite" element={<FavoritePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
