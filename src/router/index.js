import { Route, Routes } from "react-router-dom";
import LandingPage from "../modules/auth/index";
import LoginPage from "../modules/auth/login";
import RegisterPage from "../modules/auth/register";
import { UserDashboard, HomeSetting } from "../modules/user";
import  Admin  from "../modules/admin/index";

import Content from "../shared/components/layout/body/content"

function Router() {
	
  return (
    <Content>
      <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>


          <Route path="/dashboard" element={<UserDashboard/>}></Route>
          <Route path="/home/setting" element={<HomeSetting/>}></Route>
          <Route path="/home/device/setting" element={<HomeSetting/>}></Route>
          <Route path="/home/access/setting" element={<HomeSetting/>}></Route>



          <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </Content>
  );
}

export default Router;
