import s from './Home.module.scss';
import Slider from '../../components/sliders/Home';

const Home = () => {
  return (
    <div className={s.home}>
      <Slider />
    </div>
  );
};

export default Home;
