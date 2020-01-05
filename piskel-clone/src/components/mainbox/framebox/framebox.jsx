import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import FrameWrapper from './frameWrapper';
import './framebox.scss';
import { rearrangeFrames } from '../../../state/ac/frames';

function Framebox({ frames, onRearrangeFrames }) {
  const moveFrame = useCallback(
    (dragIndex, hoverIndex) => {
      onRearrangeFrames(dragIndex, hoverIndex);
    },
    [frames]
  );
  const renderFrame = (frame, index) => (
    <FrameWrapper key={frame.id} index={index} frame={frame} moveFrame={moveFrame} />
  );
  return (
    <DndProvider backend={Backend}>
      <div className="framebox">{frames.map((frame, index) => renderFrame(frame, index))}</div>
    </DndProvider>
  );
}

export default connect(
  (state) => ({
    frames: state.frames.framesArray,
  }),
  (dispatch) => ({
    onRearrangeFrames: (dragIndex, hoverIndex) => dispatch(rearrangeFrames(dragIndex, hoverIndex)),
  })
)(Framebox);

Framebox.propTypes = {
  frames: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRearrangeFrames: PropTypes.func.isRequired,
};
