import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './toolbox.scss';
import Modal from 'react-modal';
import ColorsBox from './colorsBox';
import Tools from './tools';
import Pensize from './penSize';
import CanvasSize from './canvasSize';
import ChangeControl from './changeControl';
import { setActiveTool, setPenSize, setCanvasSize } from '../../../state/ac/tools';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    listStyleType: 'none',
  },
  button: {
    width: '150px',
  },
};

function Toolbox(props) {
  const {
    buttons,
    onSetActiveTool,
    onSetPenSize,
    onSetCanvasSize,
  } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const entries = Object.entries(buttons);

  return (
    <section className="toolbox">
      <h3>Toolbox</h3>
      <Tools callback={onSetActiveTool} />
      <ColorsBox />
      <Pensize callback={onSetPenSize} />
      <CanvasSize callback={onSetCanvasSize} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {entries.map((current) => (
          <li key={`button-${current}`}>
            <span>{`${current[0]} :  `}</span>
            <span className="modal-accent">{`${current[1].toUpperCase()}  `}</span>
            <ChangeControl tool={current[0]} />
          </li>
        ))}
        <button type="button" onClick={closeModal}>close</button>
      </Modal>
      <section className="toolbox-controls">
        <h3> Miscellaneous </h3>
        <div className="toolbox-controls__buttons">
          <button type="button" onClick={openModal}>Change CTRLS</button>
        </div>
      </section>
    </section>
  );
}

export default connect(
  (state) => ({ buttons: state.buttons }),
  (dispatch) => ({
    onSetActiveTool: (tool) => dispatch(setActiveTool(tool)),
    onSetPenSize: (size) => dispatch(setPenSize(size)),
    onSetCanvasSize: (size) => dispatch(setCanvasSize(size)),
  }),
)(Toolbox);

Toolbox.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSetActiveTool: PropTypes.func.isRequired,
  onSetPenSize: PropTypes.func.isRequired,
  onSetCanvasSize: PropTypes.func.isRequired,
};
