function searchBook() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var booksGallery = document.getElementById("booksGallery");
    var books = booksGallery.getElementsByClassName("col");

    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      var bookTitle = book.getAttribute("data-judul").toLowerCase();

      if (searchInput === "" || bookTitle.includes(searchInput)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    }
  }