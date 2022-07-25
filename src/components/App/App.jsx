import React from "react";
import appStyles from "./app.module.css";
import { API_URL } from "../../utils/utils.js";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import AppContext from "../../services/AppContext.jsx";
import BurgerConstructorContext from "../../services/BurgerConstructorContext.jsx";
import { delay, checkResponse } from "../../utils/utils.js";

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
        await delay(500);
        const res = await fetch(`${API_URL}ingredients`);
        const data = await checkResponse(res);
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

    // начальное значение стейта
    const initialState = { orderSum: 0 };

    // функция-редьюсер
    // изменяет состояния
    function reducer(orderSum, action) {
      return {orderSum: orderSum.orderSum + action.price};
    }

  const [orderSum, dispatch] = React.useReducer(reducer, initialState);

  const [orderInfo, setOrderInfo] = React.useState({
    success: false,
    error: null,
    isLoading: false,
    name: '',
    order: 0
  });

  function getOrder(burgerId) {
    try {
        setOrderInfo({ ...orderInfo, isLoading: true });
        fetch(`${API_URL}orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(burgerId),
        })
        .then(checkResponse)
        .then((data) => {
          setOrderInfo({
            ...orderInfo,
            order: data.order.number,
            name: data.name,
            success: data.success,
            isLoading: false,
          });
        })
    } catch (e) {
      setOrderInfo({ ...orderInfo, isLoading: false, error: e });
      console.log(orderInfo.error);
    }
  }

  return !state.isLoading ? (
    <div className={page}>
      <AppHeader />
      <main className={content}>
        {state.success && (
            <AppContext.Provider value={state.ingredients}>
              <BurgerIngredients />
              <BurgerConstructorContext.Provider value={{orderSum, dispatch, getOrder, orderInfo}}>
                <BurgerConstructor />
              </BurgerConstructorContext.Provider>
            </AppContext.Provider>
        )}
      </main>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default App;
