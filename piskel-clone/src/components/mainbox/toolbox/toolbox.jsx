import React from 'react';
import { connect } from 'react-redux';
import './toolbox.scss';
import Modal from 'react-modal';
import ColorsBox from './colors.jsx';
import Button from './button.jsx';
import ChangeControl from './changeControl.jsx';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Toolbox({ buttons }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const entries = Object.entries(buttons);

  return (
    <section className="toolbox">
      <div className="toolbox-tools">
        <Button data="pen" icon="pencil" />
        <Button data="eraser" icon="eraser" />
        <Button data="colorPicker" icon="eyedropper" />
        <Button data="stroke" icon="arrows-h" />
        <Button data="bucket" icon="shower" />
        <Button data="allToOneColor" icon="magic" />
      </div>

      <div className="toolbox-pensize">
        <span>Choose the pen size</span>
        <button type="button" data="0">
          small
        </button>
        <button type="button" data="1">
          medium
        </button>
        exposure_plus_2
        <button type="button" data="2">
          large
        </button>
      </div>
      <ColorsBox />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {entries.map((current) => (
          <li>
            <span>{current[0]}</span> :<span>{String.fromCharCode(current[1])}</span>
            <ChangeControl tool={current[0]} />
          </li>
        ))}
        <button onClick={closeModal}>close</button>
      </Modal>
      <button className="toolbox-controls">
        <button onClick={openModal}>change keys</button>
        <button>save</button>
        <button>resize</button>
      </button>
    </section>
  );
}

export default connect(
  (state) => ({ buttons: state.buttons }),
  () => {}
)(Toolbox);

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
