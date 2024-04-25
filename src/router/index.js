import { Route, Routes } from "react-router-dom";
import { UserDashboard, UserHomeSetting, UserHomeMember} from "../modules/user";
import  Admin  from "../modules/admin/index";
import AdminSummary from '../modules/admin/module/Dashboard'
import AdminUserManagement from '../modules/admin/module/UserManagement'
import AdminDeviceManagement from '../modules/admin/module/DeviceManagement'
import AdminHomeManagement from '../modules/admin/module/HomeManagement'
import AdminHomeEdit from '../modules/admin/module/EditHomeComponent'
import UserSettings from "../modules/auth/Settings"
import AuthPage from "../modules/auth/index";

import Layout from "../shared/layout"

function Router() {
	
  return (
    <Layout>
      <Routes>
          {/**Auth page Login/Register */}
          <Route path="/" element={<AuthPage/>}></Route>

          {/** User pages */}
          <Route path="/dashboard" element={<UserDashboard/>}></Route>
          <Route path="/dashboard/home-setting" element={<UserHomeSetting/>}></Route>
          <Route path="/home/member" element={<UserHomeMember/>}></Route>

          <Route path="/admin" element={<AdminSummary/>}></Route>
          <Route path="/admin/summary" element={<AdminSummary/>}></Route>
          <Route path="/admin/user" element={<AdminUserManagement/>}></Route>
          <Route path="/admin/device" element={<AdminDeviceManagement/>}></Route>
          <Route path="/admin/home" element={<AdminHomeManagement/>}></Route>
          <Route path="/admin/home/edit" element={<AdminHomeEdit/>}></Route>

          <Route path="/settings" element={<UserSettings/>}/>


          {/* <Route path="/admin/device-management" element={<Admin/>}></Route>
          <Route path="/admin/home-management" element={<Admin/>}></Route>
          <Route path="/admin/user-management" element={<Admin/>}></Route> */}
      </Routes>
    </Layout>
  );
}

export default Router;
