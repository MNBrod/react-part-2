import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AllAlbums from "./AllAlbums";


//console.log("albums ", AllAlbums)

export default class StatefulAlbums extends Component {
  constructor() {
    super();
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    axios.get("/api/albums/").then(res => res.data).then(albums => {
     // console.log("albums", albums);
      this.setState({ albums });
      console.log("state ", this.state)
    });
  }

  render() {
    const albums = this.state.albums;

    console.log("albumdsfsdfdss ", albums);

    return ( <AllAlbums albums={albums} />);
  }
}
