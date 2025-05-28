// To make ManyChatControlQuickBoardPlugin runnable:
/// src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx
import React, { useState } from 'react';
// The path below should be correct if your services file is at src/modules/user/services/services.ts
// PLEASE VERIFY THIS PATH MATCHES YOUR ACTUAL FILE STRUCTURE
import { fetchUserCount } from '../../../../modules/user/services'; 

interface UserCountQuickBoardPluginProps {
  showCustomModal?: (content: React.ReactNode, title?: string) => void;
}

const UserCountQuickBoardPlugin: React.FC<UserCountQuickBoardPluginProps> = ({ showCustomModal }) => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchClick = async () => {
    setIsLoading(true);
    setError(null);
    setUserCount(null);
    try {
      const count = await fetchUserCount();
      setUserCount(count);
    } catch (err) {
      console.error('Error fetching user count:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user count.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchClick} disabled={isLoading} style={{ marginBottom: '10px' }}>
        {isLoading ? 'Fetching...' : 'Fetch User Count'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {userCount !== null && <p>User Count: <strong>{userCount}</strong></p>}
      {!isLoading && userCount === null && !error && <p>Click the button to fetch count.</p>}
    </div>
  );
};

export default UserCountQuickBoardPlugin;