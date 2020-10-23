import React from 'react';
import Terrain from './Components/Terrain';
import './App.css';

const myText = 'Mark <Text>Wissler</Text> woo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="abs">
          <p>
            Mark Wissler
          </p>
        </div>
        
        
        <Terrain />
      </header>
    </div>
  );
}

export default App;
