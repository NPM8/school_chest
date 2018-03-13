
/*
    obsługa komunikację Ajax - serwer
*/

class Net {

    constructor (props) {

    }
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */
    async sendData  (data) {
        let ala;
        console.log("ala")
         await $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success: (data) => {
                let tmp = JSON.parse(data);
                // switch (tmp.res) {
                //     case "added":
                        
                //         break;
                //     case "tooManyUsers":
                //         break;
                //     case "userExist":
                        
                //         break;
                //     default:
                //          console.log(tmp.res)
                //         break;
                // }
                ala =  tmp.res;
            }

        })
        return ala
    }
}