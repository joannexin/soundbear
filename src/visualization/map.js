import { getCountries } from '../modules/ajax';
import { convertCountryCode } from './encoder';

const map = function (array) {

    // Convert codes received from Spotify to aplha3 format, recognizable by Maps
    var convertedCodes = [];
    for (var alpha2 of array) {
      convertedCodes.push(convertCountryCode[alpha2]);
    }

    // Create data object to be drawn on map
    var data = {};
    for (var alpha3 of convertedCodes) {
      data[alpha3] = { fillKey: "startColor" }
    }

    var basic_choropleth = new Datamap({
    element: document.getElementById("basic_choropleth"),
    projection: 'mercator',
    fills: {
      defaultFill: "#000000",
      startColor: "#ffe1bd"
    },
    data: data
  });

}

export default map;
