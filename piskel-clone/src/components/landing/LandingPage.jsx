import React from 'react';
import './landing.scss';

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-overview">
        <h4>This app is a variation of the famous
        <a href="http://piskelapp.com">PISKEL</a></h4>
        <h5>With this app you can:</h5>
        <ul>
          <li> draw sprites using browser Canvas-API </li>
          <li> add, delete, duplicate as many sprites as you like </li>
          <li> use powerful drawing tools like stroke, bucket, eraser etc</li>
          <li> set preferred pen size, canvas size, drawing color </li>
          <li> set required framerate and watch animation preview (even in full page mode) </li>
          <li> navigate with control keyboard buttons with option to change them </li>
          <li> export result to filesystem as GIF </li>
        </ul>

      </div>
      <div className="landing-screen">
        <img src="../../assets/landing.jpg" alt="landing" width="500" height="300" />
      </div>
      <section className="landing-gifs">
        <img src="../../assets/1.gif" alt="gif1" width="250" height="200" />
        <img src="../../assets/2.gif" alt="gif2" width="250" height="200" />
        <img src="../../assets/3.gif" alt="gif3" width="200" height="200" />
        <img src="../../assets/4.gif" alt="gif4" width="200" height="200" />
      </section>
      <footer className="landing-footer"> <h5>2020, Dmitrij Nikitin. <a href="https://dmnikitin.github.io/portfolio/">portfolio</a></h5></footer>
    </div>
  );
}
