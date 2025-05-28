// To make ManyChatControlQuickBoardPlugin runnable:
// src/components/dashboard/quickboard/QuickBoardComponent.d.ts


// src/components/dashboard/quickboard/QuickBoardComponent.d.ts
import React from 'react';
import { QuickBoardPlugin } from './types';

type ShowCustomModalType = (content: React.ReactNode, title?: string) => void;

export interface QuickBoardComponentProps {
  showCustomModal: ShowCustomModalType;
  plugins: QuickBoardPlugin[];
  userRoles: string[];
}

// Declare the component's type and export it
declare const QuickBoardComponent: React.FC<QuickBoardComponentProps>;
export default QuickBoardComponent;