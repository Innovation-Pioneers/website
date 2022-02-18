import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 720 / 1280 = 0.5625 */
`;

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

function VideoPlayer({ url, onEnded, onClick }) {
  return (
    <Wrapper>
      <PlayerWrapper>
        <Player
          url={url}
          playing
          playsinline
          controls
          width="100%"
          height="100%"
          onEnded={onEnded}
          onClick={onClick}
        />
      </PlayerWrapper>
    </Wrapper>
  );
}

export default VideoPlayer;
