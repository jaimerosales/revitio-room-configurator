import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import Thumbnail from './thumbnail';
import ElementUtils from '../utils/element_utils';
import Helpers from './viewer-helpers';

const tilesData = [
    {
      img: 'res/table.png',
      title: 'Table',
      key: '0001',
      urn:'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpb19za2V0Y2hpdC90YWJsZS5ydnQ'
    },
    {
      img: 'res/chair.png',
      title: 'Chair',
      key: '0002',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpb19za2V0Y2hpdC9jaGFpci5ydnQ'
    },
    {
      img: 'res/refrigerator.png',
      title: 'Refrigerator',
      key: '0003',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpb19za2V0Y2hpdC9yZWZyaWdlcmF0b3IucnZ0'
    },
  
    {
      img: 'res/stove.png',
      title: 'Stove',
      key: '0004',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpb19za2V0Y2hpdC9FbGVjdHJpY2FsU3RvdmUucnZ0'
  
    }
  ];

class Gallery extends React.Component {

  onTileSelect(tile, e) {
    e.preventDefault();
    console.log("Launching "+ tile.title +" model");
    Helpers.loadNextModel(tile.urn);
  }
   
  render () {
    return (
      <div id='side-bar'>
        <div className="forge-gallery gallery">
            <div className="container">
                <div className="row">
                    {tilesData.map((tile, index) =>
                    (
                        <div className="tile" key={index}>
                        <a href="#" onClick={this.onTileSelect.bind(this, tile)}>
                            <img className="tile-avatar" src={tile.img} alt={tile.title} />
                        </a>
                        <div className="tile-title">{tile.title}</div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>        
        <Thumbnail />
      </div>
    );
  };
};

let mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

export default ReduxUtils.connect(mapStateToProps, true)(Gallery);