import { Route, Routes } from "react-router-dom";
import { UserDashboard } from "../modules/user";
import  Admin  from "../modules/admin/index";

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
          <Route path="/admin" element={<Admin/>}></Route>


          {/* <Route path="/admin/device-management" element={<Admin/>}></Route>
          <Route path="/admin/home-management" element={<Admin/>}></Route>
          <Route path="/admin/user-management" element={<Admin/>}></Route> */}
      </Routes>
    </Layout>
  );
}

export default Router;
