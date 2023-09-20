import PropTypes from 'prop-types';
import React from 'react';

function EmbedVideo({ embedId }) {
  return (<iframe
    width="340"
    height="160"
    src={ `https://www.youtube.com/embed/${embedId}` }
    frameBorder="0"
    allow="accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
    allowFullScreen
    title="EmbedVideo"
    data-testid="video"
  />);
}

EmbedVideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default EmbedVideo;
