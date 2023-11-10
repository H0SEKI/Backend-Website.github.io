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

  fetch('dictionary.json')
  .then(response => response.json())
  .then(data => {
    
    data.forEach(item => {
      const judul = item.Judul;
      const gambarUrl = item.Image;

      const gambarElement = document.getElementById(`gambar-${judul}`);

      if (gambarElement) {
        gambarElement.src = gambarUrl;
      }
    });
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });
