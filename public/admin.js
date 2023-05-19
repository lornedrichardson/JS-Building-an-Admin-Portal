async function main() {

  let response = await fetch('http://localhost:3001/listBooks');
  let books = await response.json();

  books.forEach(renderBook);
}

function renderBook(book) {
  let title = document.createElement('li');
  title.textContent = book.title;

  let amount = document.createElement('input');
  amount.value = book.quantity;
  
  let updateIsBetterInSQL = document.createElement('button');
  updateIsBetterInSQL.textContent = 'Save';
  updateIsBetterInSQL.addEventListener('click', () => {
    fetch('http://localhost:3001/updateBook', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: book.id,
        quantity: amount.value
      })
    });
  });

  let deleteIsDefinitelyBetterInSQL = document.createElement('button');
  deleteIsDefinitelyBetterInSQL.textContent = 'Delete';
  deleteIsDefinitelyBetterInSQL.addEventListener('click', () => fetch(`http://localhost:3001/removeBook/${book.id}`, { method: 'DELETE' }));

  title.append(amount, updateIsBetterInSQL, deleteIsDefinitelyBetterInSQL);
  document.querySelector('#book-list').append(title);
}

main();