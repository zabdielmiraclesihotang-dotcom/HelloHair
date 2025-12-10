document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const btn = document.querySelector(".btn");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
      alert("Mohon isi Email/Username dan Password!");
      return;
    }

    btn.innerHTML = "Loading...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
      const user = users.find(
        (u) =>
          (u.username === email || u.email === email) && u.password === password
      );

      if (user) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            nama: user.username,
            email: user.email,
            whatsapp: user.whatsapp || "-",
            alamat: user.alamat || "-",
          })
        );

        alert("Login berhasil!");
        btn.innerHTML = "BOOK YOUR CUT";
        btn.style.opacity = "1";
        btn.disabled = false;

        window.location.href = "halaman utama/home.html";
      } else {
        alert("Username atau password salah!");
        btn.innerHTML = "BOOK YOUR CUT";
        btn.style.opacity = "1";
        btn.disabled = false;
      }
    }, 800);
  });

  const registerLink = document.querySelector(".register a");
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    const username = prompt("Masukkan username:");
    const email = prompt("Masukkan email:");
    const password = prompt("Masukkan password:");

    if (!username || !email || !password) {
      alert("Semua field harus diisi!");
      return;
    }

    if (users.find((u) => u.username === username || u.email === email)) {
      alert("Username atau email sudah terdaftar!");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Akun berhasil dibuat! Silakan login menggunakan akun baru.");
  });
});
