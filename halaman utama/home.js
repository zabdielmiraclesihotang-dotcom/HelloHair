function goTo(page) {
  switch (page) {
    case "tentang-kami": 
      window.location.href = "../Tentang Kami/tentang-kami.html"; 
      break;

    case "barber-rumah": 
      window.location.href = "../pesan barberman/barber-rumah.html"; 
      break;

    case "daftar-barber": 
      window.location.href = "../daftar barber/daftar-barber.html";
      break;

    case "lihat-pesanan": 
      window.location.href = "../lihat pesanan/lihat-pesanan.html";
      break;

    case "riwayat": 
      window.location.href = "../riwayat pemesanan/riwayat-pemesanan.html"; 
      break;

    case "profil":
      window.location.href = "../profil/profil.html";
      break;

    default:
      alert("Halaman belum tersedia!");
  }
}

function logout() {
  if (confirm("Yakin ingin logout?")) {
    window.location.href = "../index.html";
  }
}
