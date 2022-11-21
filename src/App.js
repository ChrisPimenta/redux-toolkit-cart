import Cart from './components/Cart/Cart';
import { Fragment, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart';

let isInitial = true;

function App() {
  const { isCartShown, notification } = useSelector(state => state.ui);

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Whenever cart changes send http request.
  useEffect(() => {
    // For first load we do not want to post the cart data
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {isCartShown && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
