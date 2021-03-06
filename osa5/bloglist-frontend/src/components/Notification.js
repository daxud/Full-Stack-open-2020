import React from 'react'

const Notification = ({ message, fail }) => {
  const style = fail ? 'failNotification':'notification'
  if (message === null) {
    return null
  }

  return (
    <div id='notification' className={style}>
      {message}
    </div>
  )
}

export default Notification