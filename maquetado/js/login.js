document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;
        
        if (username == 'admin' && password == '1234') {
            window.location.href = '../html/recomendacionPrincipal.html';
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
        }
    });
});

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }