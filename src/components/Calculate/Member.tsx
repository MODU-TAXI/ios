import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { UserPreview } from '@type/entity/user';

import SchoolBatchMain from '@assets/images/Common/School_Batch_Main.svg';
import BasicProfileGray from '@assets/images/Common/Basic_Profile_Gray.svg';
import SchoolBatchWhite from '@assets/images/Common/School_Batch_White.svg';
import BasicProfileWhite from '@assets/images/Common/Basic_Profile_White.svg';

interface MemberComponentProps {
  member: UserPreview;
  setUnParticipateMembers: React.Dispatch<React.SetStateAction<UserPreview[]>>;
}

const MemberComponent: React.FC<MemberComponentProps> = ({ member, setUnParticipateMembers }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(!isClicked);

    setUnParticipateMembers((prevMembers) => {
      if (isClicked) {
        // Remove member
        return prevMembers.filter((m) => m.memberId !== member.memberId);
      } else {
        // Add member
        return [...prevMembers, member];
      }
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`mt-4 flex-row items-center rounded-[8px] px-4 py-3 ${isClicked ? 'border-[1px] border-main bg-main' : 'border-[1px] border-[#C3C3C3]'}`}
    >
      {isClicked ? (
        <>
          <BasicProfileWhite className="mr-1" />
          <Text className="mr-1 text-[16px] font-semibold tracking-tight text-white">
            {member.nickname}
          </Text>
          <SchoolBatchWhite />
        </>
      ) : (
        <>
          <BasicProfileGray className="mr-1" />
          <Text className="mr-1 text-[16px] font-medium tracking-tight text-[#3E3E3E]">
            {member.nickname}
          </Text>
          <SchoolBatchMain />
        </>
      )}
    </Pressable>
  );
};

export default MemberComponent;
