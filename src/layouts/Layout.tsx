import { Outlet } from "react-router-dom";
import Login from "../components/LoginComponent";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/navigation/Navigation";

export default function (){
    return(
        <div>
            <Navigation />
            <Sidebar/>
            <Outlet/>
            {/* <h1>Footer</h1> */}
        </div>
    );
}