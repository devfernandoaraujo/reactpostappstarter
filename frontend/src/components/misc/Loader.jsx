import { RingLoader } from 'react-spinners';
import classes from '../../css/Loader.page.module.css'

const Loader = () => {
  return (
      <div className={classes.loader}>
        <RingLoader size={150} color={'#36d7b7'} />
      </div>
    );
};

export default Loader;