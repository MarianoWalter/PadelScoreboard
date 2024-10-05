import type { FC } from 'react';
import './ActionButtons.less';

type Props = {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
};

const ActionButtons: FC<Props> = ({ canUndo, canRedo, undo, redo }) => {
  return (
    <div id="action-buttons">
      <button id="undo-button" disabled={!canUndo} onClick={undo}>
        Deshacer
      </button>
      &nbsp;
      <button id="redo-button" disabled={!canRedo} onClick={redo}>
        Rehacer
      </button>
    </div>
  );
};

export default ActionButtons;
