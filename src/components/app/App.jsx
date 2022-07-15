import React from "react";
import appStyles from "./app.module.css";
import {API_URL} from "../../utils/utils.js";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import Modal from '../Modal/Modal.jsx';

const App = () => {
  const { page, content } = appStyles;
  const [state, setState] = React.useState({
    success: false,
    ingredients: [],
    error: null,
    isLoading: false,
  });

  React.useEffect(() => {
    try {
      const getData = async () => {
        setState({ ...state, isLoading: true });
        const res = await fetch(API_URL);
        const data = await res.json();
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

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={page}>
      <AppHeader />
      <main className={content}>
        {state.success && (
          <>
            <BurgerIngredients ingredients={state.ingredients} />
            <BurgerConstructor ingredients={state.ingredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
