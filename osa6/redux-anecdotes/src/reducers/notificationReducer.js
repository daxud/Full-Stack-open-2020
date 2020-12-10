const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

// action creator for changing the notification state
export const notificationChange = notification => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}


export default notificationReducer