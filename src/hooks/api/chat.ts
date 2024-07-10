import { useRecoilState } from 'recoil';
import { useSuspenseQuery, useSuspenseQueries } from '@tanstack/react-query';

import { MessageBody } from '@recoil/type';
import { memberIdState } from '@recoil/recoil';

import { getRoomPreview } from '@server/api/room';
import { getMyChatInfo, getChatMessages } from '@server/api/chat';

import { combineChatMessages } from '@utils/chat';

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

// 채팅방 세부정보 다 가져오기
export const useChatDetail = (roomId: number, readonly: boolean) => {
  return useSuspenseQueries({
    queries: [
      {
        retry: 1,
        queryKey: [`/api/rooms/preview/${roomId}`],
        queryFn: () => {
          if (!readonly) {
            return getRoomPreview(roomId);
          }
          return null;
        },
      },
      {
        retry: 1,
        queryKey: [`/api/chat-messages/${roomId}`],
        queryFn: () => getChatMessages(roomId),
      },
    ],
    combine: (results) => {
      return {
        roomPreview: readonly ? null : results[0].data,
        roomPreviewRefetch: results[0].refetch,
        messages: combineChatMessages(results[1].data.messages),
        messagesRefetch: results[1].refetch,
      };
    },
  });
};

// 채팅 가져오기
export const useGetMessages = (roomId: number) => {
  const { data: messages, isPending } = useSuspenseQuery({
    queryKey: [`/api/chat-messages/${roomId}`],
    queryFn: () => getChatMessages(roomId),
  });

  return { messages, isPending };
};
