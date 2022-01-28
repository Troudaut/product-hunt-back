import convict from 'convict';

import { IConfig } from './config.model';
import { CONFIG_SCHEMA } from './config.schema';

export class ConfigReader {

  async readConfig(): Promise<IConfig> {
    console.log('Reading config ...');
    const conf = convict(CONFIG_SCHEMA);
    conf.validate({ allowed: 'strict' });
    conf.loadFile('./config.json');
    return <IConfig>conf.getProperties();
  }
}