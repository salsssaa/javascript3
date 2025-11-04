document.getElementById('searchBtn').addEventListener('click', () => {
  const capital = document.getElementById('capitalInput').value.trim();
  if (!capital) {
    alert('Nazwa stolicy');
    return;
  }

  fetch(`https://restcountries.com/v3.1/capital/${encodeURIComponent(capital)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Nie znaleziono kraju dla wpisanej stolicy');
      }
      return response.json();
    })
    .then(data => {
      const country = data[0];
      const name = country.name?.common || '-';
      const capitalName = (country.capital && country.capital[0]) || '-';
      const population = country.population?.toLocaleString() || '-';
      const region = country.region || '-';
      const subregion = country.subregion || '-';

      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${name}</td>
        <td>${capitalName}</td>
        <td>${population}</td>
        <td>${region}</td>
        <td>${subregion}</td>
      `;
      tbody.appendChild(tr);
    })
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
});
