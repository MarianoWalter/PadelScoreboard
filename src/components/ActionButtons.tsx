import type { FC } from 'react';
import './ActionButtons.less';

type Props = {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  changeService: () => void;
};

const ActionButtons: FC<Props> = ({ canUndo, canRedo, undo, redo, changeService }) => {
  return (
    <div id="action-buttons">
      <button id="undo-button" disabled={!canUndo} onClick={undo}>
        Deshacer
      </button>

      <button id="redo-button" disabled={!canRedo} onClick={redo}>
        Rehacer
      </button>

      <button id="change-service-button" onClick={changeService}>
        Cambiar servicio
      </button>
    </div>
  );
};

export default ActionButtons;
