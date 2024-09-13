import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RealTimeData from './components/RealTimeData';  // Adjust the import path as necessary

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <h1>My Application</h1> */}
        <RealTimeData />
        {/* Other components */}
      </div>
    </QueryClientProvider>
  );
}

export default App;


// import React, { useState, Suspense } from 'react';
// import './App.css';

// // Lazy load components
// const ComponentA = React.lazy(() => import('./components/ComponentA'));
// const ComponentB = React.lazy(() => import('./components/ComponentB'));

// function App() {
//   const [showComponentA, setShowComponentA] = useState(false);
//   const [showComponentB, setShowComponentB] = useState(false);

//   return (
//     <div className="App">
//       <h1>Lazy Loading Components Example</h1>
//       <div className="button-container">
//         <button onClick={() => setShowComponentA(!showComponentA)}>
//           {showComponentA ? 'Hide' : 'Show'} Component A
//         </button>
//         <button onClick={() => setShowComponentB(!showComponentB)}>
//           {showComponentB ? 'Hide' : 'Show'} Component B
//         </button>
//       </div>

//       {/* Suspense fallback while the component is loading */}
//       <div className="component-container">
//         {showComponentA && (
//           <Suspense fallback={<div>Loading Component A...</div>}>
//             <ComponentA />
//           </Suspense>
//         )}

//         {showComponentB && (
//           <Suspense fallback={<div>Loading Component B...</div>}>
//             <ComponentB />
//           </Suspense>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
