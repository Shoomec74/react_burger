import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import getIngredients from "../../services/actions/burgerIngredients";
import { getUserInfo, updateUserToken } from "../../services/actions/user.js";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Page404,
  Profile,
  IngredientDetailsPage,
} from "../../pages";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { deleteCookie, getCookie } from "../../services/utils";

const App = () => {
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;
  const { isExact } = useParams();
  const { page, content } = appStyles;
  const { isLoading, success, isJwtExpired, ingredients } = useSelector(
    (store) => ({
      isLoading: store.ingredients.isLoading,
      success: store.ingredients.success,
      isJwtExpired: store.userInfo.isJwtExpired,
      ingredients: store.ingredients.ingredients,
    })
  );

  React.useEffect(() => {
    dispatch(getIngredients());
    if (!isExact) {
      history.push(location.path);
    }
  }, []);

  React.useEffect(() => {
    dispatch(getUserInfo());
    if (isJwtExpired && refreshToken) {
      deleteCookie("token");
      dispatch(updateUserToken(refreshToken));
    }
  }, [dispatch, isJwtExpired, cookie, refreshToken]);

  return !isLoading ? (
    <div className={page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <main className={content}>
            {success && (
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            )}
          </main>
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetailsPage ingredients={ingredients}>
            Детали ингридиента
          </IngredientDetailsPage>
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default App;
