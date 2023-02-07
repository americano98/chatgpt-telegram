import { Context } from "telegraf";

type ConversationID = string

export interface GPTData {
  parentMessageId: string
  conversationId: ConversationID
}

interface IRoom extends GPTData {
  title: string
}

export interface Session {
  rooms: Record<string, IRoom>
  activeRoom: ConversationID
}

export interface IBotContext extends Context{
  session: Session
}