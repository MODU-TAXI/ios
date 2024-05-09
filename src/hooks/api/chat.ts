import { useRecoilState } from 'recoil';
import { useSuspenseQuery } from '@tanstack/react-query';

import { memberIdState } from '@recoil/recoil';

import { getMyChatInfo, getChatMessages } from '@server/api/chat';

// 내가 참여하고 있는 채팅방 정보 가져오기
export const useGetMyInfo = () => {
  const [, setMemberId] = useRecoilState(memberIdState);

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['/chat-info'],
    queryFn: () => getMyChatInfo(),
  });

  setMemberId(data.memberId);

  return { data, isLoading };
};

// 채팅 가져오기
export const useGetMessages = (roomId: number) => {
  const { data: messages, isLoading } = useSuspenseQuery({
    queryKey: [`/api/chat-messages/${roomId}`],
    queryFn: () => getChatMessages(roomId),
  });

  return { messages, isLoading };
};
