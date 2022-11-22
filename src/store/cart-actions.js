
import { uiActions } from './ui-slice';
import { cartActions, initialCartState } from './cart-slice'

// Action creator THUNK
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending Cart data'
        }))

        try {
            const response = await fetch('https://react-http2-f5ae2-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                //make sure to serialize your JSON body
                body: JSON.stringify({ cartItems: cart.cartItems, quantity: cart.quantity })
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
}

export const getCartData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Fetching...',
            message: 'Fetching Cart data'
        }))

        try {
            const response = await fetch('https://react-http2-f5ae2-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

            if (!response.ok) {
                throw new Error('Failed to get cart data');
            }

            let cartData = await response.json();

            dispatch(cartActions.setCart({
                cartItems: cartData.cartItems || [],
                totalQuantity: cartData.totalQuantity
            }));

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Get data successful'
            }))

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message
            }))
        }
    }
}