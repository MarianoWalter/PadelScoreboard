import classNames from 'classnames';
import type { FC } from 'react';
import type { Team } from '../domain/Game';
import './GameScore.less';
import MatchPointMessage from './MatchPointMessage';
import SetPointMessage from './SetPointMessage';
import TennisBallSVG from './TennisBallSVG';
import TieBreakMessage from './TieBreakMessage';

type Props = {
  score: [number | 'AD', number | 'AD'];
  service: Team;
  even: boolean;
  onTeamAScored: () => void;
  onTeamBScored: () => void;
  isTieBreak: boolean;
  setPointTeamA: boolean;
  setPointTeamB: boolean;
  matchPointTeamA: boolean;
  matchPointTeamB: boolean;
};

const GameScore: FC<Props> = ({
  score,
  service,
  even,
  onTeamAScored,
  onTeamBScored,
  isTieBreak,
  setPointTeamA,
  setPointTeamB,
  matchPointTeamA,
  matchPointTeamB,
}) => {
  const teamAScore = score[1] === 'AD' ? '' : score[0];
  const teamBScore = score[0] === 'AD' ? '' : score[1];

  return (
    <div className="game-score">
      <div className="current-game-scores">
        <div className="field" onClick={onTeamAScored}>
          <div className="field-divisor" />

          {service === 'A' && (
            <TennisBallSVG className={classNames('left', { top: !even, bottom: even })} />
          )}

          {matchPointTeamA ? (
            <MatchPointMessage />
          ) : setPointTeamA ? (
            <SetPointMessage team="A" />
          ) : undefined}

          <div className="team-game-score-value team-blue">{teamAScore}</div>
        </div>

        <div className="field" onClick={onTeamBScored}>
          <div className="field-divisor" />

          {service === 'B' && (
            <TennisBallSVG className={classNames('right', { top: even, bottom: !even })} />
          )}

          {matchPointTeamB ? (
            <MatchPointMessage />
          ) : setPointTeamB ? (
            <SetPointMessage team="B" />
          ) : undefined}

          <div className="team-game-score-value team-red">{teamBScore}</div>
        </div>

        {isTieBreak && <TieBreakMessage />}
      </div>
    </div>
  );
};

export default GameScore;
