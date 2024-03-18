import classNames from 'classnames';
import SvgIcon from 'components/ui/SvgIcon';
import H5 from 'components/ui/Typography/H5';
import { NavLink } from 'react-router-dom';

import s from './index.module.scss';

const Header = () => {
  return (
    <div className={classNames('container', s.header)}>
      <NavLink to={'/'}>
        <SvgIcon svgId="menu-home" size={32} />
      </NavLink>

      <div>
        <NavLink to={'/signup'} />
        <NavLink to={'/signin'}>
          <H5>Log In</H5>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
