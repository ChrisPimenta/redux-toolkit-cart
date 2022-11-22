import Cart from './components/Cart/Cart';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { sendCartData, getCartData } from './store/cart-actions';

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

    // Only post cart data on change - not on first read
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }


  }, [cart, dispatch])

  // On first load
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch])

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
