document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("userData");

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  const data = JSON.parse(user);

  document.getElementById("namaUser").textContent = data.nama;
  document.getElementById("emailUser").textContent = data.email;
  document.getElementById("waUser").textContent = data.whatsapp;
  document.getElementById("alamatUser").textContent = data.alamat;

  const foto = localStorage.getItem("fotoProfil");
  if (foto) {
    document.getElementById("profileImage").src = foto;
  }
});

document.getElementById("uploadPhoto").addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("profileImage").src = reader.result;
    localStorage.setItem("fotoProfil", reader.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

function logout() {
  localStorage.removeItem("userData");
  localStorage.removeItem("fotoProfil");
  window.location.href = "../index.html";
}
