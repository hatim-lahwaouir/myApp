import {GetUserInfo} from "../api/user";


 function Profile() {
    


    const userInfo =  GetUserInfo();
    
    return (
        <div className="bg-[#0F0F0F] w-full h-screen text-white">
        <h1> Hello From {userInfo?.username}, I'm authenticated !! </h1>
    
        </div>
    );
  }
  
  
  
  export default Profile;