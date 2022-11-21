import Cart from './components/Cart/Cart';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const isCartShown = useSelector(state => state.ui.isCartShown);

  const cart = useSelector(state => state.cart);

  // Whenever cart changes send http request.
  useEffect(() => {
    fetch('https://react-http2-f5ae2-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(cart)
    })
  }, [cart])

  return (
    <Layout>
      {isCartShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
