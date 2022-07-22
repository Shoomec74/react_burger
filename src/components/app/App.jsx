import React from "react";
import appStyles from "./app.module.css";
import { API_URL } from "../../utils/utils.js";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import AppContext from "../../services/AppContext.jsx";

const App = () => {
  const { page, content } = appStyles;
  const [state, setState] = React.useState({
    success: false,
    ingredients: [],
    error: null,
    isLoading: false,
  });
  const appData = state.ingredients;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  React.useEffect(() => {
    try {
      const getData = async () => {
        setState({ ...state, isLoading: true });
        await delay(3000);
        const res = await fetch(API_URL);
        const data = res.ok
          ? await res.json()
          : Promise.reject(`Ошибка ${res.status}`);
        setState({
          ...state,
          ingredients: data.data,
          success: true,
          isLoading: false,
        });
      };
      getData();
    } catch (e) {
      setState({ ...state, isLoading: false, error: e });
      console.log(state.error);
    }
  }, []);

  return !state.isLoading ? (
    <div className={page}>
      <AppHeader />
      <main className={content}>
        {state.success && (
          <>
            <AppContext.Provider value={appData}>
              <BurgerIngredients />
              <BurgerConstructor />
            </AppContext.Provider>
          </>
        )}
      </main>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default App;
