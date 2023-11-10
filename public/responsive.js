function fetchData() {
    fetch('http://localhost:5000/dictionary') // Ganti URL sesuai dengan endpoint Anda
      .then(response => response.json())
      .then(data => renderBooks(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  // Panggil fetchData saat halaman dimuat
  window.onload = function () {
    fetchData();
  };


  // Fungsi untuk merender buku di UI
function renderBooks(books) {
    const booksGallery = document.getElementById('booksGallery');
    booksGallery.innerHTML = ''; // Kosongkan kontennya terlebih dahulu
  
    books.forEach(book => {
      const newBookElement = document.createElement('div');
      newBookElement.classList.add('col');
      newBookElement.dataset.judul = book.judul;
  
      // Membuat elemen gambar
      const imgElement = document.createElement('img');
      imgElement.src = book.gambar; // Ganti 'gambar' dengan properti gambar yang sesuai
      imgElement.alt = `Gambar ${book.judul}`;
      imgElement.width = "100%";
      imgElement.height = "610";
      newBookElement.appendChild(imgElement);
  
      // Membuat elemen deskripsi
      const descElement = document.createElement('div');
      descElement.innerHTML = `<p>${book.deskripsi}</p>`;
      newBookElement.appendChild(descElement);
  
      // Membuat elemen tombol View
      const viewButton = document.createElement('button');
      viewButton.type = 'button';
      viewButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
      viewButton.textContent = 'View';
      // Implementasikan logika untuk menangani klik tombol View jika diperlukan
      newBookElement.appendChild(viewButton);
  
      // Membuat elemen tombol Bookmark
      const bookmarkButton = document.createElement('button');
      bookmarkButton.type = 'button';
      bookmarkButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
      // Implementasikan logika untuk menangani klik tombol Bookmark jika diperlukan
      const bookmarkIcon = document.createElement('img');
      bookmarkIcon.width = '25px';
      bookmarkIcon.src = 'bookmark.png'; // Ganti dengan path gambar bookmark yang sesuai
      bookmarkButton.appendChild(bookmarkIcon);
      newBookElement.appendChild(bookmarkButton);
  
      // Membuat elemen waktu
      const timeElement = document.createElement('small');
      timeElement.classList.add('text-muted');
      timeElement.textContent = '9 mins'; // Ganti dengan properti waktu yang sesuai
      newBookElement.appendChild(timeElement);
  
      booksGallery.appendChild(newBookElement);
    });
  }
  