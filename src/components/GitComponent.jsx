import React, { Component } from 'react';

class Git extends Component {

  render() {
    return(
      <div>
        <div className="container-fluid git">

          <br></br><br></br>

          <h2 id="team">best team</h2>

          <br></br><br></br>

          <div className="row inner">
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/alina7091"><img className="gitPic" src={'/assets/alinaGit.jpeg'}/></a>
              <h3>alina lobastova</h3>
               <p id = 'mainunderline'>_________</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/jemilezzet"><img className="gitPic" src={'/assets/jemilGit.jpeg'}/></a>
              <h3>jemil ezzet</h3>
              <p id = 'mainunderline'>_________</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/joannexin"><img className="gitPic" src={'/assets/joanneGit.jpeg'}/></a>
              <h3>joanne xin</h3>
              <p id = 'mainunderline'>_________</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/masashiswingle"><img className="gitPic" src={'/assets/masashiGit.jpeg'}/></a>
              <h3>masashi swingle</h3>
              <p id = 'mainunderline'>_________</p>
            </div>
          </div>

        </div>

        <br></br>

        <footer className="footer">
          <p>© 2016 soundBear.</p>
        </footer>

        <br></br>
      </div>
    )
  }
}


export default Git;
