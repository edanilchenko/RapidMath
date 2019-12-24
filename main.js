const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080);


app.use(express.static('public'));

io.on('connection', function(socket){
    var score = 0;

    var temp = get_equation();

    var equation = temp[0];
    var ansver = temp[1];

    socket.emit('show_equation', equation, score);

    socket.on('ansver', function(value){
        if(value == ansver){
            score +=1;
        }
        else{
            score -= 1;
        }

        temp = get_equation();
        equation = temp[0];
        ansver = temp[1];
        socket.emit('show_equation', equation, score);
    });
});

function get_equation(){
    var a,b,sign,ansver;
    var text = '';
    a = Math.floor(Math.random() * 10);
    b = Math.floor(Math.random() * 10);
    sign = Math.floor(Math.random() * 4);

    text += a.toString();
    switch (sign) {
        case 1:
            ansver = a - b;
            text+= ' - ';
            break;
        case 2:
            ansver = a * b;
            text+= ' * ';
            break;
        case 3:
            ansver = a / b;
            text+= ' / ';
            break;
        default:
            ansver = a + b;
            text+= ' + ';
            break;
    }
    text += b.toString();
    text += '=';

    return [text, ansver];
}