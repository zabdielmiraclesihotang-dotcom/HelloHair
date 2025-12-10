document.addEventListener("DOMContentLoaded", () => {
  const barberSelect = document.getElementById("barber");
  const layananSelect = document.getElementById("layanan");
  const pembayaranSelect = document.getElementById("pembayaran");
  const boxPembayaran = document.getElementById("boxPembayaran");
  const brivaNumber = document.getElementById("brivaNumber");
  const countdownEl = document.getElementById("countdown");
  const btnSudahBayar = document.getElementById("btnSudahBayar");
  const form = document.getElementById("barberRumahForm");

  let countdownInterval;
  let brivaPaid = false;

  const dataBarberman = JSON.parse(localStorage.getItem("dataBarberman")) || [];

  barberSelect.innerHTML = '<option value="">-- Pilih Barberman --</option>';
  dataBarberman.forEach((barber) => {
    const option = document.createElement("option");
    option.value = barber.id;
    option.textContent = barber.nama;
    barberSelect.appendChild(option);
  });

  function updateLayanan() {
    const barberId = parseInt(barberSelect.value);
    layananSelect.innerHTML = '<option value="">-- Pilih Layanan --</option>';
    if (!barberId) return;

    const barber = dataBarberman.find((b) => b.id === barberId);
    if (barber && barber.layanan.length) {
      barber.layanan.forEach((layanan) => {
        const option = document.createElement("option");
        option.value = layanan;
        let harga = 0;
        if (layanan === "Pangkas Rambut") harga = 25000;
        else if (layanan === "Hair Coloring") harga = 50000;

        option.dataset.harga = harga;
        option.textContent = `${layanan} - Rp ${harga.toLocaleString()}`;

        layananSelect.appendChild(option);
      });
    }
  }

  barberSelect.addEventListener("change", updateLayanan);

  const params = new URLSearchParams(window.location.search);
  const barberIdFromURL = parseInt(params.get("barber"));
  if (barberIdFromURL) {
    barberSelect.value = barberIdFromURL;
    updateLayanan();
  }

  function generateBRIVA() {
    return "88051" + Math.floor(1000000000 + Math.random() * 9000000000);
  }

  function startCountdown() {
    let duration = 15 * 60;
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      let minutes = Math.floor(duration / 60);
      let seconds = duration % 60;

      countdownEl.textContent = `${minutes} menit : ${
        seconds < 10 ? "0" : ""
      }${seconds} detik`;

      if (duration <= 0) {
        clearInterval(countdownInterval);
        countdownEl.textContent = "Waktu pembayaran habis!";
      }

      duration--;
    }, 1000);
  }

  pembayaranSelect.addEventListener("change", function () {
    if (this.value === "briva") {
      boxPembayaran.classList.remove("hidden");
      const newBRIVA = generateBRIVA();
      brivaNumber.textContent = newBRIVA;
      brivaPaid = false;
      startCountdown();
    } else {
      boxPembayaran.classList.add("hidden");
      clearInterval(countdownInterval);
      brivaPaid = false;
    }
  });

  btnSudahBayar.addEventListener("click", () => {
    if (pembayaranSelect.value !== "briva") return;

    brivaPaid = true;
    alert(
      "Pembayaran berhasil dikonfirmasi!\nSekarang tekan 'Pesan Sekarang' untuk menyelesaikan pesanan."
    );
    boxPembayaran.classList.add("hidden");
    clearInterval(countdownInterval);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (pembayaranSelect.value === "briva" && !brivaPaid) {
      alert("Silakan konfirmasi pembayaran BRIVA terlebih dahulu.");
      return;
    }

    const formData = {
      nama: this.nama.value,
      telp: this.telp.value,
      alamat: this.alamat.value,
      barber: parseInt(barberSelect.value),
      layanan: layananSelect.value,
      pembayaran: pembayaranSelect.value,
      briva: brivaNumber.textContent || null,
      status:
        pembayaranSelect.value === "briva"
          ? brivaPaid
            ? "Lunas"
            : "Belum Bayar"
          : "Lunas",
      tanggal: this.tanggal.value,
      waktu: this.waktu.value,
    };

    let bookingData = JSON.parse(localStorage.getItem("bookingData")) || [];
    bookingData.push(formData);
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    if (pembayaranSelect.value === "briva") {
      savePaymentData({
        nama: formData.nama,
        metode: "BRIVA",
        nomor: brivaNumber.textContent,
        status: "Lunas",
        tanggal: new Date().toISOString(),
      });
    }

    alert("Pesanan berhasil dibuat!");
    this.reset();
    layananSelect.innerHTML = '<option value="">-- Pilih Layanan --</option>';
    boxPembayaran.classList.add("hidden");
    brivaPaid = false;
    clearInterval(countdownInterval);
  });

  function savePaymentData(data) {
    let allData = JSON.parse(localStorage.getItem("paymentData")) || [];
    allData.push(data);
    localStorage.setItem("paymentData", JSON.stringify(allData));
    console.log("Data tersimpan:", data);
  }
});
