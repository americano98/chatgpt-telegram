import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class NewRoomCommand extends Command {
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('newroom', (ctx) => {
      ctx.session.activeRoom = '';
      return ctx.reply('New room is ready. Ask your question');
    })
  }

}