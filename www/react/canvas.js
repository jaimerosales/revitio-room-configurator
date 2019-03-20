import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import ArrayUtils from '../utils/array_utils';
import TransformUtils from '../utils/transform_utils';
import CanvasEvents from './canvas_events';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.getSvg = this.getSvg.bind(this);
  };

  getSvg () {
    return this.refs.svg;
  };

  getModelToScreenAsString () {
    let matrix = TransformUtils.getModelToScreen();
    return 'matrix( ' + matrix.asArr().join(',') + ')';
  };

  setCanvasDimensions () {
    let {width, height}  = this.getSvg().getBoundingClientRect();
    this.props.actions.setCanvasDimensions(width, height);
  };

  componentDidMount () {
    this.setCanvasDimensions();
    this.refs.events.register();
  };

  componentWillUnmount () {
    this.refs.events.unregister();
  };

  renderElements (temp) {
    let elementsToRender = temp ? this.props.temporaryElements : this.props.documentElements;
    return ArrayUtils.range(elementsToRender.length).map(idx => {
      let prefix =  temp ? 'temp' : 'doc';
      return (
        <g key={prefix + idx}>
          {elementsToRender[idx].render(temp, !temp || idx<elementsToRender.length-1)}
        </g>
      );
    });
  };

 
  render () {
    return (
      <div id="canvas">
        <svg id="svg" ref='svg'>
          <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)"/>
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <g transform={this.getModelToScreenAsString()} >
            {this.renderElements()}
            {this.renderElements(true)}
          </g>
        </svg>
        <CanvasEvents getSvg={this.getSvg} actions={this.props.actions} ref='events' />
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    zoomFactor: state.transformData.zoomFactor,
    upVector: state.transformData.upVector,
    origin: state.transformData.origin,
    canvasDimensions: state.canvasDimensions,
    documentElements: state.elementsData.permanent,
    temporaryElements: state.elementsData.temporary
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Canvas);
