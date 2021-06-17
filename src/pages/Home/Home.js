import s from './Home.module.scss';
import Slider from '../../components/sliders/Home';
import Product from '../../components/Product';
import { Notification } from '../../components/Notification';
import { products } from '../../products';

const Home = () => {
  return (
    <div className={s.home}>
      <Slider />
      <Notification />
      <article className={s.home__products}>
        {products.slice(0, 15).map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </article>
    </div>
  );
};

export default Home;
