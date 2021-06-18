import s from './Home.module.scss';
import Slider from '../../components/sliders/Home';
import Product from '../../components/Product';
import { Notification } from '../../components/Notification';
import { products } from '../../products';
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as AC from '../../redux/AC';

const Home = ({ setPath }) => {
  const { path } = useRouteMatch();
  useEffect(() => {
    setPath(path);

    return () => {
      setPath(null);
    };
  }, [path]);

  return (
    <div className={s.home}>
      <Slider />
      <Notification />
      <article className={s.home__products}>
        {products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </article>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(AC.setPath(path)),
});

export default connect(null, mapDispatchToProps)(Home);
