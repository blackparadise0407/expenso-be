/* eslint-disable no-console */
import chalk from 'chalk';

interface LogFn {
  (msg: string): void;
}

export class Logger {
  private ctx: string;
  constructor(context: string) {
    this.ctx = context;
  }

  private get ctxString(): string {
    return this.ctx ? `[${this.ctx}] ` : '';
  }

  public log: LogFn = (msg) => {
    console.log(chalk.blueBright(this.ctxString + msg));
  };

  public warn: LogFn = (msg) => {
    console.warn(chalk.yellow(this.ctxString + msg));
  };

  public error: LogFn = (msg) => {
    console.error(chalk.redBright(this.ctxString + msg));
  };
}
