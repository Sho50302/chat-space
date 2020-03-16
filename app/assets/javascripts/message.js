$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html =
        `<div class="main__body__text" data-message-id="${message.id}">
          <div class="main__body__text__messages">
            <div class="main__body__text__messages__name"> 
              ${message.user_name}
            </div>
            <div class="main__body__text__messages__update">
              ${message.created_at}
            </div>
          </div>
          <div class="main__body__text__message">
            <p class="main__body__text__message__content">
              ${message.content}
            </p>
          <img src="${message.image}" "class="main__body__message__image">
          </div>
        </div>`
    } else if (message.content) {
      var html =
        `<div class="main__body__text" data-message-id="${message.id}">
          <div class="main__body__text__messages">
            <div class="main__body__text__messages__name">
              ${message.user_name}
            </div>
            <div class="main__body__text__messages__update">
              ${message.created_at}
            </div>
          </div>
          <div class="main__body__text__message">
            <p class="main__body__text__message__content">
              ${message.content}
            </p>
          </div>
        </div>`
    } else if (message.image) {
      var html =
        `<div class="main__body__text" data-message-id="${message.id}">
          <div class="main__body__text__messages">
            <div class="main__body__text__messages__name">
              ${message.user_name}
            </div>
            <div class="main__body__text__messages__update">
              ${message.created_at}
            </div>
          </div>
          <img src="${message.image}" "class="main__body__message__image">
        </div>`
    };
    return html;
  };
  
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .always(function() {
      $('.new_message__btn').prop('disabled', false);
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main__body').append(html);
      $('.main__body').animate({ scrollTop: $('.main__body')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function() {
    var last_message_id = $('.main__body__text:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__body').append(insertHTML);
        $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight});
        }
    })
    .fail(function(){
      alert('error');
    });
  };
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 3000);
}
});