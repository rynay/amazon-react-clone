import { useState } from 'react';
import { connect } from 'react-redux';
import s from './Notification.module.scss';

const Notification = ({ lastAddedItem }) => {
  const [item, setItem] = useState(lastAddedItem);
  return (
    <div className={s.notification}>
      {item && (
        <>
          <div className={s.notification__imageContainer}>
            <img src={item.img} alt="" />
          </div>
          <p>{item.title} was added to your cart.</p>
          <button
            onClick={() => setItem(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setItem(null);
              }
            }}>
            X
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  lastAddedItem: state.cart[state.cart.length],
});

export default connect(mapStateToProps)(Notification);
