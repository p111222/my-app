import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RealTimeData = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);

  const { lastMessage } = useWebSocket('ws://13.200.189.76:5001/ws/updates');  // Update with your backend WebSocket URL
  // const { lastMessage } = useWebSocket('ws://localhost:8080/ws/updates');  // Update with your backend WebSocket URL

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
    <div style={{ textAlign: 'center' }}>
      <h1>Real-Time Data</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {data && data.map((item, index) => (
          <Card
            sx={{
              width: 300, // Fixed width for each card
              margin: '10px'
            }}
            key={index}
          >
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                Users Details
              </Typography>
              <hr />
              <Typography variant="body2" component="div">
                Id: {item.id}
              </Typography>
              <Typography variant="body2">
                Username: {item.data}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealTimeData;
