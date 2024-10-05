import type { FC } from 'react';
import ActionButtons from '../../components/ActionButtons';
import GameScore from '../../components/GameScore';
import MatchScore from '../../components/MatchScore';
import { useGameScore } from '../../hooks/useGameScore';
import './index.less';

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
    <div className="scoreboard-page">
      <MatchScore games={score.games} sets={score.sets} />

      <br />

      <GameScore
        score={score.parsedPoints}
        onTeamAScored={teamAScored}
        onTeamBScored={teamBScored}
        isTieBreak={score.isTieBreak}
        setPointTeamA={setPointTeamA}
        setPointTeamB={setPointTeamB}
        matchPointTeamA={matchPointTeamA}
        matchPointTeamB={matchPointTeamB}
      />

      <ActionButtons canUndo={canUndo} canRedo={canRedo} undo={undo} redo={redo} />
    </div>
  );
};

export default Home;
