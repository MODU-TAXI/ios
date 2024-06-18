import React from 'react';
import { View } from 'react-native';

import HistoryMemberComponent from '@components/History/HistoryMember';

import { PaymentUser, UserPreview } from '@type/entity/user';

interface HistoryMembersComponentProps {
  historyMembers: PaymentUser[];
  openUserInfoModal: (member: UserPreview) => void;
  price: number;
}

const HistoryMembersComponent: React.FC<HistoryMembersComponentProps> = ({
  historyMembers,
  openUserInfoModal,
  price,
}) => {
  return (
    <View className="grow">
      {historyMembers.map((historyMember, index) => (
        <HistoryMemberComponent
          key={index}
          historyMember={historyMember}
          openUserInfoModal={openUserInfoModal}
          price={price}
        />
      ))}
    </View>
  );
};

export default HistoryMembersComponent;
