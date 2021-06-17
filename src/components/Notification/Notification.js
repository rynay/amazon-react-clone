import * as AC from '../../redux/AC';
import { connect } from 'react-redux';
import s from './Notification.module.scss';
import FlipMove from 'react-flip-move';
import { Close } from '@material-ui/icons';

const Notification = ({ notifications, removeNotification }) => {
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
              onClick={() => removeNotification(notification.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  removeNotification(notification.id);
                }
              }}>
              <Close />
            </button>
          </section>
        ))}
      </FlipMove>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});
const mapDispatchToProps = (dispatch) => ({
  removeNotification: (id) => dispatch(AC.removeNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
