import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import Canvas from './canvas';
import Viewer from './viewer';
import SideBar from './side_bar';
import Gallery from './gallery';

let HeaderView = () => (
  <div id="header">
    Revit Room Configurator
  </div>
);

let FooterView = () => (
  <div id="footer">
    &copy; Copyright 2022 Autodesk Platform Services
  </div>
);

class SketchIt extends React.Component {
  render () {
    return (
      <div id="container">
        <HeaderView />
        {!this.props.showModel ? (<Canvas />) : (<Viewer />)}
        {!this.props.showModel ? (<SideBar />) : (<Gallery />)}
        <FooterView />
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    showModel: state.modelData.showViewer,
  };
};

export default ReduxUtils.connect(mapStateToProps)(SketchIt);
