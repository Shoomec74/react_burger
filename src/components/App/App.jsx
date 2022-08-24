import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import getIngredients from "../../services/actions/burgerIngredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMediaQuery } from 'react-responsive';
import AppHeader1280 from "../AppHeader/Responcive/AppHeader1280/AppHeader1280";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const { page, content } = appStyles;

  const { isLoading, success } = useSelector((store) => ({
    isLoading: store.ingredients.isLoading,
    success: store.ingredients.success,
  }));

  const isDesktop = useMediaQuery({
    query: "(min-width: 1280px)"
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)"
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 786px)"
  });

  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)"
  });

  const isRetina = useMediaQuery({
    query: "(max-resolution: 300dpi)"
  });

  return !isLoading ? (
    <div className={page}>
      {isDesktop ? <AppHeader /> : <AppHeader1280 />}
      <main className={content}>
        {success && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default App;
