import Cart from './components/Cart/Cart';
import { Fragment, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui';
import Notification from './components/UI/Notification';

function App() {
  const { isCartShown, notification } = useSelector(state => state.ui);

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Whenever cart changes send http request.
  useEffect(() => {
    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart data'
      }))

      try {
        const response = await fetch('https://react-http2-f5ae2-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
          method: 'put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          //make sure to serialize your JSON body
          body: JSON.stringify(cart)
        })

        if (!response.ok) {
          throw new Error('Failed to send cart data');
        }

        const responseData = await response.json();

        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Send data successfully'
        }))

      } catch (error) {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: error.message
        }))
      }
    }

    sendCartData();

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
