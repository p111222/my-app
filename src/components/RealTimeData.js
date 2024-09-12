import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';

const RealTimeData = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);

  const { lastMessage } = useWebSocket('ws://13.200.189.76:5001/ws/updates');  // Update with your backend WebSocket URL

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const newData = JSON.parse(lastMessage.data);

        queryClient.setQueryData(['realTimeData'], newData);

        // Update local state
        setData(newData);
      } catch (e) {
        console.error('Failed to parse JSON data:', e);
      }
    }
  }, [lastMessage, queryClient]);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <ul>
        {data && data.map((item, index) => (
          <li key={index}>{item.data}</li> // Replace with actual field
        ))}
      </ul>
    </div>
  );
};

export default RealTimeData;
