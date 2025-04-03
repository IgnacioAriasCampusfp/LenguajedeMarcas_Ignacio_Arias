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

window.onload = function() {
    const searchInput = document.getElementById('searchInput'); // Input del buscador de provincias
    const citySearchInput = document.getElementById('citySearchInput'); // Input del buscador de ciudades
    const provinceSelect = document.getElementById('indexSelect'); // Selector de provincias
    const weatherTable = document.getElementById('weather-table');

    fetch('https://www.el-tiempo.net/api/json/v2/home')
        .then(response => response.json())
        .then(data => {
            const provinces = data.provincias; // Accedemos a las provincias desde el objeto recibido

            // Función para renderizar las opciones del selector
            function renderProvinces(filteredProvinces) {
                provinceSelect.innerHTML = ''; // Limpiar las opciones actuales
                filteredProvinces.forEach(province => {
                    const option = document.createElement('option');
                    option.value = province.CODPROV;
                    option.text = province.NOMBRE_PROVINCIA;
                    provinceSelect.appendChild(option);
                });
            }

            // Renderizar todas las provincias inicialmente
            renderProvinces(provinces);

            // Filtrar provincias al escribir en el buscador
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filteredProvinces = provinces.filter(province =>
                    province.NOMBRE_PROVINCIA.toLowerCase().includes(searchTerm)
                );
                renderProvinces(filteredProvinces);
            });

            provinceSelect.addEventListener('change', function() {
                const selectedProvince = provinces.find(province => province.CODPROV === this.value);
                if (selectedProvince) {
                    // Obtener las ciudades de la provincia seleccionada
                    fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince.CODPROV}`)
                        .then(response => response.json())
                        .then(data => {
                            const cities = data.ciudades; // Accedemos al array de ciudades
                            renderTable(cities);

                            // Filtrar ciudades al escribir en el buscador
                            citySearchInput.addEventListener('input', function() {
                                const searchTerm = this.value.toLowerCase();
                                const filteredCities = cities.filter(city =>
                                    city.name.toLowerCase().includes(searchTerm)
                                );
                                renderTable(filteredCities);
                            });
                        })
                        .catch(error => console.error('Error al obtener las ciudades:', error));
                }
            });

            provinceSelect.dispatchEvent(new Event('change')); // Trigger the change event to load the data initially
        })
        .catch(error => console.error('Error:', error));

    // Función para renderizar la tabla
    function renderTable(cities) {
        const weatherData = document.getElementById('weather-data');
        weatherData.innerHTML = cities.map(city => `
            <tr>
                <td>${city.name}</td>
                <td>${city.nameProvince}</td>
                <td>${city.stateSky?.description || 'N/A'}</td>
                <td>${city.temperatures?.max || 'N/A'}</td>
                <td>${city.temperatures?.min || 'N/A'}</td>
            </tr>
        `).join('');
    }
};