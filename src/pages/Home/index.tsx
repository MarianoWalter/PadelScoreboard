import { type FC } from 'react';
import ActionButtons from '../../components/ActionButtons';
import GameScore from '../../components/GameScore';
import MatchScore from '../../components/MatchScore';
import { useGameScore } from '../../hooks/useGameScore';
import './index.less';

//TODO add step to select first service and maybe something to load a previous unfinished game
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
    service,
    changeService,
  } = useGameScore();

  const evenService = (score.points[0] + score.points[1]) % 2 === 0;

  return (
    <div className="scoreboard-page">
      <MatchScore sets={score.sets} numberOfSets={3} />

      <GameScore
        score={score.parsedPoints}
        service={service}
        even={evenService}
        onTeamAScored={teamAScored}
        onTeamBScored={teamBScored}
        isTieBreak={score.isTieBreak}
        setPointTeamA={setPointTeamA}
        setPointTeamB={setPointTeamB}
        matchPointTeamA={matchPointTeamA}
        matchPointTeamB={matchPointTeamB}
      />

      <ActionButtons
        canUndo={canUndo}
        canRedo={canRedo}
        undo={undo}
        redo={redo}
        changeService={changeService}
      />
    </div>
  );
};

export default Home;
