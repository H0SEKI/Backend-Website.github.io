function validasidulugaksih() {
  let email = document.getElementById("emailForm").value;
  let password = document.getElementById("passwordForm").value;

  if (email.trim() === "" || password.trim() === "") {
    alert("Isi yang benar dulu BANGSAATTTT!!!");
    return false;
  }

  return true;
}

function maukehome() {
  if (validasidulugaksih()) {
    document.getElementById("form").submit();
    alert(`Selamat datang ${email} :D`);
  }
}