const url = "https://www.el-tiempo.net/api/json/v2/provincias/33";

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
       // console.log("Datos recibidos:", data); /
        const postList = document.getElementById('post-list');
        
        if (Array.isArray(data.ciudades)) {
            data.ciudades.forEach(post => {
                const li = document.createElement('li');
                li.textContent = `${post.name}: ${post.nameProvince}`;
                console.log("Datos:", post.body);
                postList.appendChild(li);
            });
        } else {
            console.log("No se encontró un array en los datos.");
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la petición: ', error);
    });
