const token = 'XNBkDbeTInydKBSsYUuorCmBjaJELQio';

const proxy = 'https://corsproxy.io/?';
const url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?limit=1000';

fetch(proxy + url, {
  headers: { token: token }
})
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    (data.results || []).forEach(station => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${station.id}</td>
        <td>${station.name}</td>
        <td>${station.state || '-'}</td>
        <td>${station.latitude || '-'}</td>
        <td>${station.longitude || '-'}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error('Fetch error:', err);
    alert('Nie można pobrać danych NOAA (CORS).');
  });
