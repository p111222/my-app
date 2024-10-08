import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const RealTimeData = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState([]);

  // const { lastMessage } = useWebSocket('ws://localhost:8080/ws/updates');
  const { lastMessage } = useWebSocket('ws://3.108.54.64:8347/ws/updates');

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const newData = JSON.parse(lastMessage.data);
        console.log('New WebSocket data:', newData);

        if (Array.isArray(newData)) {
          setData(newData);
        } else if (newData && newData.id) {
          setData((prevData) => {
            if (newData.data) {
              const updatedData = prevData.filter(item => item.id !== newData.id);
              console.log("updatedData:", updatedData);

              return [newData, ...updatedData]; 
            } else {
              return prevData.filter(item => item.id !== newData.id);
            }
          });
        } else {
          console.error('Invalid data received from WebSocket:', newData);
        }
      } catch (e) {
        console.error('Failed to parse WebSocket JSON data:', e);
      }
    }
  }, [lastMessage, queryClient]);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* <h1 style={{marginLeft:'80px'}}>Card View</h1> */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {data.length === 0 ? (
          <Typography variant="body1">No data available</Typography>
        ) : (
          data.map((item) => (
            <Card
              sx={{
                width: 300, // Fixed width for each card
                margin: '10px'
              }}
              key={item.id}
            >
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  User Details
                </Typography>
                <hr />
                <Typography variant="body2" component="div" sx={{paddingBottom:'5px'}}> 
                  Id: {item.id}
                </Typography>
                <Typography variant="body2" sx={{paddingBottom:'5px'}}>
                  Username: {item.data}
                </Typography>
                <Typography variant="body2">
                  Last Updated: {moment(item.lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeData;
