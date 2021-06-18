import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { products } from '../../products';
import Product from '../../components/Product';
import { Notification } from '../../components/Notification';
import s from './Search.module.scss';
import { connect } from 'react-redux';
import * as AC from '../../redux/AC';
import FlipMove from 'react-flip-move';

const Search = ({ setPath }) => {
  const {
    path,
    params: { query },
  } = useRouteMatch();
  useEffect(() => {
    setPath(path);

    return () => {
      setPath(null);
    };
  }, [path]);

  const result = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.info.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <Notification />
      {result.length === 0 && (
        <h3 className={s.warning}>
          No results were found for this request.
          <br /> Try again
        </h3>
      )}
      <article className={s.products}>
        <FlipMove>
          {result.map((item) => (
            <Product key={item.id} product={item} />
          ))}
        </FlipMove>
      </article>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(AC.setPath(path)),
});

export default connect(null, mapDispatchToProps)(Search);
