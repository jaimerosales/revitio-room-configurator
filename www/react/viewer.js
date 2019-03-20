import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import RequestUtils from '../utils/request_utils';
import base64 from 'base-64';
import Helpers from './viewer-helpers';

class Viewer extends React.Component {
  componentDidMount () {
    console.log(this.myBucket());
    let documentId = 'urn:' + base64.encode('urn:adsk.objects:os.object:' + 'jaime_roomconfigurator_sketchit_revitio' + '/' + this.props.modelName);
    console.log(documentId);
    
    Helpers.launchViewer(documentId);
  };

  myBucket (){
    RequestUtils.getRequest('/bucket').then(bucket => {
      this.myBucket = bucket;
    })
    return this.myBucket;
  };

  // launchViewer (urn) {
  //   RequestUtils.getRequest('/token').then(token => {
  //     let options = {
  //       env: 'AutodeskProduction',
  //       getAccessToken: (onGetAccessToken) => {
  //               var accessToken = token.access_token;
  //               var expireTimeSeconds = 60 * 30;
  //               onGetAccessToken(accessToken, expireTimeSeconds);
  //       }
  //     };
  //     console.log(options);
  //     Autodesk.Viewing.Initializer(options, () => {
  //       let viewerApp = new Autodesk.Viewing.ViewingApplication('forge-viewer');
  //       viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
  //       viewerApp.loadDocument(urn, (doc) => {
  //         let viewables = viewerApp.bubble.search({'type':'geometry'});
  //         if (viewables.length === 0) {
  //           console.error('Document contains no viewables.');
  //           return;
  //         }
  //         viewerApp.selectItem(viewables[0], null, console.error);
  //       }, console.error);
  //     });
  //   });
  // }

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
