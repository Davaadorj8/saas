//src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx
//QuickBoard UI Plugin - This React component will provide the button and call the core logic.
// src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx
import React, { useState } from 'react';
import { manyChatControl } from '../../../../modules/marketing/plugins/ManyChatControlPlugin';

// Define props type
interface ManyChatControlQuickBoardPluginProps {
  showCustomModal?: (content: React.ReactNode, title?: string) => void;
}

const ManyChatControlQuickBoardPlugin: React.FC<ManyChatControlQuickBoardPluginProps> = ({ showCustomModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [subscriberId, setSubscriberId] = useState<string>('test_subscriber_123'); // Default for testing
  const [messageText, setMessageText] = useState<string>('Hello from QuickBoard!'); // Default
  const [tagName, setTagName] = useState<string>('quickboard_test_tag'); // Default

  const handleSendMessage = async () => {
    if (!subscriberId || !messageText) {
      setError("Subscriber ID and Message Text are required.");
      return;
    }
    setIsLoading(true);
    setResponseMessage(null);
    setError(null);
    try {
      const response = await manyChatControl.sendMessage(subscriberId, messageText);
      if (response.success) {
        setResponseMessage(response.message);
        // Optionally use showCustomModal for success
        // if (showCustomModal) showCustomModal(<p>{response.message}</p>, "Message Sent");
      } else {
        setError(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while sending message.';
      setError(errorMessage);
      if (showCustomModal) showCustomModal(<p style={{color: 'red'}}>{errorMessage}</p>, "Send Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagSubscriber = async () => {
    if (!subscriberId || !tagName) {
      setError("Subscriber ID and Tag Name are required.");
      return;
    }
    setIsLoading(true);
    setResponseMessage(null);
    setError(null);
    try {
      const response = await manyChatControl.tagSubscriber(subscriberId, tagName);
      if (response.success) {
        setResponseMessage(response.message);
      } else {
        setError(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while tagging subscriber.';
      setError(errorMessage);
      if (showCustomModal) showCustomModal(<p style={{color: 'red'}}>{errorMessage}</p>, "Tagging Error");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    marginRight: '10px',
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: 'calc(50% - 15px)'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 15px',
    marginRight: '10px',
    cursor: 'pointer',
  }

  return (
    // The main title is handled by QuickBoardComponent
    <div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="mc_subscriberId" style={{ marginRight: '5px', display: 'block', marginBottom:'5px' }}>Subscriber ID:</label>
        <input
          id="mc_subscriberId"
          type="text"
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
          placeholder="Enter Subscriber ID"
          style={{...inputStyle, width: 'calc(100% - 20px)'}}
        />
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginBottom: '15px' }}>
        <h5 style={{marginTop: 0, marginBottom: '10px'}}>Send Message</h5>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Message text"
          style={inputStyle}
        />
        <button onClick={handleSendMessage} disabled={isLoading || !subscriberId || !messageText} style={buttonStyle}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px',  marginBottom: '5px' }}>
        <h5 style={{marginTop: 0, marginBottom: '10px'}}>Tag Subscriber</h5>
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Tag name"
          style={inputStyle}
        />
        <button onClick={handleTagSubscriber} disabled={isLoading || !subscriberId || !tagName} style={buttonStyle}>
          {isLoading ? 'Tagging...' : 'Apply Tag'}
        </button>
      </div>

      {responseMessage && <p style={{ color: 'green', marginTop: '10px' }}>{responseMessage}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
    </div>
  );
};

export default ManyChatControlQuickBoardPlugin;