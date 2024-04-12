function iniciarApp(){navegacionFija(),crearGaleria(),scrollNav()}function scrollNav(){document.querySelectorAll(".navegacion-principal a").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();const n=e.target.attributes.href.value;document.querySelector(n).scrollIntoView({behavior:"smooth"})})})}function navegacionFija(){const e=document.querySelector(".header"),n=document.querySelector(".sobre-festival"),t=document.querySelector("body");window.addEventListener("scroll",(function(){n.getBoundingClientRect().top<0?(e.classList.add("fijo"),t.classList.add("body-scroll")):(e.classList.remove("fijo"),t.classList.remove("body-scroll"))}))}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let n=1;n<=12;n++){const t=document.createElement("picture");t.innerHTML=`\n    <source srcset="build/img/thumb/${n}.avif" type="image/avif" />\n    <source srcset="build/img/thumb/${n}.webp" type="image/webp" />\n    <img\n      loading="lazy"\n      width="200"\n      height="300"\n      src="build/img/thumb/${n}.jpg"\n      alt="Imagen galeria"\n    />\n    `,t.onclick=()=>{mostrarImagen(n)},e.appendChild(t)}}function mostrarImagen(e){const n=document.createElement("picture");n.innerHTML=`\n    <source srcset="build/img/grande/${e}.avif" type="image/avif" />\n    <source srcset="build/img/grande/${e}.webp" type="image/webp" />\n    <img\n      loading="lazy"\n      width="200"\n      height="300"\n      src="build/img/grande/${e}.jpg"\n      alt="Imagen galeria"\n    />\n    `;const t=document.createElement("div");t.appendChild(n),t.classList.add("overlay"),t.onclick=()=>{document.querySelector("body").classList.remove("fijar-body"),t.remove()};const i=document.createElement("P");i.textContent="X",i.classList.add("btn-cerrar"),t.appendChild(i),i.onclick=()=>{document.querySelector("body").classList.remove("fijar-body"),t.remove()};const a=document.querySelector("body");a.classList.add("fijar-body"),a.appendChild(t)}document.addEventListener("DOMContentLoaded",()=>{iniciarApp()});
//# sourceMappingURL=app.js.map
