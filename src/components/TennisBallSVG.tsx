import classNames from 'classnames';
import type { FC, HTMLAttributes } from 'react';
import TennisBallImageSrc from '../assets/tennis-ball.svg';

type Props = Pick<HTMLAttributes<HTMLImageElement>, 'style' | 'className'>;

const TennisBallSVG: FC<Props> = (props) => {
  return (
    <img
      src={TennisBallImageSrc}
      {...props}
      className={classNames('tennis-ball-icon', props.className)}
    />
  );
};

export default TennisBallSVG;
