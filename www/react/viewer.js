import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import RequestUtils from '../utils/request_utils';
import base64 from 'base-64';
import Helpers from './viewer-helpers';

class Viewer extends React.Component {
  componentDidMount () {
    Helpers.launchViewer(this.props.modelName);
  };

  render () {
    return (
      <div id='viewer'>
        <div id='forge-viewer' />
        <div id='forge-logo'>
          <img id='logo-size' src='../res/forge-logo.png' alt='Autodesk Forge' />
        </div>
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    modelName: state.modelData.name
  };
};

export default ReduxUtils.connect(mapStateToProps)(Viewer);
