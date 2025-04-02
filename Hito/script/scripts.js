const hora = new Date().getHours();
img = document.getElementById("hora");
if (hora >= 6 && hora < 12) {
    img.src = "img/SolSEDormido.png";
}else if (hora >= 12 && hora < 15) {
    img.src = "img/SolSEDespierto.png";  
}else if (hora >= 15 && hora < 20) {
    img.src = "img/SolSENormal.png";  
}else{
   img.src = "img/LunaSE.png";  
    
}




//Carrusel

    let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicatorsContainer = document.querySelector('.indicators');

// Crear indicadores
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(dot);
});
const indicators = document.querySelectorAll('.indicators div');

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
        indicators[index].classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Cambio automático cada 3 segundos
setInterval(nextSlide, 6000);

// Inicializar
updateCarousel();


// 
  window.onload = function() {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
        .then(response => response.json())
        .then(data => {
            const provinces = data.provincias; // Cambiado a 'provincias'
            const provinceSelect = document.getElementById('indexSelect');
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.CODPROV; // Usamos el código de la provincia como valor
                option.text = province.NOMBRE_PROVINCIA; // Nombre de la provincia
                provinceSelect.appendChild(option);
            });
            provinceSelect.addEventListener('change', function() {
                const selectedProvince = provinces.find(province => province.CODPROV === this.value);
                if (selectedProvince) {
                    // Simulación de datos de clima (debes reemplazar esto con datos reales si la API los proporciona)
                    const weatherData = {
                        descripcionClima: "Despejado", // Cambiar por datos reales si están disponibles
                        temperaturaMaxima: Math.floor(Math.random() * 35), // Simulación de temperatura máxima
                        temperaturaMinima: Math.floor(Math.random() * 15) // Simulación de temperatura mínima
                    };

                    const weatherTableBody = document.getElementById('weather-data');
                    weatherTableBody.innerHTML = `
                        <tr>
                            <td>${selectedProvince.NOMBRE_PROVINCIA}</td>
                            <td>${weatherData.descripcionClima}</td>
                            <td>${weatherData.temperaturaMaxima} °C</td>
                            <td>${weatherData.temperaturaMinima} °C</td>
                            <td>${selectedProvince.CODPROV}</td>
                        </tr>
                    `;
                }
            });
            provinceSelect.dispatchEvent(new Event('change')); // Trigger the change event to load the data initially
        })
        .catch(error => console.error('Error:', error));
};