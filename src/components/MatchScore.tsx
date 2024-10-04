import type { FC } from 'react';
import './MatchScore.css';

type Props = {
  sets: [number, number];
  games: [number, number];
};

const MatchScore: FC<Props> = ({ sets, games }) => {
  return (
    <div className="match-score">
      <div className="sets-score score-row">
        <div className="team-1-sets team-1-score">{sets[0]}</div>
        <div className="sets-label score-label">Sets</div>
        <div className="team-2-sets team-2-score">{sets[1]}</div>
      </div>

      <div className="games-score score-row">
        <div className="team-1-games team-1-score">{games[0]}</div>
        <div className="games-label score-label">Games</div>
        <div className="team-2-games team-2-score">{games[1]}</div>
      </div>
    </div>
  );
};

export default MatchScore;
