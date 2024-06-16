import React from 'react';
import { View, Text } from 'react-native';

import ParticipateMemberComponent from '@components/Calculate/ParticipateMember';

import { UserPreview } from '@type/entity/user';

interface ParticipateMembersComponentProps {
  participateMembers: UserPreview[];
  price: number;
  exceptUser: (member: UserPreview) => void;
}

const ParticipateMembersComponent: React.FC<ParticipateMembersComponentProps> = ({
  participateMembers,
  price,
  exceptUser,
}) => {
  return (
    <View>
      <Text className="text-[18px] font-medium tracking-tight text-[#1F1F1F]">정산 멤버</Text>

      {participateMembers.map((participateMember, index) => (
        <ParticipateMemberComponent
          key={index}
          participateMember={participateMember}
          price={price}
          exceptUser={exceptUser}
        />
      ))}
    </View>
  );
};

export default ParticipateMembersComponent;
