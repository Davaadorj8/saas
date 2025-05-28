// src/components/dashboard/layout/PinnedCardsBar.tsx
import { Pin, X } from 'lucide-react';
import { DashboardCard } from '../types';

interface PinnedCardsBarProps {
  pinnedCards: Array<string | number>;
  dashboardCards: DashboardCard[]; // To find card details by ID
  onTogglePin: (cardId: string | number) => void;
}

export default function PinnedCardsBar({ pinnedCards, dashboardCards, onTogglePin }: PinnedCardsBarProps) {
  if (pinnedCards.length === 0) return null;

  const getCardById = (cardId: string | number) => dashboardCards.find(c => c.id === cardId);

  return (
    <div className="bg-gray-50 px-4 py-2 flex gap-3 overflow-x-auto border-b items-center custom-scrollbar">
      <Pin size={14} className="text-indigo-500 mr-1 flex-shrink-0" />
      {pinnedCards.map(cardId => {
        const card = getCardById(cardId);
        return card ? (
          <div key={cardId} className="flex-shrink-0 items-center px-3 py-1.5 bg-white rounded-md shadow-sm border text-sm">
            <span className="font-medium text-gray-700">{card.title}</span>
            <button
              onClick={() => onTogglePin(cardId)}
              className="ml-2 text-gray-400 hover:text-red-500"
              title={`Unpin ${card.title}`}
            >
              <X size={14} />
            </button>
          </div>
        ) : null;
      })}
    </div>
  );
}