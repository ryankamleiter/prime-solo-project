const editCard = (state  = {}, action) => {
    if(action.type === 'SET_EDIT_CARD') {
        console.log('set edit card action payload.card', action.payload.card)
        return action.payload.card;
    } else if (action.type === 'EDIT_ONCHANGE') {
        return {
            ...state,
            [action.payload.property] : action.payload.value
        }
    } else if (action.type === 'EDIT_CLEAR') {
        return {}
    }
    return state;
}

export default editCard;
