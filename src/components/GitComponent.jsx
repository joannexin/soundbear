import React, { Component } from 'react';

class Git extends Component {

  render() {
    return(
      <div>
        <div className="container-fluid git">

          <br></br><br></br>

          <h1 id="team">best team</h1>

          <br></br><br></br>

          <div className="row inner">
            <div className="gitdiv col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/alina7091" target="_blank"><img className="gitPic" src={'/assets/alinaGit.jpeg'}/></a>
              <h3>alina lobastova</h3>
               <p id = 'mainunderline'>_________</p>
            </div>
            <div className="gitdiv col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/jemilezzet" target="_blank"><img className="gitPic" src={'/assets/jemilGit.jpeg'}/></a>
              <h3>jemil ezzet</h3>
              <p id = 'mainunderline'>_________</p>
            </div>
            <div className="gitdiv col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/joannexin" target="_blank"><img className="gitPic" src={'/assets/joanneGit.jpeg'}/></a>
              <h3>joanne xin</h3>
              <p id = 'mainunderline'>_________</p>
            </div>
            <div className="gitdiv col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/masashiswingle" target="_blank"><img className="gitPic" src={'/assets/masashi.png'}/></a>
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
