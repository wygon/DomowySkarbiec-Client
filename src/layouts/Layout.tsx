import { Outlet } from "react-router-dom";
import Login from "../components/LoginComponent";
import Sidebar from "../components/Sidebar";

export default function (){
    return(
        <div>
            <h1>Nawigacja</h1>
            {/* <Login /> */}
            <Sidebar/>
            <Outlet/>
            <h1>Footer</h1>
        </div>
    );
}