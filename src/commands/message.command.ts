import { ChatGPTAPI, ChatMessage } from 'chatgpt';
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "./command.class.js";

export class MessageCommand extends Command {
  
  constructor(bot: Telegraf<IBotContext>, public openAI: ChatGPTAPI) {
    super(bot);
  }

  async askGPT (message: string, ctx: IBotContext) {
    
    if (ctx.session.activeRoom) {
      const params = {
        conversationId: ctx.session.activeRoom,
        parentMessageId: ctx.session.rooms[ctx.session.activeRoom].parentMessageId,
      }
      return await this.openAI.sendMessage(message, params);
    }

    return await this.openAI.sendMessage(message);
  }

  handle(): void {
    this.bot.on("text", async (ctx) => {

      const answer = await this.askGPT(ctx.message.text, ctx);
      if (answer) {

        if (!ctx.session.rooms) {
          ctx.session.rooms = {};
        }
        
        if ((!ctx.session.activeRoom || ctx.session.activeRoom == '') && answer.conversationId) {
          ctx.session.activeRoom = answer.conversationId;
        }
        
        if (answer.id  && answer.conversationId) {
          ctx.session.rooms[answer.conversationId] = {
            parentMessageId: answer.id, 
            conversationId: answer.conversationId,
            title: ctx.session.rooms[answer.conversationId]?.title || ctx.message.text.substring(0, 64)
          };
        }

        return ctx.reply(answer.text);
      }

      return ctx.reply('Something went wrong...')
    })
  }

}