import { FC, MouseEvent } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';

type TEditBarBtnProps = {
  className?: string;

  shownIf?: boolean;
  svgId: string;
  size?: number;
  onClick:
    | (() => void)
    | ((e: MouseEvent<HTMLButtonElement>) => void)
    | ((e: MouseEvent<HTMLButtonElement>) => Promise<void>);
};

const EditBarBtn: FC<TEditBarBtnProps> = props => {
  const { className, onClick, svgId, size, shownIf = true } = props;

  if (shownIf)
    return (
      <Button
        className={className}
        color="outlined"
        variant="round"
        onClick={onClick}
      >
        <SvgIcon svgId={svgId} size={size} />
      </Button>
    );
};

export default EditBarBtn;
