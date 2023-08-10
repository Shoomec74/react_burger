import React, { FC, useCallback } from "react";
import POSMonitorStyles from "./POSMonitor.module.css";
import OrderElement from "./OrderElement/OrderElement";
import { useSelector, useDispatch } from "../../services/actions-types/hooks";
import { useLocation, Link, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import Modal from "../Modal/Modal";
import OrdersInfoDetails from "../OrdersInfoDetails/OrdersInfoDetails";
import StatsOrders from "./StatsOrders/StatsOrders";
import { TFeed } from "../../types/data";
import { TLocation } from "../../types";
import { hideModal, showModalFeed } from "../../services/actions/modals";

const POSMonitor: FC = () => {
  const { section, feedScrollBox, link } = POSMonitorStyles;
  const location = useLocation<TLocation>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { orders, feedModal, order } = useSelector((store) => ({
    orders: store.webSocket.orders,
    feedModal: store.popup.feedModal,
    order: store.popup.feedItem,
  }));

  const feedConnected = location.pathname.includes('feed');

  const handlerCloseModal = useCallback(() => {
    dispatch(hideModal());
    history.goBack();
  }, [dispatch]);

  return (
    <>
      <section className={section}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={feedScrollBox}>
          {orders &&
            orders.map((orderElement: TFeed, index: number) => {
              const uniqueID = nanoid();
              return (
                <Link
                  className={link}
                  to={
                    feedConnected
                      ? {
                          pathname: `/feed/${orderElement._id}`,
                          state: { background: location },
                        }
                      : {
                          pathname: `/profile/orders/${orderElement._id}`,
                          state: { background: location },
                        }
                  }
                  key={uniqueID}
                  onClick={() => {
                    dispatch(showModalFeed(orderElement));
                  }}
                >
                  <OrderElement order={orderElement} key={index} />
                </Link>
              );
            })}

          {feedModal && (
            <Modal isOpened={feedModal} onClose={handlerCloseModal}>
              <OrdersInfoDetails order={order} />
            </Modal>
          )}
        </div>
      </section>
      {feedConnected && <StatsOrders />}
    </>
  );
};

export default POSMonitor;
