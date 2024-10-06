import classNames from 'classnames';
import type { FC, HTMLAttributes } from 'react';

type Props = Pick<HTMLAttributes<HTMLImageElement>, 'style' | 'className'>;

const TennisBallSVG: FC<Props> = (props) => {
  return (
    <img
      src="/public/tennis-ball.svg"
      {...props}
      className={classNames('tennis-ball-icon', props.className)}
    />
  );
};

export default TennisBallSVG;
