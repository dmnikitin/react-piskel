import React from 'react';
import { connect } from 'react-redux';
import './toolbox.scss';
import ColorsBox from './colors.jsx';

import { setActiveTool, setPenSize } from '../../../state/ac/tools';

function Toolbox(props) {
  const { onSetActiveTool, onSetPenSize } = props;

  const handleTools = (e) => onSetActiveTool(e.currentTarget.getAttribute('data'));
  const handlePenSize = (e) => onSetPenSize(e.currentTarget.getAttribute('data'));

  return (
    <div className="toolbox">
      <div className="toolbox-tools">
        <button type="button" onClick={handleTools} data="pen">
          PEN
        </button>
        <button type="button" onClick={handleTools} data="eraser">
          ERASER
        </button>
        <button type="button" onClick={handleTools} data="colorPicker">
          COLORPICKER
        </button>
        <button type="button" onClick={handleTools} data="stroke">
          STROKE
        </button>
        <button type="button" onClick={handleTools} data="bucket">
          BUCKET
        </button>
        <button type="button" onClick={handleTools} data="allToOneColor">
          ALLTOONE
        </button>
      </div>
      <div className="toolbox-pensize">
        <button type="button" onClick={handlePenSize} data="0">
          small
        </button>
        <button type="button" onClick={handlePenSize} data="1">
          medium
        </button>
        <button type="button" onClick={handlePenSize} data="2">
          large
        </button>
      </div>
      <ColorsBox />
      <div className="toolbox-controls">
        <button>save</button>
        <button>resize</button>
      </div>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
  onSetPenSize: (size) => dispatch(setPenSize(size)),
}))(Toolbox);

// ToolbarMeta.defaultProps = {
//   tags: [],
// };

// ToolbarMeta.propTypes = {
//   notes: PropTypes.arrayOf(PropTypes.object).isRequired,
//   tags: PropTypes.arrayOf(PropTypes.object),
//   currentNote: PropTypes.shape({
//       name: PropTypes.string,
//       content: PropTypes.string,
//       edited: PropTypes.string,
//       priority: PropTypes.bool,
//       location: PropTypes.string,
//       date: PropTypes.string,
//       index: PropTypes.number,
//   }).isRequired,
//   onDeleteNote: PropTypes.func.isRequired,
//   onChangeNote: PropTypes.func.isRequired,
//   onAddTag: PropTypes.func.isRequired,
//   onToggleDisplay: PropTypes.func.isRequired,
// };
