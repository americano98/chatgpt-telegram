import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class RoomsCommand extends Command {
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('rooms', (ctx) => {
      let rooms = '';
      let i = 1;
      for (let room in ctx.session.rooms) {
        rooms += `${i} - ${ctx.session.rooms[room].title}${(room == ctx.session.activeRoom) ? ` (active)`:''}\n`;
        i++;
      }
      return ctx.reply(`Here is list of your rooms:\n\n${rooms}`);
    })
  }

}