import React, { Component } from 'react';

class Command extends Component {

  constructor(props) {
    super(props);
  }

  displayPlayer() {
    $('.player').css('filter', 'blur(0px)');
    $('body').click();
  }

  render() {
    return(
      <div className="modal fade" id="commandModal" data-backdrop="static">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <br/>
            <h4 className="centerAlign"><b> Voice Commands </b></h4>
            <img id="closeModal" onClick={ this.displayPlayer.bind(this) } data-dismiss="modal" src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_close-128.png"></img>
            <br></br>
            
            <table className="table">
              <thead>
                <tr className='eachRow heading'>
                  <th className="col-xs-2 heading">What you want to do:</th>
                  <th className="col-xs-4 heading">What you need to say:</th>
                </tr>
              </thead>
              <tbody>
                <tr className='eachRow first'>
                  <td className="col-xs-2">Play song</td>
                  <td className="col-xs-4 descript">"play The Scientist by Coldplay"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Add song to queue</td>
                  <td className="col-xs-4 descript">"add to queue Sweet Virgina by The Rolling Stones"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Play next song</td>
                  <td className="col-xs-4 descript">"skip" or "play next song"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Play previous song</td>
                  <td className="col-xs-4 descript">"play previous song"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Restart current song</td>
                  <td className="col-xs-4 descript"> "restart song" </td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Pause</td>
                  <td className="col-xs-4 descript">"stop" or "pause"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Resume</td>
                  <td className="col-xs-4 descript">"continue" or "resume"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Mute volume </td>
                  <td className="col-xs-4 descript">"mute song"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Unmute volume </td>
                  <td className="col-xs-4 descript">"unmute song"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Show lyrics </td>
                  <td className="col-xs-4 descript">"display lyrics"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Show soundBear Top Ten </td>
                  <td className="col-xs-4 descript">"display top ten</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Show artist's popular songs </td>
                  <td className="col-xs-4 descript">"display popular"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Show artist's albums </td>
                  <td className="col-xs-4 descript">"display albums"</td>
                </tr>
                <tr className='eachRow'>
                  <td className="col-xs-2">Show related artists </td>
                  <td className="col-xs-4 descript">"display related"</td>
                </tr>
              </tbody>
            </table>

            <h4 className="centerAlign funchead"><b> Other Functionality </b></h4>
            <br></br>
            <p className="actions"> Click on any song in queue or history to play it</p>
            <p className="actions"> Remove song from queue by dragging it to trash bin</p>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}


export default Command;
