document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formDaftarBarber");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = form.nama.value.trim();
    const layanan = form.layanan.value.split(",").map((l) => l.trim());
    const wa = form.wa.value.trim() || "#";

    const fotoInput = form.foto.files[0];

    if (fotoInput) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const fotoDataUrl = event.target.result;
        simpanBarber(nama, fotoDataUrl, layanan, wa);
      };
      reader.readAsDataURL(fotoInput);
    } else {
      const defaultFoto = "default-barber.jpg";
      simpanBarber(nama, defaultFoto, layanan, wa);
    }
  });

  function simpanBarber(nama, foto, layanan, wa) {
    const dataBarberman =
      JSON.parse(localStorage.getItem("dataBarberman")) || [];

    const newId = dataBarberman.length
      ? Math.max(...dataBarberman.map((b) => b.id)) + 1
      : 1;

    const newBarber = {
      id: newId,
      nama,
      foto,
      layanan,
      wa,
    };

    dataBarberman.push(newBarber);
    localStorage.setItem("dataBarberman", JSON.stringify(dataBarberman));
    localStorage.setItem("currentBarberId", newId);

    alert("Pendaftaran berhasil! Anda sekarang terdaftar sebagai barberman.");
    window.location.href = "daftar-barber.html";
  }
});
