import { HOST , PORT} from "../config"



const url = `http://${HOST}:${PORT}/api/`





const GameAthentication = async () =>{

    const token = localStorage.getItem("access");
    const response = await fetch(`${url}game/get_uuid/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    const result = await response.json()

    console.log(result?.uuid);
    if (result?.uuid){
      return (result?.uuid);
    }
    

    return '';
  }




export {GameAthentication};