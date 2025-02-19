const url = "https://www.el-tiempo.net/api/json/v2/provincias/33";
const max = 'Maxima:';
const grado = "ºC";
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        const postolst = document.getElementById('post-list');

        if (Array.isArray(data.ciudades)) {
            data.ciudades.forEach(post => {
                const ol = document.createElement('ol');
                ol.textContent = `${post.name}: ${post.stateSky.description}, ${max} ,${post.temperatures.max}${grado}`;
                console.log("Datos:", post.body);
                postolst.appendChild(ol);
            });
        } else {
            console.log("No se encontró un array en los datos.");
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la petición: ', error);
    });
