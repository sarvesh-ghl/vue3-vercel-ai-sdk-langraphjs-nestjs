import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  role: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsOptional()
  id?: string
}

export class ChatMessageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages: MessageDto[]

  @IsString()
  @IsOptional()
  sessionId?: string
} 