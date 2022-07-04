import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: ['http://localhost:4000'] } })
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    return message;
  }
}
