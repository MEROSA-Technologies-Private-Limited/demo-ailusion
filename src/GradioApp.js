import React, { useEffect } from 'react';

const GradioApp = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://gradio.s3-us-west-2.amazonaws.com/4.24.0/gradio.js';
    script.onload = () => {
      const gradioApp = document.createElement('gradio-app');
      gradioApp.setAttribute('src', 'https://roopansh-ailusion-vton-demo-v1.hf.space');
      document.getElementById('gradio-container').appendChild(gradioApp);
    };
    document.head.appendChild(script);
  }, []);

  return <div id="gradio-container"></div>;
};

export default GradioApp;
