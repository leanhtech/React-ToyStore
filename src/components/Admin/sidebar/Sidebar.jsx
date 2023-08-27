import './sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Nav } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'>Admin Panel</span>
            </div>
            <hr />
            <div className='center'>
                <Nav className="flex-column">
                    <p className="title">MAIN MENU</p>
                    <Nav.Link href="/dashboard">
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </Nav.Link>
                    <p className="title">LISTS MENU</p>
                    <Nav.Link href="/users">
                        <GroupIcon className='icon' />
                        <span>Users</span>
                    </Nav.Link>
                    <Nav.Link href="/products">
                        <Inventory2Icon className='icon' />
                        <span>Products</span>
                    </Nav.Link>
                    <Nav.Link href="/orders">
                        <ProductionQuantityLimitsIcon className='icon' />
                        <span>Orders</span>
                    </Nav.Link>
                    <Nav.Link href="/delivery">
                        <LocalShippingIcon className='icon' />
                        <span>Delivery</span>
                    </Nav.Link>
                    <p className="title">ACCOUNT</p>
                    <Nav.Link href="/profile">
                        <PersonIcon className='icon' />
                        <span>Profile</span>
                    </Nav.Link>
                    <Nav.Link href="/logout">
                        <ExitToAppIcon className='icon' />
                        <span>Logout</span>
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar