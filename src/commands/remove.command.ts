import { Telegraf } from "telegraf";
import { ACTIONS } from "../constants/actions.js";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class RemoveCommand extends Command {
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('remove', (ctx) => {
      const rooms = [];
      
      for(let room in ctx.session.rooms) {
        rooms.push([{
          text: ctx.session.rooms[room].title, 
          callback_data: ACTIONS.remove + '@' +  ctx.session.rooms[room].conversationId
        }])
      }

      ctx.reply("Remove chat: ", {
        reply_markup: {
          inline_keyboard: rooms
        }
      });

    })
  }

}