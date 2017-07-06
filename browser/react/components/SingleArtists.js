import React, { Component } from 'react';
import axios from 'axios';
import { Link, HashRouter, Route } from 'react-router-dom';
import AllAlbums from './AllAlbums';
import Songs from '../components/Songs';
import SingleAlbum from './SingleAlbum';

export default class SingleArtist extends Component {
  constructor() {
    super();
    //this.id;
    this.state = {
      artist: {},
      albums: [],
      songs: [],
      id: 0
    };
  }

  componentDidMount() {
    //this.setStatethis.props.match.params.artistId;
    // axios.get(`/api/artists/${id}`).then(res => res.data).then(artist => {
    //   this.setState({ artist });
    // });

    let proms = [];
    proms.push(axios.get(`/api/artists/${this.props.match.params.artistId}`));
    proms.push(axios.get(`/api/artists/${this.props.match.params.artistId}/albums`));
    proms.push(axios.get(`/api/artists/${this.props.match.params.artistId}/songs`));

    Promise.all(proms).then(results => {
      this.setState({
        id:   this.props.match.params.artistId,
        artist: results[0].data,
        albums: results[1].data,
        songs: results[2].data
      });
    });
  }

  render() {
    console.log('props', this.props);
    const artist = this.state.artist;

    // return (
    //   <div>
    //     <h3>
    //       {artist.name}
    //     </h3>
    //     <AllAlbums albums={this.state.albums} />
    //     <Songs songs={this.state.songs} />
    //   </div>
    //     <Route exact path="/songs" component={StatefulAlbums} />
    // <Route exact path="/albums" component={StatefulAlbums} />
    // );

    return (
            <div>
        <h3>
          {artist.name}
        </h3>
        <ul className="nav nav-tabs">
          <li>
            <Link to={`/artists/${this.state.id}/albums`}>ALBUMS</Link>
          </li>
          <li>
            <Link to={`/artists/${this.state.id}/songs`}>SONGS</Link>
          </li>
        </ul>
        <HashRouter>
        <div>
        <Route path="/artists/:id/songs" render={() => <Songs audio={this.props.audio} songs={this.state.songs} />} />
        <Route path="/artists/:id/albums" render={() => <AllAlbums albums={this.state.albums} />} />
        </div>
        </HashRouter>
      </div>
    );
  }
}
