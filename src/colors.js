const chalk = require('chalk');

const theme = {
  primary: chalk.hex('#6C63FF'),
  secondary: chalk.hex('#FF6584'),
  accent: chalk.hex('#43E97B'),
  muted: chalk.gray,
  highlight: chalk.bgYellow.black,
};

function colorize(text, color) {
  if (chalk[color]) {
    return chalk[color](text);
  }
  if (color.startsWith('#')) {
    return chalk.hex(color)(text);
  }
  return text;
}

function rainbow(text) {
  const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
  return text.split('').map((char, i) =>
    chalk[colors[i % colors.length]](char)
  ).join('');
}

function progressBar(current, total, width = 30) {
  const percent = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * width);
  const empty = width - filled;

  const bar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
  const label = chalk.bold(`${percent}%`);

  return `${bar} ${label} (${current}/${total})`;
}

module.exports = { theme, colorize, rainbow, progressBar };
