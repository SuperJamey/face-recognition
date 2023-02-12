import React, { Component } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

class App extends Component {
  render() {
    const particlesInit = async (main) => {
      console.log(main);
      await loadFull(main);
    };
    return (

    <div className="App">
        <Particles
          id="tsparticles"
          init={particlesInit}

          options={
        {
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#000003",
          },
          links: {
            color: "#000003",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 120,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circles",
          },
          size: {
            value: { min: 0, max: 1 },
          },
        },
        detectRetina: true,
      }}
    />

        <Navigation />
        <Logo />
        <Rank />       
        <ImageLinkForm />
        {/*
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
