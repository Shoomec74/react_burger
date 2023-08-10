import { FC } from "react";
import { useSelector } from "../../../services/actions-types/hooks";
import statsOrdersStyles from "./statsOrders.module.css";

const StatsOrders: FC = () => {
  const {
    section,
    orderBoard,
    orderList,
    column,
    item,
    completed,
    totalItems,
    done,
  } = statsOrdersStyles;
  const { orders, total, totalToday } = useSelector((store) => ({
    orders: store.webSocket.orders,
    total: store.webSocket.total,
    totalToday: store.webSocket.totalToday,
  }));

  const orderDone = orders
    ?.filter((order) => order.status === "done")
    .slice(0, 20);
  const orderPending = orders
    ?.filter((order) => order.status !== "done")
    .slice(0, 20);

  return (
    <section className={`${section} pt-25 pl-15`}>
      <div className={`${orderBoard} pb-10`}>
        <div className={column}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={orderList}>
            {orderDone?.map((order, index) => {
              return (
                <li
                  className={`${item} ${done} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={column}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={orderList}>
            {orderPending?.map((order, index) => {
              return (
                <li
                  className={`${item} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${completed} pb-10`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <h2 className={`${totalItems} text text_type_digits-large`}>{total}</h2>
      </div>
      <div className={completed}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <h2 className={`${totalItems} text text_type_digits-large`}>
          {totalToday}
        </h2>
      </div>
    </section>
  );
};

export default StatsOrders;
