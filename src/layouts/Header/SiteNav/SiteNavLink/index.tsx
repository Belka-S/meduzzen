import { FC } from 'react';
import classNames from 'classnames';
import SvgIcon from 'components/ui/SvgIcon';
import { NavLink } from 'react-router-dom';

import s from '../index.module.scss';

type TSiteNavLinkProps = {
  className?: string;

  to: string;
  shownIf?: boolean;
  activeIf?: boolean;
  label?: string;
  svgId?: string;
  size?: number;
};

const SiteNavLink: FC<TSiteNavLinkProps> = props => {
  const { className, to, label, svgId, size, shownIf = true, activeIf } = props;

  if (shownIf)
    return (
      <NavLink
        to={to}
        className={classNames(className, activeIf ? s.active : '')}
      >
        {label && label}
        {svgId && <SvgIcon svgId={svgId} size={size} />}
      </NavLink>
    );
};

export default SiteNavLink;
