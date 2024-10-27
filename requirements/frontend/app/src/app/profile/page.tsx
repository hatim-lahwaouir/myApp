import { cookies } from 'next/headers'


 function Profile() {
    
    const cookieStore = cookies();
    const userInfoCookie = cookieStore.get("userInfo")

    const userInfo =  JSON.parse(userInfoCookie.value);
    console.log(userInfo);
    
    return (
        <div className="bg-[#0F0F0F] w-full h-screen text-white">
        <h1> Hello From {userInfo?.username}, I'm authenticated !! </h1>
    
        </div>
    );
  }
  
  
  
  export default Profile;