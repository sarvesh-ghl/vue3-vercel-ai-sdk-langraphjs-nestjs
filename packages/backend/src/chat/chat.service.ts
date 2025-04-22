import { Injectable } from '@nestjs/common'
import { ChatOpenAI } from '@langchain/openai'
import { ChatMessageDto } from './dto/chat-message.dto'
import { HumanMessage, AIMessage } from '@langchain/core/messages'
import { BaseMessage } from '@langchain/core/messages'
import { app } from './workflow'

@Injectable()
export class ChatService {
  private readonly model: ChatOpenAI

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OPENAI_API_KEY is not set in environment variables!')
    }
    
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      // streaming: true,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
  }

  async chat(chatMessageDto: ChatMessageDto) {
    console.log('Received chat messages:', chatMessageDto.messages)
    
    // Convert messages to LangChain format
    const messages: BaseMessage[] = chatMessageDto.messages.map(msg => {
      if (msg.role === 'user') {
        return new HumanMessage(msg.content)
      } else if (msg.role === 'assistant') {
        return new AIMessage(msg.content)
      }
      // Default to HumanMessage if role is not recognized
      return new HumanMessage(msg.content)
    })

    const finalState = app.streamEvents({
      messages,
    }, {
      version: 'v2',
      streamMode: 'messages'
    },);

    return finalState
  }
} 