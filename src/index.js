import chalk from 'chalk';

const LOG_LEVELS = {
  error: chalk.bold.red,
  warn: chalk.hex('#FFA500'),
  info: chalk.blue,
  success: chalk.green.bold,
  debug: chalk.gray,
};

function formatLog(level, message, context) {
  const timestamp = new Date().toISOString();
  const colorFn = LOG_LEVELS[level] || chalk.white;
  const prefix = colorFn(`[${level.toUpperCase()}]`);
  const time = chalk.dim(timestamp);

  let output = `${time} ${prefix} ${message}`;

  if (context) {
    output += '\n' + chalk.dim('  Context: ') + chalk.italic(JSON.stringify(context));
  }

  return output;
}

function createLogger(name) {
  const tag = chalk.bgBlue.white(` ${name} `);

  return {
    error: (msg, ctx) => console.log(`${tag} ${formatLog('error', msg, ctx)}`),
    warn: (msg, ctx) => console.log(`${tag} ${formatLog('warn', msg, ctx)}`),
    info: (msg, ctx) => console.log(`${tag} ${formatLog('info', msg, ctx)}`),
    success: (msg, ctx) => console.log(`${tag} ${formatLog('success', msg, ctx)}`),
    debug: (msg, ctx) => console.log(`${tag} ${formatLog('debug', msg, ctx)}`),
  };
}

function formatTable(headers, rows) {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => String(r[i]).length))
  );

  const sep = widths.map(w => chalk.dim('-'.repeat(w + 2))).join(chalk.dim('+'));
  const headerRow = headers.map((h, i) =>
    chalk.bold.underline(h.padEnd(widths[i]))
  ).join(chalk.dim(' | '));

  const dataRows = rows.map(row =>
    row.map((cell, i) => {
      const str = String(cell).padEnd(widths[i]);
      return typeof cell === 'number' ? chalk.yellow(str) : str;
    }).join(chalk.dim(' | '))
  );

  return [headerRow, sep, ...dataRows].join('\n');
}

export {  formatLog, createLogger, formatTable, LOG_LEVELS  };
