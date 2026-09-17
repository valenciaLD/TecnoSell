const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    let valido = true;

    // Limpiar errores
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validar correo
    if (email === "") {

        emailError.textContent = "El correo es obligatorio.";
        valido = false;

    } else if (!email.includes("@")) {

        emailError.textContent = "Ingresa un correo válido.";
        valido = false;
    }

    // Validar contraseña
    if (password === "") {

        passwordError.textContent = "La contraseña es obligatoria.";
        valido = false;

    } else if (password.length < 8) {

        passwordError.textContent =
            "La contraseña debe tener mínimo 8 caracteres.";

        valido = false;
    }

    // Si todo está correcto
    if (valido) {

        alert("Datos correctos");

        window.location.href = "dashboard.html";
    }

});