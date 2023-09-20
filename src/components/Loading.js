import React from 'react';
import Load from '../images/loading.svg';
import '../styles/components/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <img
          src={ Load }
          alt="Carregando..."
          className="Load"
          height={ 75 }
          width={ 75 }
        />
        Carregando...
      </div>
    );
  }
}

export default Loading;
