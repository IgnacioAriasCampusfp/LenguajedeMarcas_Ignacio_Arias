document.addEventListener("DOMContentLoaded", function () {
    // Cambio de imagen según la hora
    const hora = new Date().getHours();
    const img = document.getElementById("hora");

    if (hora >= 6 && hora < 12) {
        img.src = "img/SolSEDormido.png";
    } else if (hora >= 12 && hora < 15) {
        img.src = "img/SolSEDespierto.png";
    } else if (hora >= 15 && hora < 20) {
        img.src = "img/SolSENormal.png";
    } else {
        img.src = "img/LunaSE.png";
    }

    // Carrusel
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.querySelector('.indicators');

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

    setInterval(nextSlide, 6000);
    updateCarousel();

    // Obtener provincias y municipios y mostrar en la tabla
    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
        .then(response => response.json())
        .then(data => {
            const provinces = data.provincias;
            const provinceSelect = document.getElementById('indexSelect');
            const municipioSelect = document.getElementById('municipioSelect');
            const municipiosTableBody = document.getElementById('municipios-data');
            const weatherTableBody = document.getElementById('weather-data');
            const provinceSearch = document.getElementById('provinceSearch');
            const municipioSearch = document.getElementById('municipioSearch');

            function populateProvinces(filteredProvinces) {
                provinceSelect.innerHTML = '<option value="">Selecciona una provincia</option>';
                filteredProvinces.forEach(province => {
                    const option = document.createElement('option');
                    option.value = province.CODPROV;
                    option.text = province.NOMBRE_PROVINCIA;
                    provinceSelect.appendChild(option);
                });
            }

            populateProvinces(provinces);

            provinceSearch.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                const filteredProvinces = provinces.filter(province =>
                    province.NOMBRE_PROVINCIA.toLowerCase().includes(searchTerm)
                );
                populateProvinces(filteredProvinces);
            });

            provinceSelect.addEventListener('change', function () {
                const selectedProvince = provinces.find(province => province.CODPROV === this.value);
                if (!selectedProvince) {
                    municipioSelect.innerHTML = '<option value="">Selecciona una provincia primero</option>';
                    municipiosTableBody.innerHTML = '';
                    weatherTableBody.innerHTML = '';
                    return;
                }

                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince.CODPROV}`)
                    .then(response => response.json())
                    .then(data => {
                        weatherTableBody.innerHTML = `
                            <tr>
                                <td>${selectedProvince.NOMBRE_PROVINCIA}</td>
                                <td>${data.stateSky?.description || 'Desconocido'}</td>
                                <td>${data.temperaturas?.max || 'N/A'} °C</td>
                                <td>${data.temperaturas?.min || 'N/A'} °C</td>
                                <td>${selectedProvince.CODPROV}</td>
                            </tr>
                        `;
                    })
                    .catch(error => console.error('Error al obtener datos meteorológicos:', error));

                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince.CODPROV}/municipios`)
                    .then(response => response.json())
                    .then(data => {
                        let municipios = data.municipios || [];
                        function populateMunicipios(filteredMunicipios) {
                            municipioSelect.innerHTML = '<option value="">Selecciona un municipio</option>';
                            filteredMunicipios.forEach(municipio => {
                                const option = document.createElement('option');
                                option.value = municipio.CODIGOINE;
                                option.text = municipio.NOMBRE;
                                municipioSelect.appendChild(option);
                            });
                        }

                        populateMunicipios(municipios);

                        municipioSearch.addEventListener('input', function () {
                            const searchTerm = this.value.toLowerCase();
                            const filteredMunicipios = municipios.filter(municipio =>
                                municipio.NOMBRE.toLowerCase().includes(searchTerm)
                            );
                            populateMunicipios(filteredMunicipios);
                        });
                    })
                    .catch(error => console.error('Error al obtener municipios:', error));
            });

            municipioSelect.addEventListener('change', function () {
                const selectedMunicipio = [...municipioSelect.options]
                    .find(option => option.value === this.value);

                if (!selectedMunicipio || selectedMunicipio.value === "") {
                    municipiosTableBody.innerHTML = '';
                    return;
                }

                const selectedProvince = provinceSelect.value;
                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvince}/municipios`)
                    .then(response => response.json())
                    .then(data => {
                        const municipios = data.municipios || [];
                        municipiosTableBody.innerHTML = '';

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
});
