import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';
import 'tachyons'
import Clarifai from 'clarifai'
import Register from './components/Register/Register'
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
const app = new Clarifai.App({
  apiKey: '419cd4585cd64064ae74bceff37f4c94'
})
class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',//track where we are
      isSignedIn: false
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }
  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3",
      this.state.input).then(
        response => this.displayFaceBox(this.calculateFaceLocation(response))
      .catch(err => console.log(err))
  );
  }
  onRouteChange = (route)  => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  onSign
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
        ?<div>
          <Logo/>
          <Rank/>        
          <ImageLinkForm onInputChange={this.onInputChange}
          onButtonSubmit ={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        : (
        this.state.route === 'signin'
        ?<Signin onRouteChange={this.onRouteChange}/>
        :<Register onRouteChange={this.onRouteChange}/>
        )
      }
      </div>
    );
  }
}

export default App;
