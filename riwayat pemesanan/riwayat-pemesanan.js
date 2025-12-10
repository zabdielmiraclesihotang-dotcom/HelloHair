document.addEventListener("DOMContentLoaded", () => {
  const riwayatContainer = document.getElementById("riwayatList");
  const btnHapusSemua = document.getElementById("btnHapusSemua");

  let riwayat = JSON.parse(localStorage.getItem("riwayatData")) || [];

  function renderRiwayat() {
    riwayatContainer.innerHTML = "";

    if (riwayat.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-message";
      empty.textContent = "Belum ada riwayat pemesanan.";
      riwayatContainer.appendChild(empty);

      setTimeout(() => empty.classList.add("show"), 50);
      return;
    }

    riwayat.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "pesanan-card";

      card.innerHTML = `
        <strong>${item.layanan || item.metode || "Layanan"}</strong><br>
        <span>Nama:</span> ${item.nama}<br>
        ${item.telp ? `<span>Telepon:</span> ${item.telp}<br>` : ""}
        ${item.alamat ? `<span>Alamat:</span> ${item.alamat}<br>` : ""}
        ${item.barber ? `<span>Barber:</span> ${item.barber}<br>` : ""}
        <span>Status:</span> ${item.status || "Selesai"}<br>
        <span>Tanggal:</span> ${item.tanggal || ""}<br>
        <span>Waktu:</span> ${item.waktu || ""}<br>
      `;

      riwayatContainer.appendChild(card);

      setTimeout(() => {
        card.classList.add("show");
      }, index * 100);
    });

    setTimeout(() => {
      document.querySelector("footer").classList.add("show");
    }, riwayat.length * 100);
  }

  btnHapusSemua.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat pemesanan?")) {
      riwayat = [];
      localStorage.setItem("riwayatData", JSON.stringify(riwayat));
      renderRiwayat();
    }
  });

  renderRiwayat();
});
