var socket= io();

var bewegung = {
    hoch: false,
    runter: false,
};


//erkennt Tastendruck
document.addEventListener('keydown', function(event){
    switch(event.keyCode){

    case 87: // für Taste "W"
      bewegung.hoch = true;
      break;
    case 83: // für Taste "S"
      bewegung.runter = true;
      break;

    }
});

// erkennt wenn Taste wieder losgelassen wird
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {

      case 87: // W
        bewegung.hoch = false;
        break;

      case 83: // S
        bewegung.runter = false;
        break;
    }
  });

// Sendet an den Server
socket.emit('neuer Spieler');
socket.emit("startBall");
    // Schleife, um die ständig die SpielerBewegung zu übertragen
    setInterval(function() {
    socket.emit('bewegungSpieler', bewegung);
     socket.emit("bewegungBall");
    }, 1000 / 60);

   


    var canvas = document.getElementById('canvas');
    canvas.width = 600;
    canvas.height = 500;

    // getContext('2d') ermöglicht das zweidimensionale zeichnen
    var ctx = canvas.getContext('2d');

    // Empfangen von Nachrichten mit einem bestimmten Namen
    socket.on('status', function(Spieler, ball){
        ctx.clearRect(0, 0, 600, 500);
        ctx.fillStyle = 'black';
        for (var id in Spieler){
            var player = Spieler[id];
            ctx.beginPath();
            ctx.rect(player.x, player.y, 5, 60)
            ctx.rect(ball.x, ball.y, 15, 15)
            ctx.fill();
        }

       });
