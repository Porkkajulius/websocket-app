import { Configuration } from 'log4js';

export const LOG4JS_CONF: Configuration = {
  appenders: { out: { type: 'stdout', layout: { type: 'basic' } } },
  categories: { default: { appenders: ['out'], level: 'info' } },
};
