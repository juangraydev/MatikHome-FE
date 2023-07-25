
import { useEffect } from "react";
import Router from "./router/index"
import jwtDecode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { successUserData } from "./modules/auth/store/actionCreators"

function App() {
	const dispatch = useDispatch()
  
  const handleCallbackREsponse = (response) => {
    dispatch(successUserData(response.credential));
  }

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackREsponse
    })
    google.accounts.id.prompt();
  }, [])
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
