// Mengambil data dari file JSON
fetch("dictionary.json")
  // Mengonversi respons ke format JSON
  .then((response) => response.json())
  .then((data) => {
    // Iterasi melalui setiap item dalam data
    data.forEach((item) => {
      // Mendapatkan judul dan deskripsi buku dari data
      const judul = item.Judul;
      const deskripsi = item.Deskripsi;

      // Mendapatkan elemen HTML dengan ID sesuai judul buku
      const bukuElement = document.getElementById(judul);

      // Jika elemen buku ditemukan, update deskripsi
      if (bukuElement) {
        const deskripsiElement = bukuElement.querySelector("p");
        deskripsiElement.textContent = deskripsi;
      }
    });
  })
  // Menangani kesalahan jika fetch atau parsing JSON gagal
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });

// Mengambil dan membaca api pada file json
fetch("dictionary.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      // Mendapatkan judul dan URL gambar buku dari data
      const judul = item.Judul;
      const gambarUrl = item.Image;

      // Mendapatkan elemen gambar HTML dengan ID sesuai judul buku
      const gambarElement = document.getElementById(`gambar-${judul}`);

      // Jika elemen gambar ditemukan, setel atribut src dengan URL gambar
      if (gambarElement) {
        gambarElement.src = gambarUrl;
      }
    });
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
