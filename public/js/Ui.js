/*
    UI - obsługa interfejsu użytkownika
*/

class Ui {
    constructor() {
        this.select = $("#ala");
        this.select.on("change", (e) => {
            this.handleSelectChange(e)
        })
        this.handleTurnCheck = this.handleTurnCheck.bind(this);
        this.name;
    }

    handleSelectChange(e) {
        let value = this.select.val(), val2;
        console.log(this.select)
        switch (value) {
            case "f":
                val2 = {x: 0, y: 200, z: 1000}
                break;
            case "b":
                val2 = {x: 0, y: 200, z: -1000}
                break;
        }
        game.position = val2;
    }

    async handleNameAdd(e) {
        let value = $("#name").val();
        this.name = value;
        let todo = await net.sendData({action: e.target.value, user: value});
        switch (todo.res) {
            case "added":
                $('#overlay').css("display", "none")
                $('#resoult').css("display", "block")
                $('#resoult').html("Grasz jako: " + value + ' grasz kolorem ' + todo.type);
                game.handlePlayerColor(todo.type);
                $('#wait').css("display", "block");
                this.tmpInterval = setInterval(async () => {
                    let tmp = await net.sendDataWait();
                    console.log(tmp);
                    if (tmp.res == "logged") {

                        clearInterval(this.tmpInterval);
                        this.handleTurnCheck();

                    }
                }, 500);
                break;
            case "tooManyUsers":
                $("#info").html("Max liczba graczy")
                break;
            case "userExist":
                $("#info").html("Gracz o nicku " + value + " już istnieje")
                break;
            default:
                console.log(todo)
                break;
        }
    }
    async   handleTurnCheck()
    {
        let tmpTurn = await net.requestMyTurn({name: this.name});
        if(tmpTurn.res) {
            console.log(tmpTurn.res);
            try {
                clearInterval(this.tmpInterval);
            } catch (e) {

            }
            $('#wait').css("display", "none");
            game.handleOponentMove(tmpTurn.lastMove);
            game.initRaycaster();
        } else {
            console.log(tmpTurn.res, "false");
            if ($('#wait').css("display") == "none" )
                $('#wait').css("display", "block");
            game.disableRaycaster();
            setTimeout(this.handleTurnCheck, 500);
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
