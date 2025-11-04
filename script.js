const token = "XNBkDbeTInydKBSsYUuorCmBjaJELQio";
const proxy = "https://corsproxy.io/?";
const url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01&limit=20";

fetch(proxy + url, {
  headers: { token: token }
})
  .then(res => {
    if (!res.ok) throw new Error("Błąd pobierania danych NOAA");
    return res.json();
  })
  .then(data => {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      tbody.innerHTML = 'Brak danych'
      return;
    }

    data.results.forEach(entry => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry.date || '-'}</td>
        <td>${entry.datatype || '-'}</td>
        <td>${entry.value || '-'}</td>
        <td>${entry.station || '-'}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error(err);
    alert("Błąd pobierania danych NOAA");
  });
