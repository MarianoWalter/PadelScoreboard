import classNames from 'classnames';
import type { FC } from 'react';
import { isSetFinished } from '../GameUtils';
import './MatchScore.less';

type Props = {
  sets: [number, number][];
  numberOfSets: 3 | 5;
};

const MatchScore: FC<Props> = ({ sets, numberOfSets = 3 }) => {
  const totalSets = Array(numberOfSets).fill(0);

  return (
    <div id="match-score">
      <div>
        <div className="cell team-color team-blue" />
        <div className="cell team-color team-red" />
      </div>

      <div className="team-names">
        <div className="cell team-name team-a-name">Equipo Azul</div>
        <div className="cell team-name team-b-name">Equipo Rojo</div>
      </div>

      {totalSets.map((_, index) => {
        const set = sets[index];
        const [a, b] = set ?? [0, 0];
        const finished = isSetFinished(set);
        const aWon = finished && a > b;
        const bWon = finished && b > a;

        return (
          <div className="set-score" key={index}>
            <div className={classNames('cell', { 'set-won': aWon })}>{set ? a : ''}</div>
            <div className={classNames('cell', { 'set-won': bWon })}>{set ? b : ''}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchScore;
