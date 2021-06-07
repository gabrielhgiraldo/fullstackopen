import React from 'react'

const Notification = ({ notification }) => {
    if (notification) {
        return (
            <div className={notification.type}>{notification.message}</div>
        )
    }
    else {
        return ''
    }
}

export default Notification