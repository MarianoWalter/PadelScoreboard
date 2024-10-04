import type { FC } from 'react';
import GameScore from '../../components/GameScore';
import MatchScore from '../../components/MatchScore';
import { useGameScore } from '../../hooks/useGameScore';
import './index.css';

const Home: FC = () => {
  const {
    score,
    teamAScored,
    teamBScored,
    setPointTeamA,
    setPointTeamB,
    matchPointTeamA,
    matchPointTeamB,
    canUndo,
    undo,
    canRedo,
    redo,
  } = useGameScore();

  return (
    <div className="scoreboard">
      <MatchScore games={score.games} sets={score.sets} />

      <br />

      {score.isTieBreak && <div id="tie-break-message">TIE BREAK</div>}

      <GameScore
        score={score.parsedPoints}
        onTeam1Scored={teamAScored}
        onTeam2Scored={teamBScored}
      />

      <div id="action-buttons" style={{ position: 'absolute', top: 20, left: 20 }}>
        <button id="undo-button" disabled={!canUndo} onClick={undo}>
          Deshacer
        </button>
        &nbsp;
        <button id="redo-button" disabled={!canRedo} onClick={redo}>
          Rehacer
        </button>
      </div>

      {/*TODO remove/hide this: */}
      <span style={{ whiteSpace: 'pre' }}>
        {JSON.stringify(
          {
            tieBreak: score.isTieBreak,
            setPointTeamA,
            setPointTeamB,
            matchPointTeamA,
            matchPointTeamB,
          },
          null,
          2,
        )}
      </span>
    </div>
  );
};

export default Home;
