import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import Frame from './frame';
import { FRAME } from '../../../state/variables';

export default function FrameWrapper(props) {
  const { frame, index, moveFrame } = props;
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: FRAME,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveFrame(dragIndex, hoverIndex);
      const newItem = item;
      newItem.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    item: { type: FRAME, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="framebox-frame-wrapper">
      <Frame frame={frame} index={index} />
    </div>
  );
}

FrameWrapper.propTypes = {
  frame: PropTypes.shape({ id: PropTypes.number, array: PropTypes.array }).isRequired,
  index: PropTypes.number.isRequired,
  moveFrame: PropTypes.func.isRequired,
};
