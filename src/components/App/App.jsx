import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import getIngredients from "../../services/actions/burgerIngredients";
import { useDispatch, useSelector } from "react-redux";


const App = () => {
  const dispatch = useDispatch();

  const { page, content } = appStyles;
  const { isLoading, success } = useSelector((store) => ({
    isLoading: store.ingredients.isLoading,
    success: store.ingredients.success,
  }));

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return !isLoading ? (
        <div className={page}>
          <AppHeader />
          <main className={content}>
            {success && (
              <>
              <BurgerIngredients />
              <BurgerConstructor />
              </>
            )}
          </main>
        </div>
  ) : (
    <LoadingSpinner />
  );
};

export default App;
