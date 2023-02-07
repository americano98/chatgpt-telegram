import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class KeyboardCommands extends Command {
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  private removeRoom(ctx: IBotContext, id: string) {
    if (ctx.session.activeRoom == id) {
      ctx.session.activeRoom = '';
    }
    delete ctx.session.rooms[id];
    return ctx.reply(`Room has been removed`);
  }

  private switchToRoom(ctx: IBotContext, id: string) {
    ctx.session.activeRoom = id;
    return ctx.reply(`Room has been switched. Active room is:\n'${ctx.session.rooms[ctx.session.activeRoom].title}'`);
  }

  handle(): void {
    
    this.bot.on('callback_query', async (ctx) => {
      // @ts-expect-error
      const data = ctx.callbackQuery.data || null;
      const [command, id] = data.split('@');
      
      if (!id || !ctx.session.rooms[id]) return ctx.reply(`Room not found`);

      switch(command) {
        case 'remove':
          this.removeRoom(ctx, id);
        break;
        case 'switch_to':
          this.switchToRoom(ctx, id);
        break;
        default:
          return ctx.reply(`Action not found`);
      }
    })
  }

}