let ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-adb4f204-7f7f-43f1-a4b6-04fd49ed9f58',
  subscribeKey: 'sub-c-dd4cca3e-257c-11e8-a8f3-22fca5d72012'
});

const getUsername = () => {
  const student = "Student";
  return student + Math.floor((Math.random() * 100) +1);
};


const appendMessage = (username, text) => {

  let message =
    $(`<div class="list-group-item" />`)
      .append($('<strong>').text(username + ': '))
      .append($('<span>').text(text));

  $('#log').append(message);
  $("#log").animate({ scrollTop: $('#log').prop("scrollHeight") }, "slow");
};

let me = ChatEngine.connect(getUsername());

ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    let chat = new ChatEngine.Chat('class-chat');

    chat.on('$.connected', (payload) => {
      appendMessage(me.uuid , 'Connected to chatroom!');
    });

    chat.on('message', (payload) => {
      appendMessage(payload.sender.uuid, payload.data.text);
    });

    $("#message").keypress(function(event) {
      if (event.which == 13) {
          chat.emit('message', {
                  text: $('#message').val()
          });
          $("#message").val('');
          event.preventDefault();
      }
    });

});