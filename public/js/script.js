var socket = io.connect('127.0.0.1:8080');

$(document).ready(function(){
    $('#send_ansver').on('click', function(){
        console.log($('input[name="ansver"]').val());
        socket.emit('ansver', $('input[name="ansver"]').val());
    });
});

socket.on('show_equation', function(equation, score){
    $('#equation').text(equation);
    $('#score').text(score);
    $('input[name="ansver"]').val('');
    $('input[name="ansver"]').focus();
});