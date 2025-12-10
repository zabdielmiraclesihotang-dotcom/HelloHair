document.addEventListener("DOMContentLoaded", () => {
  const bookingContainer = document.getElementById("bookingList");
  let bookings = JSON.parse(localStorage.getItem("bookingData")) || [];

  function renderBookings() {
    bookingContainer.innerHTML = "";

    if (bookings.length === 0) {
      bookingContainer.innerHTML = `<div class="empty-message">Tidak ada booking saat ini.</div>`;
      return;
    }

    bookings.forEach((b, index) => {
      const card = document.createElement("div");
      card.className = "pesanan-card";

      card.innerHTML = `
        <strong>Booking Barber ke Rumah</strong><br>
        <span>Nama:</span> ${b.nama}<br>
        <span>Telepon:</span> ${b.telp}<br>
        <span>Alamat:</span> ${b.alamat}<br>
        <span>Barber:</span> ${b.barber}<br>
        <span>Tanggal:</span> ${b.tanggal}<br>
        <span>Waktu:</span> ${b.waktu}<br>
        <button class="btn-batal">Batal Booking</button>
        <button class="btn-selesai">Layanan Selesai</button>
      `;

      bookingContainer.appendChild(card);

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);

      card.querySelector(".btn-batal").addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin membatalkan booking ini?")) {
          bookings.splice(index, 1);
          localStorage.setItem("bookingData", JSON.stringify(bookings));
          renderBookings();
        }
      });

      card.querySelector(".btn-selesai").addEventListener("click", () => {
        if (confirm("Tandai layanan ini sebagai selesai?")) {
          let riwayat = JSON.parse(localStorage.getItem("riwayatData")) || [];

          const selesaiData = {
            ...b,
            status: "Selesai",
            tanggalSelesai: new Date().toISOString(),
          };
          riwayat.push(selesaiData);
          localStorage.setItem("riwayatData", JSON.stringify(riwayat));

          bookings.splice(index, 1);
          localStorage.setItem("bookingData", JSON.stringify(bookings));
          renderBookings();
        }
      });
    });
  }

  renderBookings();
});
