import React from 'react'
import s from './Notification.module.scss'
import FlipMove from 'react-flip-move'
import { Close } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStore } from '../../redux/store'
import { removeNotification } from '../../redux/reducers/notificationSlice'

const Notification = () => {
  const notifications = useSelector(
    (store: RootStore) => store.notifications.value
  )
  const dispatch: AppDispatch = useDispatch()

  return (
    <div className={s.notification}>
      <FlipMove>
        {notifications.map((notification) => (
          <section className={s.notification__item} key={notification.id}>
            {notification.img && (
              <div className={s.notification__imageContainer}>
                <img src={notification.img} alt="" />
              </div>
            )}
            <p className={s.notification__message}>{notification.message}</p>
            <button
              className={s.notification__button}
              onClick={() => dispatch(removeNotification(notification.id))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(removeNotification(notification.id))
                }
              }}>
              <Close />
            </button>
          </section>
        ))}
      </FlipMove>
    </div>
  )
}
export default Notification
