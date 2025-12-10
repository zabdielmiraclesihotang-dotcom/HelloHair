const defaultDataBarberman = [
  {
    id: 1,
    nama: "Arka Sero",
    foto: "Barber1.jpg",
    layanan: ["Pangkas Rambut", "Hair Coloring"],
    wa: "https://wa.me/6281234567890?text=Halo Arka, saya ingin booking pangkas",
  },
  {
    id: 2,
    nama: "Patrix Bego",
    foto: "Barber2.jpg",
    layanan: ["Pangkas Rambut", "Hair Coloring"],
    wa: "https://wa.me/6289876543210?text=Halo Patrix, boleh booking pangkas?",
  },
];

if (!localStorage.getItem("dataBarberman")) {
  localStorage.setItem("dataBarberman", JSON.stringify(defaultDataBarberman));
}

const currentBarberId =
  parseInt(localStorage.getItem("currentBarberId")) || null;

const container = document.getElementById("barberList");

if (container) {
  let storedData = JSON.parse(localStorage.getItem("dataBarberman")) || [];

  storedData.forEach((b) => {
    const card = document.createElement("div");
    card.className = "barber-card";

    const layananHTML = b.layanan.map((l) => `<li>${l}</li>`).join("");

    const tombolBatalHTML =
      currentBarberId === b.id
        ? `<button class="btn-batal">Batal Sebagai Barberman</button>`
        : "";

    card.innerHTML = `
      <img src="${b.foto}" class="barber-photo" alt="Foto ${b.nama}" onerror="this.src='default-barber.jpg'">
      <div class="barber-name">${b.nama}</div>
      <div class="barber-services">
        <ul>${layananHTML}</ul>
      </div>
      <a href="${b.wa}" target="_blank" class="btn-wa">Chat WA</a>
      <button class="btn-pilih">Pilih Barber</button>
      ${tombolBatalHTML}
    `;

    card.querySelector(".btn-pilih").addEventListener("click", () => {
      window.location.href =
        "../pesan barberman/barber-rumah.html?barber=" + b.id;
    });

    if (currentBarberId === b.id) {
      card.querySelector(".btn-batal").addEventListener("click", () => {
        if (
          confirm(
            `Apakah Anda yakin ingin membatalkan ${b.nama} sebagai barberman?`
          )
        ) {
          storedData = storedData.filter((barber) => barber.id !== b.id);
          localStorage.setItem("dataBarberman", JSON.stringify(storedData));
          localStorage.removeItem("currentBarberId"); 
          location.reload();
        }
      });
    }

    container.appendChild(card);
  });
}
