import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ScrollArea from 'react-scrollbar';
import Lyrics from './LyricsComponent';
import MostPopular from './MostPopularComponent';
import Tree from './TreeComponent';
import Track from './TrackComponent';
import Album from './AlbumComponent';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div style={{height: "1000px"}}>
        <Tabs className="navTabs" selectedIndex={this.index}>


            <TabList className="navlist">
              <Tab title="Lyrics" data-toggle="popover" data-trigger="hover">
                <img className="nav" id="playlist" src={'/assets/playlist.png'} />
              </Tab>
              <Tab title="soundBear Top" data-toggle="popover" data-trigger="hover">
                <img className="nav" id="worldMap" src={'/assets/heart.png'} />
              </Tab>
              <Tab title="Artist's Top" data-toggle="popover" data-trigger="hover">
                <img className="nav" id="audacity" src={'/assets/audacity.png'} />
              </Tab>
              <Tab title="Albums" data-toggle="popover" data-trigger="hover">
                <img className="nav" id="uncheck" src={'/assets/uncheck.png'} />
              </Tab>
              <Tab title="Related Artists" data-toggle="popover" data-trigger="hover">
                <img className="nav" id="tournament" src={'/assets/tournament.png'} />
              </Tab>
            </TabList>

            <TabPanel ><Lyrics/></TabPanel>
            <TabPanel><MostPopular/></TabPanel>
            <TabPanel><Track/></TabPanel>
            <TabPanel><Album/></TabPanel>
            <TabPanel><Tree/></TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Nav);
