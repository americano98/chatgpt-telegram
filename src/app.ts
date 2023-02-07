import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { ChatGPTAPI } from 'chatgpt';
import { Command } from "./commands/command.class.js";
import { MessageCommand } from "./commands/message.command.js";
import { StartCommand } from "./commands/start.command.js";
import { IConfigService } from "./config/config.interface.js";
import { ConfigService } from "./config/config.service.js";
import { IBotContext } from "./context/context.interface.js";
import { SwitchToCommand } from "./commands/switch-to.command.js";
import { RoomsCommand } from "./commands/rooms.command.js";
import { NewRoomCommand } from "./commands/newroom.command.js";
import { RemoveCommand } from "./commands/remove.command.js";
import { KeyboardCommands } from "./commands/keyboard.command.js";

class Bot {
  bot: Telegraf<IBotContext>;
  openAI: ChatGPTAPI;
  commands: Command[] = [];

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TELEGRAM_TOKEN"));
    this.bot.use(
      new LocalSession({database: "session.json"}).middleware()
    );
    this.openAI = new ChatGPTAPI({
      apiKey: this.configService.get("OPENAI_TOKEN")
    });
  }

  init() {
    this.commands = [
      new StartCommand(this.bot),
      new RemoveCommand(this.bot),
      new RoomsCommand(this.bot),
      new NewRoomCommand(this.bot),
      new SwitchToCommand(this.bot),
      new MessageCommand(this.bot, this.openAI),
      new KeyboardCommands(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }

}

const bot = new Bot(new ConfigService());
bot.init();