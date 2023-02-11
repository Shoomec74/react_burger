import React, { FC } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import getIngredients from "../../services/actions/burgerIngredients";
import { getUserInfo, updateUserToken } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/actions-types/hooks";
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
  Feed,
  OrderInfoPage,
} from "../../pages";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { deleteCookie, getCookie } from "../../services/utils";
import { TLocation } from "../../types";

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const App: FC = () => {
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const history = useHistory();
  const location = useLocation<TLocation>();
  const background = location.state?.background;
  const { isExact } : any = useParams();
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
      history.push(location.pathname);
    }
  }, []);

  React.useEffect(() => {
    if (cookie && refreshToken) {
      dispatch(getUserInfo());
    }
    // if (isJwtExpired && refreshToken) {
    //   deleteCookie("token");
    //   dispatch(updateUserToken(refreshToken));
    // }
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
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderInfoPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetailsPage ingredients={ingredients}>
            Детали ингридиента
          </IngredientDetailsPage>
        </Route>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderInfoPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
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
