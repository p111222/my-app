// import React, { useEffect, useState } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import useWebSocket from 'react-use-websocket';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import moment from 'moment';

// const TabularView = () => {
//   const queryClient = useQueryClient();
//   const [data, setData] = useState([]);

//   // const { lastMessage } = useWebSocket('ws://localhost:8080/ws/updates');
//   const { lastMessage } = useWebSocket('ws://3.108.54.64:8347/ws/updates');

//   useEffect(() => {
//     if (lastMessage !== null) {
//       try {
//         const newData = JSON.parse(lastMessage.data);
//         console.log('New WebSocket data:', newData);

//         if (Array.isArray(newData)) {
//           setData(newData);
//         } else if (newData && newData.id) {
//           setData((prevData) => {
//             if (newData.data) {
//               const updatedData = prevData.filter(item => item.id !== newData.id);
//               return [newData, ...updatedData]; 
//             } else {
//               return prevData.filter(item => item.id !== newData.id);
//             }
//           });
//         } else {
//           console.error('Invalid data received from WebSocket:', newData);
//         }
//       } catch (e) {
//         console.error('Failed to parse WebSocket JSON data:', e);
//       }
//     }
//   }, [lastMessage, queryClient]);

//   return (
//     <div>
//       {/* <h1 style={{marginLeft: '520px'}}>Tabular View</h1> */}
//       <TableContainer component={Paper} sx={{ maxWidth: 850,marginLeft: '150px' }}>
//         <Table sx={{ minWidth: 200 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{fontWeight: 'bold'}}>Timestamp</TableCell>
//               <TableCell align="right" sx={{fontWeight: 'bold'}}>Information</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={2} align="center">
//                   No data available
//                 </TableCell>
//               </TableRow>
//             ) : (
//               data.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     {moment(item.lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}
//                   </TableCell>
//                   <TableCell align="right">{item.data}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default TabularView;



import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import moment from 'moment';

const RealTimeTable = () => {
  const [data, setData] = useState([]);
  const socketUrl = 'ws://3.108.54.64:8347/ws/updates';

  const { lastMessage, sendMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true, // Reconnect automatically
    reconnectAttempts: 10,                 // Retry up to 10 times
    reconnectInterval: 3000,               // 3 seconds between reconnections
  });

  // Ping the server every 30 seconds to keep WebSocket connection alive
  useEffect(() => {
    const pingInterval = setInterval(() => {
      if (readyState === ReadyState.OPEN) {
        sendMessage(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Ping every 30 seconds

    return () => clearInterval(pingInterval); // Clear interval on component unmount
  }, [readyState, sendMessage]);

  // WebSocket data handler
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const newData = JSON.parse(lastMessage.data);
        console.log('New WebSocket data:', newData);

        // Handle incomingx data
        if (Array.isArray(newData)) {
          setData(newData);
        } else if (newData && newData.id) {
          setData((prevData) => {
            // const updatedData = prevData.filter(item => item.id !== newData.id);
            // return [newData, ...updatedData];
            if (newData.data) {
              const updatedData = prevData.filter(item => item.id !== newData.id);
              return [newData, ...updatedData];
            } else {
              return prevData.filter(item => item.id !== newData.id);
            }
          });
        } else {
          // return prevData.filter(item => item.id !== newData.id);
          // console.error('Invalid data received from WebSocket:', newData);
        }
      } catch (e) {
        console.error('Failed to parse WebSocket JSON data:', e);
      }
    }
  }, [lastMessage]);

  // Handle page visibility changes to keep WebSocket alive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page is visible. WebSocket connection state:', readyState);
      } else {
        console.log('Page is hidden. WebSocket is still maintained.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [readyState]);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 850, marginLeft: '150px' }}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Timestamp</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Information</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {moment(item.lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
                <TableCell align="right">{item.data}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RealTimeTable;
