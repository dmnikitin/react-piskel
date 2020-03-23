import ToolsReducer from './tools';
import {
  SET_COLOR, SET_ACTIVE_TOOL, SET_PEN_SIZE, SET_CANVAS_SIZE,
} from '../variables';
import { active } from '../../assets/data';

const defaultState = active;

describe('tools reducer', () => {
  it('should return the initial state', () => {
    expect(ToolsReducer(undefined, {})).toEqual(defaultState);
  });

  it('should set active tool correctly', () => {
    expect(ToolsReducer(
      defaultState,
      { type: SET_ACTIVE_TOOL, payload: 'bucket' },
    )).toMatchObject({ ...defaultState, activeTool: 'bucket' });
    expect(ToolsReducer(
      { ...defaultState, activeTool: 'bucket' },
      { type: SET_ACTIVE_TOOL, payload: 'pen' },
    )).toEqual({ ...defaultState, activeTool: 'pen' });
  });

  it('should set pen size correctly', () => {
    expect(ToolsReducer(
      defaultState,
      { type: SET_PEN_SIZE, payload: 'medium' },
    )).toMatchObject({ ...defaultState, penSize: 'medium' });
    expect(ToolsReducer(
      { ...defaultState, penSize: 'medium' },
      { type: SET_PEN_SIZE, payload: 'large' },
    )).toEqual({ ...defaultState, penSize: 'large' });
  });

  it('should set canvas size correctly', () => {
    expect(ToolsReducer(
      defaultState,
      { type: SET_CANVAS_SIZE, payload: 'ext' },
    )).toMatchObject({ ...defaultState, canvasSize: 'ext' });
    expect(ToolsReducer(
      { ...defaultState, canvasSize: 'ext' },
      { type: SET_CANVAS_SIZE, payload: 'max' },
    )).toEqual({ ...defaultState, canvasSize: 'max' });
  });

  it('should set colors correctly', () => {
    expect(ToolsReducer(
      defaultState,
      { type: SET_COLOR, payload: { primaryColor: '#ffffff', alternativeColor: '#000000' } },
    )).toMatchObject({ ...defaultState, colors: { primaryColor: '#ffffff', alternativeColor: '#000000' } });
    expect(ToolsReducer(
      { ...defaultState, colors: { primaryColor: '#d5d900', alternativeColor: '#d98200' } },
      { type: SET_COLOR, payload: { primaryColor: '#000000', alternativeColor: '#d5d900' } },
    )).toMatchObject({ ...defaultState, colors: { primaryColor: '#000000', alternativeColor: '#d5d900' } });
  });
});
