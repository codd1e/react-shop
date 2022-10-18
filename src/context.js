import {createContext, useReducer} from "react";
import reducer from "./reducer";

const ShopContext = createContext();

const initialState = {
    items: [],
    loading: true,
    order: [],
    isBasket: false,
    alertName: '',
};

function ContextProvider ({children}) {
    const [value, dispatch] = useReducer(reducer, initialState);

    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'});
    }

    value.removeFromBasket = (itemId) => {
        dispatch({type: 'REMOVE_FROM_BASKET', payload: {id : itemId}});
    }

    value.incQuantity = (itemId) => {
        dispatch({type: 'INC_QUANTITY', payload: {id : itemId}});
    }
    value.decQuantity = (itemId) => {
        dispatch({type: 'DEC_QUANTITY', payload: {id : itemId}});
    }
    value.handleBasket = () => {
        dispatch({type: 'HANDLE_BASKET'});
    }
    value.addToBasket = (item) => {
        dispatch({type: 'ADD_TO_BASKET', payload: item})
    }
    value.setItems = (data) => {
        dispatch({type: 'SET_ITEMS', payload: data})
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ContextProvider};