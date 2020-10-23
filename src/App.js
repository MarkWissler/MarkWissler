import React from 'react';
import Terrain from './Components/Terrain';
import './App.css';

const myText = 'Mark <Text>Wissler</Text> woo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Mark Wissler
        </p>
        <Terrain />
      </header>
    </div>
  );
}

export default App;
