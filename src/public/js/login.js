
$(document).ready(function() {
$('#login').on('submit', function(event) {
    event.preventDefault(); 

    const data = $(this).serializeArray().reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});

    console.log(data)

    $.ajax({
      url: '/api/sessions/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(response) {
        $('#message').text('La session se inicio correctamente');
      },
      error: function(xhr, status, error) {
        $('#message').text('Hubo un problema al intentar iniciar sesion');
        console.error('Error:', error);
      }
    });
  });
  
})

