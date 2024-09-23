// import React from 'react'
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
// import { styled, useTheme } from '@mui/material/styles';
// import RealTimeData from '../components/RealTimeData';
// import TabularView from '../components/TabularView';
// import Divider from '@mui/material/Divider';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//     }),
// }));

// const AppLayout = () => {
//     const [open, setOpen] = React.useState(false);
//     const location = useLocation();

//     const toggleDrawer = (newOpen) => () => {
//         setOpen(newOpen);
//     };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ mr: 2 }}
//                         onClick={toggleDrawer(true)}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                         Real Time Data
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,

//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                         background: 'linear-gradient(110deg, rgba(62,83,122,1) 10%, rgba(38,45,63,1) 58%)'

//                     },
//                 }}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//             >
//                 <div className='flex justify-between items-center p-3'>
//                     <div className="flex items-center gap-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
//                         </svg>
//                         <p className='font-bold text-white'>Menu</p>
//                     </div>
//                     <IconButton className='text-white' onClick={toggleDrawer}>
//                        <ChevronLeftIcon className='text-dark' />
//                     </IconButton>
//                 </div>
//                 <Divider />
//                 <List>
//                     <ListItem disablePadding>
//                         <ListItemButton
//                             selected={location.pathname === '/components/cardview'}
//                             onClick={RealTimeData}
//                             sx={{
//                                 "&:hover": { backgroundColor: "#596876", color: "#161245" },
//                                 "&.Mui-selected": { backgroundColor: "#596876", color: "#161245" }
//                             }}>
//                             <ListItemIcon>
//                                 <DashboardIcon className='text-white' />
//                             </ListItemIcon>
//                             <ListItemText className='text-white' primary='Card View' />
//                         </ListItemButton>
//                     </ListItem>
//                     <ListItem disablePadding>
//                         <ListItemButton
//                             selected={location.pathname === '/components/tabularview'}
//                             onClick={TabularView}
//                             sx={{
//                                 "&:hover": { backgroundColor: "#596876", color: "#161245" },
//                                 "&.Mui-selected": { backgroundColor: "#596876", color: "#161245" }
//                             }}>
//                             <ListItemIcon>
//                                 <GroupIcon className='text-white' />
//                             </ListItemIcon>
//                             <ListItemText className='text-white' primary='Tabular View' />
//                         </ListItemButton>
//                     </ListItem>
//                 </List>
//             </Drawer>
//             <Main open={open} style={{ minHeight: '100vh' }}>
//                 {/* <DrawerHeader /> */}
//                 <Outlet />
//             </Main>
//         </Box>
//     )
// }

// export default AppLayout