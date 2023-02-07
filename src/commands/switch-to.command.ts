import { Telegraf } from "telegraf";
import { ACTIONS } from "../constants/actions.js";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class SwitchToCommand extends Command {
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('switch_to', (ctx) => {
      const rooms = [];
      
      for(let room in ctx.session.rooms) {
        rooms.push([{text: ctx.session.rooms[room].title, callback_data: ACTIONS.switch_to + '@' + ctx.session.rooms[room].conversationId}])
      }

      ctx.reply("Switch to: ", {
        reply_markup: {
          inline_keyboard: rooms
        }
      });

    })
  }

}