const easingFunctions = {
  in: {
    quad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    cubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
    quart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
    quint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
    sine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
    expo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
    circ: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
    back: 'cubic-bezier(0.600, -0.28, 0.735, 0.045)',
  },
  out: {
    quad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    cubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    quart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
    quint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    sine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
    expo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    circ: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    back: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
  },
  inOut: {
    quad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    cubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    quart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
    quint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
    sine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
    expo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
    circ: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
    back: 'cubic-bezier(0.680, -0.55, 0.265, 1.550)',
  },
};

const ease = (...args) => {
  let easingFunction;

  if (args.length === 1) {
    const index = 0;
    args = args[index];
  }

  if (Object.keys(easingFunctions.in).includes(args[1])) {
    easingFunction = easingFunctions[args[0]][args[1]];
  } else {
    const strength = parseInt(args[1], 10);

    let x1;
    let x2;
    let y1;
    let y2;

    switch (args[0]) {
      case 'in':
        x1 = (strength / 100);
        x2 = 0;
        y1 = 1;
        y2 = ((100 - strength) / 100);
        break;
      case 'out':
        x1 = 0;
        x2 = (strength / 100);
        y1 = ((100 - strength) / 100);
        y2 = 1;
        break;
      default:
        x1 = (strength / 100);
        x2 = 0;
        y1 = ((100 - strength) / 100);
        y2 = 1;
        break;
    }

    easingFunction = `cubic-bezier(${x1}, ${x2}, ${y1}, ${y2})`;
  }

  return (
    `${easingFunction}`
  );
};

export default ease;
