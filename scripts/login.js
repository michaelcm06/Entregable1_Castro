var users = [{
    username: "usuario1",
    password: "123"
  },
  {
    username: "usuario2",
    password: "456"
  },
  {
    username: "usuario3",
    password: "789"
  }
];

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var user = users.find(function (user) {
    return user.username === username;
  });

  if (user && user.password === password) {
    alert("¡Inicio de sesión exitoso!");
  } else {
    alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
  }
}