function reducer(state, {type, payload}) {
    switch (type) {
        case('SET_ITEMS'):
            return {
                ...state,
                items: payload || [],
                loading: false,
            }
        case('ADD_TO_BASKET'):
            const itemIndex = state.order.findIndex((orderItem) => orderItem.id === payload.id);
            let newOrder = null;
            if(itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            }else {
                newOrder = state.order.map((orderItem, index) => {
                    if(index === itemIndex){
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        };
                    }else{
                        return orderItem;
                    }
                });
            }
            return {
                ...state,
                order: newOrder,
                alertName: payload.name
            }
        case('HANDLE_BASKET'):
            return {
                ...state,
                isBasket: !state.isBasket
            }
        case('DEC_QUANTITY'):
            return {
                ...state,
                order: state.order.map(el => {
                    if(el.id === payload.id) {
                        const newQuantity = el.quantity - 1;
                        return {
                            ...el,
                            quantity: newQuantity >= 0? newQuantity : 0,
                        };
                    }else{
                        return el;
                    }
                })
            }
        case('INC_QUANTITY'):
            return {
                ...state,
                order: state.order.map(el => {
                    if (el.id === payload.id) {
                        const newQuantity = el.quantity + 1;
                        return {
                            ...el,
                            quantity: newQuantity,
                        }
                    } else {
                        return el;
                    }
                })
            }
        case('REMOVE_FROM_BASKET'):
            return {
                ...state,
                order: state.order.filter(el => el.id !== payload.id)
            }
        case('CLOSE_ALERT'):
            return {
                ...state,
                alertName: '',
            }
        default:
            return state;
    }
}
export default reducer;