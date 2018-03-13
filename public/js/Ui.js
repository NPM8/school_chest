
/*
    UI - obsługa interfejsu użytkownika
*/

class Ui {
    constructor () {
        this.select = $("#ala");
        this.select.on("change", (e) => { this.handleSelectChange(e)})
    }

    handleSelectChange(e) {
        let value = this.select.val(), val2;
        console.log(this.select)
        switch(value) {
            case "f":
                val2 = {x: 0, y: 200, z: 1000 }
                break;
            case "b":
                val2 = {x: 0, y: 200, z: -1000 }
                break;
        }
        game.position = val2; 
    }

     async handleNameAdd(e) {
        let value = $("#name").val();
        let todo = await net.sendData({action: e.target.value, user: value});
        switch (todo) {
            case "added":
                $('#overlay').css("display", "none")
                $('#resoult').css("display", "block")
                $('#resoult').html("Grasz jako: " + value)
                break;
            case "tooManyUsers":
                $("#info").html("Max liczba graczy")
                break;
            case "userExist":
                $("#info").html("Gracz o nicku "+ value+ " już istnieje")
                break;
            default:
                console.log(todo)
                break;
        }
    }
    // $("#bt1").on("click", function () {
    //     game.setTest($("#txt1").val());
    // })

    // $("#bt2").on("click", function () {
    //     $("h1").html("pobieram zmienną test z klasy Game: " + game.getTest());
    // })

    // $("#bt3").on("click", function () {
    //     $("h1").html(net.sendData());
    // })
}
