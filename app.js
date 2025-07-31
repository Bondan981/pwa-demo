const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');
const exportBtn = document.getElementById('exportBtn');

// Load data dari LocalStorage
let dataList = JSON.parse(localStorage.getItem('dataList') || '[]');
renderTable();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const tanggal = document.getElementById('tanggal').value;
  const keterangan = document.getElementById('keterangan').value;

  dataList.push({ nama, tanggal, keterangan });
  localStorage.setItem('dataList', JSON.stringify(dataList));
  renderTable();
  form.reset();
});

exportBtn.addEventListener('click', () => {
  const csvContent = "data:text/csv;charset=utf-8,"
    + ["Nama,Tanggal,Keterangan", ...dataList.map(d => `${d.nama},${d.tanggal},${d.keterangan}`)].join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

function renderTable() {
  tableBody.innerHTML = '';
  dataList.forEach(item => {
    const row = `<tr><td>${item.nama}</td><td>${item.tanggal}</td><td>${item.keterangan}</td></tr>`;
    tableBody.innerHTML += row;
  });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}