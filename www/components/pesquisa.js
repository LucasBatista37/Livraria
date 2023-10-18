document.querySelector('.pesquisa-formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    searchBooks();
});

function searchBooks() {
    var searchQuery = document.getElementById('campo-pesquisa').value;
    var apiKey = 'AIzaSyAvkiIv8uKC_n05_NqKahfTe0Swg5br6Ng'; 
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchQuery + '&key=' + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayResults(data);
        })
        .catch(function(error) {
            console.log('Erro ao buscar livros: ', error);
        });
}

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!data || !data.items || data.items.length === 0) {
        resultsDiv.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    var books = data.items;

    for (var i = 0; i < books.length; i++) {
        var book = books[i].volumeInfo;
        var title = book.title;
        var authors = book.authors ? book.authors.join(', ') : 'Autor desconhecido';
        var description = book.description ? book.description : 'Descrição não disponível';
        var thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';

        var bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <h2>${title}</h2>
            <p>Autor(es): ${authors}</p>
            <p>${description}</p>
            <img src="${thumbnail}" alt="${title} capa">
        `;

        resultsDiv.appendChild(bookElement);
    }
}
