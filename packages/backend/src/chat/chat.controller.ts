import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import { ChatService } from './chat.service'
import { ChatMessageDto } from './dto/chat-message.dto'
import { LangChainAdapter } from 'ai';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(
    @Body() chatMessageDto: ChatMessageDto,
    @Res() res: Response,
  ) {
    try {
      const stream = await this.chatService.chat(chatMessageDto)
      const response = LangChainAdapter.toDataStream(stream);
      for await (const chunk of response) {
        // convert Unit8Array to string
        const data = new TextDecoder().decode(chunk)
        res.write(data)
      }
      res.end()
    } catch (error) {
      console.error('Error in chat controller:', error)
      res.status(500).json({ error: 'An error occurred processing your request' })
    }
  }
} 