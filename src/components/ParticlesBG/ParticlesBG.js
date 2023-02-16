import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const RenderBG = () => {

    const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
    };

 return (  
    <div className="App">
        <Particles
            id="tsparticles"
            init={particlesInit}

            options={{
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
                        value: "#027438",
                    },

                    links: {
                        color: "#027438",
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
                        value: 180,
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
    </div> 
);}

export default RenderBG;
