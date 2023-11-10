function validasidulugaksih() {
  let email = document.getElementById("emailForm").value;
  let password = document.getElementById("passwordForm").value;

  if (email.trim() === "" || password.trim() === "") {
    return false;
  }
  return true;
}

function maukehome() {
  if (validasidulugaksih()) {
    var emaill = document.getElementById("emailForm").value;
    document.getElementById("form").submit();
    alert(`Selamat datang ${emaill} :D`);
  }
}
