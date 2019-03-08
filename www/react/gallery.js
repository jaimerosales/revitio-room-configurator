import React from 'react';
import ReduxUtils from '../utils/redux_utils';
import Thumbnail from './thumbnail';
import ElementUtils from '../utils/element_utils';

const tilesData = [
    {
      img: 'res/table.png',
      title: 'Table',
      key: '0001',
      urn:'urn:'
    },
    {
      img: 'res/chair.png',
      title: 'Chair',
      key: '0002',
      urn: 'urn:'
    },
    {
      img: 'res/refrigerator.png',
      title: 'Refrigerator',
      key: '0003',
      urn: 'urn:'
    },
  
    {
      img: 'res/stove.png',
      title: 'Stove',
      key: '0004',
      urn: 'urn:'
  
    }
  ];

class Gallery extends React.Component {

    onTileSelect(tile, e) {
        e.preventDefault();
        console.log("Launching new model");
        // Starts loading once it scrolls
        // setTimeout(
        //   () => Helpers.launchViewer("viewerDiv", tile.urn, tile.key),
        //   300
        // );
      }
  
  
  render () {
    return (
      <div id='side-bar'>
        <div className="forge-gallery">
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