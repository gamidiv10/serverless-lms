import React from 'react';
import './App.css';
import {Register} from './components/register/Register'
import {Login} from './components/login/Login'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { TwoFactorAuth } from './components/two-factor-auth/TwoFactorAuth';
import { WordCloudGenerate } from './components/dataprocessing/Wordcloud-render';
import { UploadFile } from './components/uploadfiles/uploadfiletostorage';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/register" component={Register}/>
        <Route exact path="/" component={Login}/>
        <Route path="/auth" component={TwoFactorAuth}/>
        <Route path="/word-cloud" component={WordCloudGenerate}/>
        <Route path="/uploadFile" component={UploadFile}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
