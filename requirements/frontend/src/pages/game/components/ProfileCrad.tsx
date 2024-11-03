const ProfileCard = () => {
    
    const UserObject = localStorage.getItem("userInfo") 
    let res;
    if (UserObject){
        res = JSON.parse(UserObject);
    }

    return <div className="flex flex-col mt-10 items-center  ">
        <span className="w-20 h-20 bg-black rounded-full">  </span>
        <span className="text-stone-500 text-sm mt-4" > @{res?.username} </span>
    </div>
}



export default ProfileCard;