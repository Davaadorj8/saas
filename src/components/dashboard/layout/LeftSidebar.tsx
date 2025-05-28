// src/components/dashboard/layout/LeftSidebar.tsx
import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Tenant } from '@prisma/client'; 
import { NavItem, DashboardCard } from '../types';


interface LeftSidebarProps {
  tenant: Tenant;
  isExpanded: boolean;
  onToggle: () => void;
  navItems: NavItem[];
  activeSection: string;
  onNavClick: (title: string) => void;
  minimizedCards: Array<string | number>;
  dashboardCards: DashboardCard[]; // Needed for getCardById
  onRestoreCard: (cardId: string | number) => void;
  footerContent?: ReactNode;
}

export default function LeftSidebar({
  tenant,
  isExpanded,
  onToggle,
  navItems,
  activeSection,
  onNavClick,
  minimizedCards,
  dashboardCards,
  onRestoreCard,
  footerContent,
}: LeftSidebarProps) {

  const getCardById = (cardId: string | number) => dashboardCards.find(c => c.id === cardId);

  return (
    <div className={`bg-sidebar text-sidebar-foreground flex flex-col ${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg z-30`}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
        {isExpanded && <span className="font-semibold text-lg truncate" title={tenant.name}>{tenant.name}</span>}
        <button onClick={onToggle} className="p-1 rounded hover:bg-sidebar-hover text-sidebar-foreground">
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.title}
            title={item.title}
            className={`flex items-center w-full p-3 text-sm transition-colors ${
              activeSection === item.title
                ? 'bg-sidebar-active text-white'
                : 'hover:bg-sidebar-hover hover:text-sidebar-foreground-hover'
            }`}
            onClick={() => onNavClick(item.title)}
          >
            {item.icon}
            {isExpanded && <span className="ml-3 truncate">{item.title}</span>}
          </button>
        ))}
      </nav>

      {dashboardCards.length > 0 && minimizedCards.length > 0 && (
        <div className="border-t border-sidebar-border p-2">
          {isExpanded && <h4 className="text-xs font-medium text-sidebar-muted-foreground mb-1 px-1">Minimized</h4>}
          <div className={`flex ${isExpanded ? 'flex-wrap gap-1' : 'flex-col items-center gap-1'}`}>
            {minimizedCards.map(cardId => {
              const card = getCardById(cardId);
              return card ? (
                <button
                  key={cardId}
                  onClick={() => onRestoreCard(cardId)}
                  title={`Restore ${card.title}`}
                  className="bg-gray-700 text-xs p-1.5 rounded flex items-center text-white hover:bg-gray-600 w-full sm:w-auto justify-center truncate"
                >
                  {isExpanded ? card.title : card.title.charAt(0).toUpperCase()}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}
      {footerContent && <div className="border-t border-sidebar-border">{footerContent}</div>}
    </div>
  );
}