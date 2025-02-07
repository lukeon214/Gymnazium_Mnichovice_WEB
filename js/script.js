document.addEventListener("scroll", () => {
    const bigTextElements = document.querySelectorAll(".big-text");

    bigTextElements.forEach(bigText => {
        const rect = bigText.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible && window.innerWidth > 1530) {
            bigText.classList.add("visible");
        } else {
            bigText.classList.remove("visible");
        }
    });
});

document.getElementById('burger').addEventListener('change', function() {
    const fullscreenSection = document.querySelector('.fullscreen-section');
    if (this.checked) {
      fullscreenSection.style.display = 'flex';
      fullscreenSection.style.opacity = 1;
    } else {
      fullscreenSection.style.display = 'none';
      fullscreenSection.style.opacity = 0;
    }
});

document.querySelectorAll('.fullscreen-navbar li > a').forEach(link => {
    link.addEventListener('click', function (e) {
        const dropdown = this.nextElementSibling;

        if (dropdown && dropdown.classList.contains('dropdown')) {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });
});

document.querySelectorAll('.fullscreen-navbar li > a').forEach(link => {
    link.addEventListener('click', function (e) {
        const dropdown = this.nextElementSibling;

        if (dropdown && dropdown.classList.contains('dropdown')) {
            e.preventDefault();

            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) d.style.display = 'none';
            });

            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });
});
