import type { FC } from 'react';
import './GameScore.css';

type Props = {
  score: [number | 'AD', number | 'AD'];
  onTeam1Scored: () => void;
  onTeam2Scored: () => void;
};

const GameScore: FC<Props> = ({
  score: [team1Score, team2Score],
  onTeam1Scored,
  onTeam2Scored,
}) => {
  return (
    <div className="game-score">
      <div className="team-1-button-container">
        <button className="add-score-button" onClick={onTeam1Scored}>
          +
        </button>
      </div>

      <div className="current-game-scores">
        <div className="team-game-score-value team-1-game-score-value">
          {team2Score === 'AD' ? '' : team1Score}
        </div>
        <div className="team-game-score-value team-2-game-score-value">
          {team1Score === 'AD' ? '' : team2Score}
        </div>
      </div>

      <div className="team-2-button-container">
        <button className="add-score-button" onClick={onTeam2Scored}>
          +
        </button>
      </div>
    </div>
  );
};

export default GameScore;
