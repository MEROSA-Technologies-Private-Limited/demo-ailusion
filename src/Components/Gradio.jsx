import React, { useEffect, useState } from 'react';
import GridLoader from "react-spinners/GridLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const GradioApp = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load the Gradio script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://gradio.s3-us-west-2.amazonaws.com/4.24.0/gradio.js';
    script.onload = () => {
      const gradioApp = document.createElement('gradio-app');
      gradioApp.setAttribute('src', 'https://roopansh-ailusion-vton-demo-v1.hf.space');
      
      const container = document.getElementById('gradio-container');
      if (container) {
        container.appendChild(gradioApp);
        setTimeout(() => {
          setLoaded(true);
        }, 5000);
      } else {
        console.error('Gradio container not found');
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <div className={`gradio-container ${loaded ? 'visible' : 'hidden'}`} id="gradio-container"></div>
      {!loaded && <div className="min-h-screen mx-auto mt-40">
        <GridLoader
          color={'#5A48C6'}
          loading={!loaded}
          size={10}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
          className=''
        />
      </div>}
    </>
  )
};

export default GradioApp;
