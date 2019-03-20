import RequestUtils from '../utils/request_utils';
import Transform from './transform';

var viewer;

function launchViewer(documentId) {
    RequestUtils.getRequest('/token').then(token => {
        let options = {
          env: 'AutodeskProduction',
          getAccessToken: (onGetAccessToken) => {
                  var accessToken = token.access_token;
                  var expireTimeSeconds = 60 * 30;
                  onGetAccessToken(accessToken, expireTimeSeconds);
          }
        };
        var viewerDiv = document.getElementById('forge-viewer');
        viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
        Autodesk.Viewing.Initializer(options, function onInitialized(){
            var errorCode = viewer.start();
            // Check for initialization errors.
            if (errorCode) {
               console.error('viewer.start() error - errorCode:' + errorCode);
               return;
            }
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        });
    })
}
   
   
/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
function onDocumentLoadSuccess(doc) {
   
    // A document contains references to 3D and 2D viewables.
    var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }
   
    viewer.loadExtension('Viewing.Extension.Transform');


    //    var eventTool = new EventTool(viewer)
    //    eventTool.activate()
    //    eventTool.on('singleclick', (event) => {
    //        pointer = event
    //    })
   
       //load model.
    //    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onGeometryLoadedHandler);
    //    viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT,onSelection);
    //    viewer.prefs.tag('ignore-producer');
       
       //viewer.impl.disableRollover(true); removed for viewer version 3.2
    //    viewer.loadExtension(ModelTransformerExtension, {
    //         parentControl: 'modelTools',
    //         autoLoad: true
    //    })  
       // Choose any of the available viewables.
    var indexViewable = 0;
    var lmvDoc = doc;
   
    // Everything is setup, load the model.
    loadModel(viewables, lmvDoc, indexViewable);
}
   
/**
* Autodesk.Viewing.Document.load() failuire callback.
**/
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function loadModel(viewables, lmvDoc, indexViewable) {
    return new Promise((resolve, reject)=> {
        var initialViewable = viewables[indexViewable];
        var svfUrl = lmvDoc.getViewablePath(initialViewable);
        var modelOptions;
        
        if (lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbWNvbmZpZ3VyYXRvcl9za2V0Y2hpdF9yZXZpdGlvL3RhYmxlLnJ2dA" || 
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbWNvbmZpZ3VyYXRvcl9za2V0Y2hpdF9yZXZpdGlvL2NoYWlyLnJ2dA" ){
            modelOptions = {
                placementTransform: Transform.buildTransformMatrix()
            };
        }
        else {
            modelOptions = {
                sharedPropertyDbPath: lmvDoc.getPropertyDbPath()
            };
        }

        viewer.loadModel(svfUrl, modelOptions); 

        // add grid
        let grid = new THREE.GridHelper(400, 10);
        
        grid.position.x = 100;
        grid.position.y = 100;
        grid.position.z = -10;
        
        grid.rotation.x= Math.PI/2 

        grid.material.transparent = true;
        viewer.impl.scene.add(grid);
        viewer.impl.sceneUpdated(true);

        viewer.setTheme("light-theme");
            
        
    })
}

   
  
function onSelection (event) {
    if (event.selections && event.selections.length) {
        pointData = viewer.clientToWorld(
            pointer.canvasX,
            pointer.canvasY,
            true)
    }
}

function loadNextModel(urn) {
    Autodesk.Viewing.Document.load(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
}

const Helpers = {
    launchViewer,
    loadNextModel
};

  export default Helpers;







   // function launchViewer (urn) {
    //     RequestUtils.getRequest('/token').then(token => {
    //       let options = {
    //         env: 'AutodeskProduction',
    //         getAccessToken: (onGetAccessToken) => {
    //                 var accessToken = token.access_token;
    //                 var expireTimeSeconds = 60 * 30;
    //                 onGetAccessToken(accessToken, expireTimeSeconds);
    //         }
    //       };
    //       console.log(options);
    //       Autodesk.Viewing.Initializer(options, () => {
    //         let viewerApp = new Autodesk.Viewing.ViewingApplication('forge-viewer');
    //         viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    //         viewerApp.loadDocument(urn, (doc) => {
    //           let viewables = viewerApp.bubble.search({'type':'geometry'});
    //           if (viewables.length === 0) {
    //             console.error('Document contains no viewables.');
    //             return;
    //           }
    //           viewerApp.selectItem(viewables[0], null, console.error);
    //         }, console.error);
    //       });
    //     });
    //   }