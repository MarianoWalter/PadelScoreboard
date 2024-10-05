import type { FC } from 'react';
import './MatchScore.less';

type Props = {
  sets: [number, number];
  games: [number, number];
};

const MatchScore: FC<Props> = ({ sets, games }) => {
  return (
    <div id="match-score">
      <div className="sets-score score-row">
        <div className="team-a-sets team-a-score">{sets[0]}</div>
        <div className="sets-label score-label">Sets</div>
        <div className="team-b-sets team-b-score">{sets[1]}</div>
      </div>

      <div className="games-score score-row">
        <div className="team-a-games team-a-score">{games[0]}</div>
        <div className="games-label score-label">Games</div>
        <div className="team-b-games team-b-score">{games[1]}</div>
      </div>
    </div>
  );
};

export default MatchScore;
