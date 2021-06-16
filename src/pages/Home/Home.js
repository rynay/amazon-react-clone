import s from './Home.module.scss';
import Slider from '../../components/sliders/Home';

const Home = () => {
  return (
    <main className={s.home}>
      <Slider />
    </main>
  );
};

export default Home;
