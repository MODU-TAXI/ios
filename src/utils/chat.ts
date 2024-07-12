import { MessageBody } from '@recoil/type';

const isSameMessageGroup = (type1: string, type2: string): boolean => {
  const chatTypes = ['CHAT', 'IMAGE'];
  return (chatTypes.includes(type1) && chatTypes.includes(type2)) || type1 === type2;
};

const isSameMinute = (dateTime1: Date, dateTime2: Date): boolean => {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
};

export const combineChatMessages = (messages: MessageBody[]): MessageBody[] => {
  if (messages.length === 0) return messages;

  messages.forEach((message) => {
    message.first = false;
    message.last = false;
  });

  messages[0].first = true;

  for (let i = 1; i < messages.length; i++) {
    if (
      messages[i].sender === messages[i - 1].sender &&
      isSameMessageGroup(messages[i].messageType, messages[i - 1].messageType) &&
      isSameMinute(messages[i].dateTime, messages[i - 1].dateTime)
    ) {
      messages[i].first = false;
    } else {
      messages[i].first = true;
      messages[i - 1].last = true;
    }
  }

  messages[messages.length - 1].last = true;

  return messages;
};
