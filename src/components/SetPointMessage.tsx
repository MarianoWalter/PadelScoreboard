import classNames from 'classnames';
import type { FC } from 'react';
import './SetPointMessage.less';

type Props = {
  team: 'A' | 'B';
};

const SetPointMessage: FC<Props> = ({ team }) => {
  return (
    <div
      className={classNames('set-point-message', {
        'set-point-team-a': team === 'A',
        'set-point-team-b': team === 'B',
      })}
    >
      Set Point
    </div>
  );
};

export default SetPointMessage;
