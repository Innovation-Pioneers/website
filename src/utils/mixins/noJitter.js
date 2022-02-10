const noJitter = () => (`
  -webkit-backface-visibility: hidden;
  -webkit-transform: perspective(1000px);
`);

export default noJitter;
