import React, { Component } from "react";
import AllAlbums from "./AllAlbums";
import SingleAlbum from "./SingleAlbum";
import StatefulAlbums from "./StatefulAlbums";
import Sidebar from "./Sidebar";
import Player from "./Player";
import AllArtists from "./AllArtists";
import SingleArtists from "./SingleArtists";
import { HashRouter, Route } from "react-router-dom";

console.log("stateful " , StatefulAlbums)

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main" className="container-fluid">
        <HashRouter>
          <div>
            <div className="col-xs-2">
              <Sidebar deselectAlbum={this.deselectAlbum} />
            </div>
            <div className="col-xs-10">
              <Route exact path="/" component={StatefulAlbums} />
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtists} />
            </div>
          </div>
        </HashRouter>
        <Player />
      </div>
    );
  }
}
/*
this.state.selectedAlbum.id ?
          <SingleAlbum album={this.state.selectedAlbum} /> :
          <AllAlbums albums={this.state.albums} selectAlbum={this.selectAlbum} />
*/
