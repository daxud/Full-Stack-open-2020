import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hidden = () => {
    if (notification === '') {
      return true
    } else {
      return false
    }
    }

  console.log(notification)
  return (
    <div hidden={hidden()} style={style}>
      {notification}
    </div>
  )
}

export default Notification