import React from 'react';
import { View } from 'react-native';

import PaymentMemberComponent from './PaymentMember';

import { PaymentUser } from '@type/entity/user';

interface PaymentMembersComponentProps {
  paymentMembers: PaymentUser[];
  price: number;
}

const PaymentMembersComponent: React.FC<PaymentMembersComponentProps> = ({
  paymentMembers,
  price,
}) => {
  return (
    <View className="grow">
      {paymentMembers.map((paymentMember, index) => (
        <PaymentMemberComponent key={index} paymentMember={paymentMember} price={price} />
      ))}
    </View>
  );
};

export default PaymentMembersComponent;
