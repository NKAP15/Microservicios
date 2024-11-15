// URL base de la API de libros
const apiUrl = 'http://localhost:8000/books';

// Obtener elementos del DOM
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const bookIdInput = document.getElementById('bookId');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const bookNumberPagesInput = document.getElementById('bookNumberPages');
const bookPublisherInput = document.getElementById('bookPublisher');

async function getBooks() {
  const response = await fetch(apiUrl + '/getAll');
  const books = await response.json();

  // Limpiar la lista de libros
  bookList.innerHTML = '';

  // Agregar cada libro como una fila en la tabla
  books.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.numberPages} páginas</td>
      <td>${book.publisher}</td>
       <td class="action-btn">
      <button onclick="editBook('${book._id}')" title="Editar"><i class="fas fa-edit"></i></button></td>
      <td class="action-btn"><button onclick="deleteBook('${book._id}')" title="Eliminar"><i class="fas fa-trash-alt"></i></button></td>
    `;
    bookList.appendChild(row);
  });
}

// Función para crear un nuevo libro
bookForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const book = {
    title: bookTitleInput.value,
    author: bookAuthorInput.value,
    numberPages: bookNumberPagesInput.value ? Number(bookNumberPagesInput.value) : undefined,
    publisher: bookPublisherInput.value || undefined
  };

  const method = bookIdInput.value ? 'PUT' : 'POST';
  const url = bookIdInput.value ? `${apiUrl}/update/${bookIdInput.value}` : `${apiUrl}/create`;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();
  if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data.message,
    });
  clearForm();
  getBooks();
  submitCustomerBtn.textContent = "Guardar libro";
}
});

// Función para editar un libro
async function editBook(id) {
  const result = await Swal.fire({
    title: '¿Deseas editar este libro?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
  const response = await fetch(`${apiUrl}/get/${id}`);
  const book = await response.json();

  bookIdInput.value = book._id;
  bookTitleInput.value = book.title;
  bookAuthorInput.value = book.author;
  bookNumberPagesInput.value = book.numberPages || '';
  bookPublisherInput.value = book.publisher || '';
  submitCustomerBtn.textContent = "Guardar Cambios";
}
}

// Función para eliminar un libro
async function deleteBook(id) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
  const response = await fetch(`${apiUrl}/delete/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  Swal.fire({
    icon: 'success',
    title: '¡Eliminado!',
    text: data.message,
  });
  getBooks();
}}

// Limpiar el formulario
function clearForm() {
  bookIdInput.value = '';
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookNumberPagesInput.value = '';
  bookPublisherInput.value = '';
}

// Cargar los libros al cargar la página
getBooks(); 