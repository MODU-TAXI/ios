import { MessageBody } from '@recoil/type';

const isSameMessageGroup = (type1: string, type2: string): boolean => {
  const chatTypes = ['CHAT', 'IMAGE'];
  return (chatTypes.includes(type1) && chatTypes.includes(type2)) || type1 === type2;
};

export const combineChatMessages = (messages: MessageBody[]): MessageBody[] => {
  if (messages.length === 0) return messages;

  // 모든 메시지의 last 속성을 false로 초기화
  messages.forEach((message) => {
    message.first = false;
    message.last = false;
  });

  // 첫 번째 메시지는 항상 first가 true
  messages[0].first = true;

  for (let i = 1; i < messages.length; i++) {
    if (
      messages[i].sender === messages[i - 1].sender &&
      isSameMessageGroup(messages[i].messageType, messages[i - 1].messageType)
    ) {
      messages[i].first = false;
    } else {
      messages[i].first = true;
      messages[i - 1].last = true; // 이전 메시지는 마지막 메시지로 설정
    }
  }

  // 마지막 메시지는 항상 last가 true
  messages[messages.length - 1].last = true;

  return messages;
};
