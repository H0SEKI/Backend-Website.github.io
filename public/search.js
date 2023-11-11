// Fungsi searchBook digunakan untuk mencari dan menampilkan buku berdasarkan judul

function searchBook() {
  // Mengambil nilai input pencarian dari elemen dengan ID "searchInput" dan mengonversi ke huruf kecil (lowercase).
  var searchInput = document.getElementById("searchInput").value.toLowerCase();

  // Mengambil elemen galeri buku dengan ID "booksGallery".
  var booksGallery = document.getElementById("booksGallery");

  // Mengambil semua elemen dengan kelas "col" yang merupakan buku-buku dalam galeri.
  var books = booksGallery.getElementsByClassName("col");

  // Iterasi melalui setiap buku dalam galeri.
  for (var i = 0; i < books.length; i++) {
    var book = books[i];

    // Mengambil judul buku dari atribut "data-judul" dan mengonversi ke huruf kecil (lowercase).
    var bookTitle = book.getAttribute("data-judul").toLowerCase();

    // Memeriksa apakah teks pencarian kosong atau jika judul buku mengandung teks pencarian.
    if (searchInput === "" || bookTitle.includes(searchInput)) {
      book.style.display = "block"; // Menampilkan buku.
    } else {
      book.style.display = "none"; // Menyembunyikan buku.
    }
  }
}

var addedBooks = {}; // melacak buku yang sudah ditambahkan

function toggleCart(bookTitle) {
  var cartOverlay = document.getElementById("cartOverlay");
  var booksGallery = document.getElementById("booksGallery");
  var books = booksGallery.getElementsByClassName("col");
  var cartItemsContainer = document.getElementById("cartItemsContainer");

  // Tampilan hAlaman cartOverlay
  cartOverlay.style.display = "flex";

  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var currentBookTitle = book.getAttribute("data-judul").toLowerCase();

    // untuk menambahkan ke cartOverlay
    if (
      currentBookTitle === bookTitle.toLowerCase() &&
      !addedBooks[currentBookTitle]
    ) {
      var clonedBook = book.cloneNode(true);
      clonedBook.style.display = "block";

      // tombol untuk menghapus item yg ada pada halaman overlay aka bookmark
      var bookmarkButton = document.createElement("button");
      bookmarkButton.innerHTML = '<img width="25px" src="delete.png" />';
      bookmarkButton.classList.add(
        "btn",
        "btn-sm",
        "btn-outline-secondary",
        "bookmark-button"
      );
      bookmarkButton.onclick = function () {
        // menghapus item melalui tombol hapus dibawah item
        cartItemsContainer.removeChild(clonedBook);
        addedBooks[currentBookTitle] = false;
        if (cartItemsContainer.children.length === 0) {
          cartOverlay.style.display = "none";
        }
      };
      clonedBook.appendChild(bookmarkButton);

      cartItemsContainer.appendChild(clonedBook);

      addedBooks[currentBookTitle] = true;
    }
  }
}

// Fungsi untuk keluar dari cartOverlay tanpa menghapus item
function exitCart() {
  var cartOverlay = document.getElementById("cartOverlay");

  cartOverlay.style.display = "none";
}
