import React from 'react';

import AfterPayStatusBar from '@assets/images/Chat/AfterPayStatusBar.svg';
import BeforePayStatusBar from '@assets/images/Chat/BeforePayStatusBar.svg';
import AfterMatchStatusBar from '@assets/images/Chat/AfterMatchStatusBar.svg';
import BeforeMatchStatusBar from '@assets/images/Chat/BeforeMatchStatusBar.svg';

interface DisplayStatusBarComponentProps {
  roomStatus: string | undefined;
}

const DisplayStatusBarComponent: React.FC<DisplayStatusBarComponentProps> = ({ roomStatus }) => {
  if (roomStatus === 'BEFORE_MATCHING') {
    return <BeforeMatchStatusBar />;
  } else if (roomStatus === 'AFTER_MATCHING') {
    return <AfterMatchStatusBar />;
  } else if (roomStatus === 'BEFORE_PAYMENT') {
    return <BeforePayStatusBar />;
  } else if (roomStatus === 'AFTER_PAYMENT') {
    return <AfterPayStatusBar />;
  } else {
    return <AfterPayStatusBar />;
  }
};

export default React.memo(DisplayStatusBarComponent);
