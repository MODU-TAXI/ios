import React from 'react';
import { View, Text } from 'react-native';

import UnParticipateMemberComponent from '@components/Calculate/UnParticipateMember';

import { UserPreview } from '@type/entity/user';

interface UnParticipateMembersComponentProps {
  unParticipateMembers: UserPreview[];
  price: number;
  addUser: (member: UserPreview) => void;
}

const UnParticipateMembersComponent: React.FC<UnParticipateMembersComponentProps> = ({
  unParticipateMembers,
  price,
  addUser,
}) => {
  return (
    <View className="mt-10 flex-1">
      <Text className="text-[18px] font-medium tracking-tight text-[#1F1F1F]">
        정산 멤버 미포함
      </Text>

      {unParticipateMembers.map((unParticipateMember, index) => (
        <UnParticipateMemberComponent
          key={index}
          unParticipateMember={unParticipateMember}
          price={price}
          addUser={addUser}
        />
      ))}
    </View>
  );
};

export default UnParticipateMembersComponent;
