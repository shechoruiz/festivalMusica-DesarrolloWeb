document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    // getBoundingClientRect() devuelve un objeto con la posición y dimensiones de un elemento en la pantalla = top: 0, left: 0, right: 0, bottom: 0
    if (sobreFestival.getBoundingClientRect().top < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
    <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
    <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/thumb/${i}.jpg"
      alt="Imagen galeria"
    />
    `;
    imagen.onclick = () => {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif" />
    <source srcset="build/img/grande/${id}.webp" type="image/webp" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/grande/${id}.jpg"
      alt="Imagen galeria"
    />
    `;

  // Crear overlay con la imagen
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = () => {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  // Boton para cerrar el modal
  const botonCerrar = document.createElement("P");
  botonCerrar.textContent = "X";
  botonCerrar.classList.add("btn-cerrar");
  overlay.appendChild(botonCerrar);
  botonCerrar.onclick = () => {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  // Añadir al HTML
  const body = document.querySelector("body");
  body.classList.add("fijar-body");
  body.appendChild(overlay);
}
