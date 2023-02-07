import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class StartCommand extends Command {
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply("Ask a question");
    })
  }

}