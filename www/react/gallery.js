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
      urn:'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby90YWJsZS5ydnQ'
    },
    {
      img: 'res/chair.png',
      title: 'Chair',
      key: '0002',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9jaGFpci5ydnQ'
    },
    {
      img: 'res/refrigerator.png',
      title: 'Refrigerator',
      key: '0003',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9yZWZyaWdlcmF0b3IucnZ0'
    },
    {
      img: 'res/stove.png',
      title: 'Stove',
      key: '0004',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9FbGVjdHJpY2FsU3RvdmUucnZ0'
    },
    {
      img: 'res/desk.png',
      title: 'Desk',
      key: '0005',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9EZXNrLnJ2dA'
    },
    {
      img: 'res/bed.png',
      title: 'Bed',
      key: '0006',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9iZWQucnZ0'
    },
    {
      img: 'res/lamp.png',
      title: 'Lamp',
      key: '0007',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9mbG9vci1sYW1wLnJ2dA'
    },
    {
      img: 'res/sofa.png',
      title: 'Sofa',
      key: '0008',
      urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6amFpbWVfcm9vbV9jb25maWd1cmF0b3JfcmV2aXRpby9zb2ZhLnJ2dA'
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
                        <div className="col col-sm-6 tile" key={index}>
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