import "./AdminPage.css"

import Chart from './chart/Chart'
import Feature from './feature/Feature'
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import Widget from "./widget/Widget"

const AdminPage = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <div className='widgets'>
                    <Widget type='users' />
                    <Widget type='orders' />
                    <Widget type='earnings' />
                    <Widget type='balance' />
                </div>
                {/* <div className="charts">
                    <Feature />
                    <Chart />
                </div> */}
            </div>
        </div>
    )
}

export default AdminPage