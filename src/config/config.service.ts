import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface.js";

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor () {
    const {error, parsed} = config();

    if (error) {
      throw new Error("Couldn't find .env")
    }
    
    if (!parsed) {
      throw new Error(".env is empty")
    }
    
    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];

    if (!res) {
      throw new Error(`Couldn't find such key (${key}) in .env`);
    }

    return res;
  }
}