import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Layout } from "./modules/Layout/Layout";
import "./App.scss";
import { MainPage } from "./pages/MainPage/MainPage";
import { FavoritePage } from "./pages/FavoritesPage/FavoritePage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import { getToken, setHeaders } from "./api/mainApi";
import { setFavoriteFromStorage } from "./redux/mainSlice";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    dispatch(setFavoriteFromStorage());
    if (!token) {
      getToken();
    } else {
      setHeaders(token);
    }
  }, []);

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
