fetch('dictionary.json') 
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const judul = item.Judul;
      const deskripsi = item.Deskripsi;

      const bukuElement = document.getElementById(judul);

      if (bukuElement) {
        const deskripsiElement = bukuElement.querySelector('p');
        deskripsiElement.textContent = deskripsi;
      }
    });
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });

  fetch('dictionary.json') // Mengambil data dari file JSON
  .then(response => response.json())
  .then(data => {
    // Loop melalui data API
    data.forEach(item => {
      // Ambil judul buku dan URL gambar
      const judul = item.Judul;
      const gambarUrl = item.Image;

      // Cari elemen HTML berdasarkan judul buku
      const gambarElement = document.getElementById(`gambar-${judul}`);

      // Jika elemen gambar ditemukan, atur atribut src dengan URL gambar
      if (gambarElement) {
        gambarElement.src = gambarUrl;
      }
    });
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });

