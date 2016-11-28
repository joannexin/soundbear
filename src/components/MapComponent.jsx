import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from '../visualization/map';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: this.props.currentSong.countries }
  }

  componentDidMount() {
    if (this.props.currentSong.countries.length === 0) {
      $('#basic_choropleth').html('Sorry, we were unable to find related countries...');
    } else {
      map(this.props.currentSong.countries);
    }
  }

  componentDidUpdate () {
    $('#basic_choropleth').html('');
    map(this.props.currentSong.countries);
  }

  render() {
    return(
      <div id="basic_choropleth"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Map);
