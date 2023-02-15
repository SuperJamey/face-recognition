import React, { Component } from 'react';

import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import ParticlesBG from './components/ParticlesBG/ParticlesBG.js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

const PAT = 'adfdae0e0d864b6498612d5b95f87c65';
const USER_ID = 'superjamey';       
const APP_ID = 'my-first-application';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = 'https://dynamicmedia.accenture.com/is/image/accenture/accenture-women-who-drive-change-featured-400x400?qlt=85&ts=1675710993260&$auto-jpg$&dpr=off';

class App extends Component {
    constructor() {
        super()
        this.state = {
            input: '',
            imageUrl: ''
        } 
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({IMAGE_URL: this.state.input})
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
              {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
              }]
          });
          console.log(raw);
  
  
          const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
          };            
  
          fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
            .catch(error => console.log('error', error));
    }

  render() {
      return (
          <div className="App">
            <ParticlesBG />
            <Navigation />
            <Logo />
            <Rank />       
            <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}            
            />
            <FaceRecognition IMAGE_URL={this.state.IMAGE_URL} />
          </div>
      );
  }
}

export default App;