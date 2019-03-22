import RequestUtils from '../utils/request_utils';
import Transform from './transform';
import EventTool from './Viewer.EventTool';

var pointer;
var viewer;
var pointData ={};

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

    var eventTool = new EventTool(viewer)
    eventTool.activate()
    eventTool.on('singleclick', (event) => {
        pointer = event
    })
   
    viewer.loadExtension('Viewing.Extension.Transform');
    viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT,onSelection);

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

        console.log(lmvDoc)
        
        if (lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby90YWJsZS5ydnQ" || 
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9jaGFpci5ydnQ" ||
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9yZWZyaWdlcmF0b3IucnZ0" || 
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9FbGVjdHJpY2FsU3RvdmUucnZ0" ||
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9EZXNrLnJ2dA" ||
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9iZWQucnZ0" || 
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9mbG9vci1sYW1wLnJ2dA" ||
            lmvDoc.myData.guid.toString() === "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9zb2ZhLnJ2dA" ){
            modelOptions = {
                placementTransform: Transform.buildTransformMatrix(pointData)
            };
        }
        else {
            modelOptions = {
                sharedPropertyDbPath: lmvDoc.getPropertyDbPath()
            };
        }

        viewer.loadModel(svfUrl, modelOptions); 

        // add grid
        let grid = new THREE.GridHelper(800, 10);
        
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
    debugger;
    if (event.selections && event.selections.length) {
        pointData = viewer.clientToWorld(
            pointer.canvasX,
            pointer.canvasY,
            true)
        console.log(pointData);
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