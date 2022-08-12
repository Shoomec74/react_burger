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

  return !isLoading ? (
    <div className={page}>
      <AppHeader />
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
