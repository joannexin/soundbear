import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import { annyangCall } from '../annyang';
import * as helpers from '../modules/ajax';
import Song from '../modules/Song';
import Scrollchor from 'react-scrollchor';
import { tree }  from '../visualization/artists-tree';
import LandingFeature from './LandingFeatureComponent';
import Git from './GitComponent';



class Landing extends Component {

  componentDidMount() {
    var that = this;
    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 32) {
        e.stopPropagation();
        e.preventDefault();
        that.annyang();
      }
    }, true);
  }

  annyang () {
    annyangCall();
    $('#siri').show();
    $('#help').show();
    $('.js-trigger-overlay-start').hide();
  }

  render() {

    return (
      <div className="container" >

        <div className="heading row" >
          <div className="col-md-1 inline" id='headlogo'>
            <a href="/"><img id="logo" src={'/assets/logo.png'}/><p>soundBear.</p></a>
          </div>
        </div>

        <Scrollchor to="aboutus" className="nav-link"><button className="js-trigger-overlay-about" type="button">about</button></Scrollchor>

        <hr></hr>

        <div className="body">
          <div className="title">
            <h1 id="soundbear">soundBear</h1>
            <p id="mainunderline">_________</p>
            <div id="description">
              <h4>your voice-activated</h4>
              <h4>music player</h4>
            </div>
          </div>
          <button className="js-trigger-overlay-start" onClick = {this.annyang} type="button">start listening</button>
          <img id="siri" className="spinner-toggle" src={'/assets/siri.gif'}/>
          <div id="help" className="spinner-toggle">e.g. "play Paradise by Coldplay"</div>
          <img id="spinner" className="spinner-toggle" src={'/assets/89.gif'}/>
        </div>

        <div id="landingFeature">
          <LandingFeature />
        </div>

        <div id="aboutus">
          <Git />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
};

export default connect(mapStateToProps, { switchViewToPlayer: switchViewToPlayer })(Landing);
