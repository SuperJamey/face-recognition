import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import ParticlesBG from './components/ParticlesBG/ParticlesBG.js';
import Navigation from './components/Navigation/Navigation.js';
import Register from './components/Register/Register.js';
import SignIn from './components/SignIn/SignIn.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

const PAT = '64a6c3e0d1b749048656fbeb71f289a6';
const USER_ID = 'superjamey';       
const APP_ID = 'my-first-application';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '' 
    }
} 
class App extends Component {
    constructor() {
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
              id: '',
              name: '',
              email: '',
              entries: 0,
              joined: '' 
            }
        } 
    }

    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
    }

    calculateFaceLocation = (resp) => {
        console.log(resp);
        const clarifaiFace = resp;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            left_col: (clarifaiFace.left_col) * width,
            top_row: clarifaiFace.top_row * height,
            right_col: width - (clarifaiFace.right_col * width),
            bottom_row: height - (clarifaiFace.bottom_row * height)
        } 
    }
    
    displayFaceBox = (box) => {
        this.setState({box: box})
        }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
              {
                "data": {
                    "image": {
                        "url": this.state.input
                    }
                }
              }]
        });

        const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
          },
          body: raw
        };            

        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => (response.json()))
            .then(result => this.displayFaceBox(this.calculateFaceLocation(result.outputs[0].data.regions[0].region_info.bounding_box)))
            .then(
              fetch('https://smartbrainserver-f9ol.onrender.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
              .catch(console.log)             
            )
        .catch(console.log)
        }

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
        this.setState({route: route})
    }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
      <ParticlesBG />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />      
            <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}            
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        : (
            route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />                      
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )         
      }
    </div>
    );
  }
}

export default App;         