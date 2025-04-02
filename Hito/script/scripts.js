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

window.onload = function () {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
        .then(response => response.json())
        .then(data => {
            const provinces = data.provincias;
            const provinceSelect = document.getElementById('indexSelect');
            const municipioSelect = document.getElementById('municipioSelect');
            const municipiosTableBody = document.getElementById('municipios-data');
            const weatherTableBody = document.getElementById('weather-data');

            // Agregar opción por defecto
            provinceSelect.innerHTML = '<option value="">Selecciona una provincia</option>';

            // Rellenar el select con las provincias
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.CODPROV;
                option.text = province.NOMBRE_PROVINCIA;
                provinceSelect.appendChild(option);
            });

            // Evento al cambiar la provincia seleccionada
            provinceSelect.addEventListener('change', function () {
                const selectedProvince = provinces.find(province => province.CODPROV === this.value);
                if (!selectedProvince) {
                    municipioSelect.innerHTML = '<option value="">Selecciona una provincia primero</option>';
                    municipiosTableBody.innerHTML = '';
                    weatherTableBody.innerHTML = '';
                    return;
                }

                // Obtener municipios de la provincia seleccionada
                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince.CODPROV}/municipios`)
                    .then(response => response.json())
                    .then(data => {
                        const municipios = data.municipios || [];
                        municipioSelect.innerHTML = '<option value="">Selecciona un municipio</option>';
                        municipiosTableBody.innerHTML = '';
                        weatherTableBody.innerHTML = '';

                        // Mostrar datos de la provincia en la tabla de clima
                        weatherTableBody.innerHTML = `
                            <tr>
                                <td>${selectedProvince.NOMBRE_PROVINCIA}</td>
                                <td>Despejado</td>
                                <td>${Math.floor(Math.random() * 35)} °C</td>
                                <td>${Math.floor(Math.random() * 15)} °C</td>
                                <td>${selectedProvince.CODPROV}</td>
                            </tr>
                        `;

                        // Llenar el select de municipios
                        municipios.forEach(municipio => {
                            const option = document.createElement('option');
                            option.value = municipio.CODIGOINE;
                            option.text = municipio.NOMBRE;
                            municipioSelect.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error al obtener municipios:', error));
            });

            // Evento al seleccionar un municipio
            municipioSelect.addEventListener('change', function () {
                const selectedMunicipio = [...municipioSelect.options]
                    .find(option => option.value === this.value);

                if (!selectedMunicipio || selectedMunicipio.value === "") {
                    municipiosTableBody.innerHTML = '';
                    return;
                }

                // Obtener los datos del municipio seleccionado
                const selectedProvince = provinceSelect.value;
                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince}/municipios`)
                    .then(response => response.json())
                    .then(data => {
                        const municipios = data.municipios || [];
                        municipiosTableBody.innerHTML = '';

                        // Filtrar solo el municipio seleccionado
                        const municipioSeleccionado = municipios.find(m => m.CODIGOINE === selectedMunicipio.value);

                        if (municipioSeleccionado) {
                            municipiosTableBody.innerHTML = `
                                <tr style="background-color: #dff0d8;">
                                    <td>${municipioSeleccionado.NOMBRE}</td>
                                    <td>${municipioSeleccionado.SUPERFICIE || 'N/A'}</td>
                                    <td>${municipioSeleccionado.PERIMETRO || 'N/A'}</td>
                                    <td>${municipioSeleccionado.POBLACION_MUNI || 'N/A'}</td>
                                </tr>
                            `;
                        }
                    })
                    .catch(error => console.error('Error al obtener municipios:', error));
            });
        })
        .catch(error => console.error('Error al obtener provincias:', error));
};
