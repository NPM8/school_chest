/*
    obsługa komunikację Ajax - serwer
*/

class Net {

    constructor(props) {

    }

    async sendData(data) {
        let ala;
        await $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success: (data) => {
                let tmp = JSON.parse(data);
                console.log(tmp);
                ala = tmp;
            }
        });
        return ala;
    }
    async sendDataWait() {
        let ala;
        await $.ajax({
            type: "POST",
            url: "/api/is_logged",
            data: "",
            success: (data) => {
                let tmp = JSON.parse(data);
                console.log(tmp);
                ala = tmp;
            }
        });
        return ala;
    }
    async requestMyTurn(data) {
        let ala;
        await $.ajax({
            type: 'POST',
            url: '/api/is_my_turn',
            data: data,
            success: (data) => {
                let tmp = JSON.parse(data);
                console.log(tmp);
                ala=tmp;
            }
        });
        return ala
    }

    async sendDataChange(change) {
        let ala;
        await $.ajax({
            type: 'POST',
            url: '/api/move',
            data: change,
            success: (data) => {
                let tmp = JSON.parse(data);
                console.log(tmp);
                ala=tmp;
            }
        });
        return true;
    }
}