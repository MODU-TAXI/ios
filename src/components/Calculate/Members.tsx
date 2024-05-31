import React from 'react';
import { View, Text } from 'react-native';

import MemberComponent from './Member';

import { UserPreview } from '@type/entity/user';

interface MembersComponentProps {
  members: UserPreview[];
}

const MembersComponent: React.FC<MembersComponentProps> = ({ members }) => {
  return (
    <View className="flex-col px-3">
      {members.map((member) => (
        <MemberComponent member={member} />
      ))}
    </View>
  );
};

export default MembersComponent;
