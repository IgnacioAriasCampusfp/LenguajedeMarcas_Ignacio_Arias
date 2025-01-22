// Ruta del archivo JSON
const jsonUrl = 'libros.json';
let jsonData = [];

// Función para cargar datos desde el JSON
fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    jsonData = data; // Guarda los datos cargados
    displayData(jsonData); // Muestra los datos
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para mostrar los datos en la tabla
function displayData(data) {
  const tableBody = document.getElementById('data-table-body');
  tableBody.innerHTML = ''; // Limpia la tabla antes de mostrar nuevos datos

  data.forEach(item => {
    const row = document.createElement('tr');

    const nombreCell = document.createElement('td');
    nombreCell.textContent = item.nombre;
    row.appendChild(nombreCell);

    const autorCell = document.createElement('td');
    autorCell.textContent = item.autor;
    row.appendChild(autorCell);

    const F_PublicacionCell = document.createElement('td');
    F_PublicacionCell.textContent = item.F_Publicacion;
    row.appendChild(F_PublicacionCell);

    const paginasCell = document.createElement('td');
    paginasCell.textContent = item.paginas;
    row.appendChild(paginasCell);

    const EditorialCell = document.createElement('td');
    EditorialCell.textContent = item.editorial;
    row.appendChild(EditorialCell);

    tableBody.appendChild(row);
  });
}

// Función para filtrar los datos según los valores en los inputs
function filterData() {
  const nameFilter = document.getElementById('nameFilter').value.toLowerCase();

  const filteredData = jsonData.filter(item =>
    item.nombre.toLowerCase().includes(nameFilter) ||
    item.autor.toLowerCase().includes(nameFilter)
  );

  displayData(filteredData); // Muestra los datos filtrados
}

// Escucha cambios en el input de filtro
//document.getElementById('nameFilter').addEventListener('input', filterData);
