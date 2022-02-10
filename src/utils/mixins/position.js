const position = (pos, ...args) => {
  let top;
  let right;
  let bottom;
  let left;

  switch (args.length) {
    case 4:
      top = args[0];
      right = args[1];
      bottom = args[2];
      left = args[3];
      break;
    case 3:
      top = args[0];
      right = args[1];
      bottom = args[2];
      left = args[1];
      break;
    case 2:
      top = args[0];
      right = args[1];
      bottom = args[0];
      left = args[1];
      break;
    default:
      top = args[0];
      right = args[0];
      bottom = args[0];
      left = args[0];
      break;
  }

  return (`
    position: ${pos};
    ${top !== null ? `top: ${top};` : null};
    ${right !== null ? `right: ${right};` : null};
    ${bottom !== null ? `bottom: ${bottom};` : null};
    ${left !== null ? `left: ${left};` : null};
  `);
};

export default position;
