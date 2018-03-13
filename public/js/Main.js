var game;
var net;
var ui;
$(document).ready(function () {
      game = new Game({width: $("#root").width(), height:  $("#root").height()})
      net = new Net();
      ui = new Ui();
      $("#login").click((e) => ui.handleNameAdd(e))
      $("#reset").click((e) => ui.handleNameAdd(e))
});