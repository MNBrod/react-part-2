import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AllAlbums from "./AllAlbums";
import Songs from "../components/Songs";
import SingleAlbum from "./SingleAlbum";

export default class SingleArtist extends Component {
  constructor() {
    super();
    this.state = {
      artist: {},
      albums: [],
      songs: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.artistId;
    axios.get(`/api/artists/${id}`).then(res => res.data).then(artist => {
      this.setState({ artist });
    });

    let proms = [];
    proms.push(axios.get(`/api/artists/${id}`));
    proms.push(axios.get(`/api/artists/${id}/albums`));
    proms.push(axios.get(`/api/artists/${id}/songs`));

    Promise.all(proms).then(results => {
      console.log("result 2", results[2].data);
      this.setState({
        artist: results[0].data,
        albums: results[1].data,
        songs: results[2].data
      });
    });
  }

  render() {
    const artist = this.state.artist;

    return (
      <div>
        <h3>
          {artist.name}
        </h3>
        <AllAlbums Albums={this.state.albums} />
        <Songs songs={this.state.songs} />
      </div>
    );
  }
}
