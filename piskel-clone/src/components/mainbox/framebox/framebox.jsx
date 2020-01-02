import React from 'react';
import { connect } from 'react-redux';
import Frame from './frame.jsx';
import './framebox.scss';

function Framebox({ frames }) {
  return (
    <div className="framebox">
      {frames.map((current, index) => (
        <Frame key={index} index={index} frame={frames[index]} />
      ))}
    </div>
  );
}

export default connect((state) => ({
  frames: state.frames.framesArray,
}))(Framebox);
