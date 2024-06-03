import React from 'react';
import { View, Text } from 'react-native';

import MemberComponent from './Member';

import { UserPreview } from '@type/entity/user';

interface MembersComponentProps {
  members: UserPreview[];
  setUnParticipateMembers: React.Dispatch<React.SetStateAction<UserPreview[]>>;
}

const MembersComponent: React.FC<MembersComponentProps> = ({
  members,
  setUnParticipateMembers,
}) => {
  return (
    <View className="flex-col px-3">
      {members.map((member) => (
        <MemberComponent
          key={member.memberId}
          member={member}
          setUnParticipateMembers={setUnParticipateMembers}
        />
      ))}
    </View>
  );
};

export default MembersComponent;
