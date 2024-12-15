document.addEventListener("scroll", () => {
    const bigTextElements = document.querySelectorAll(".big-text");

    bigTextElements.forEach(bigText => {
        const rect = bigText.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
            bigText.classList.add("visible");
        } else {
            bigText.classList.remove("visible");
        }
    });
});