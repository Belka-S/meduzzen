import classNames from 'classnames';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'utils/hooks';

import s from './index.module.scss';

const Header = () => {
  const { isAuth } = useAuth();

  return (
    <div className={classNames('container', s.header)}>
      <NavLink to={'/'}>
        <SvgIcon svgId="menu-home" size={32} />
      </NavLink>
      <NavLink to={'/about'}>About</NavLink>

      {isAuth && <NavLink to={'/cluster'}>Cluster</NavLink>}
      {isAuth && <NavLink to={'/company'}>Company</NavLink>}

      {!isAuth && (
        <div className={s.login}>
          <NavLink to={'/signup'} />
          <NavLink to={'/signin'}>Log In</NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
