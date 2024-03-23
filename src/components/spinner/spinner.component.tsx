import { FC } from 'react';
import './spinner.styles.scss'; 

const Spinner: FC = () => (
  <div className="SpinnerOverlay">
    <div className="SpinnerContainer" />
  </div>
);

export default Spinner;
