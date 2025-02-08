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

(async () => {
    try {
      const response = await fetch(
        "https://www.instagram.com/gymnazium_mnichovice/?__a=1&__d=1"
      );
      const data = await response.json();
      
      const posts = data.graphql.user.edge_owner_to_timeline_media.edges;
      const container = document.getElementById("instagram-container");
  
      posts.slice(0, 6).forEach(({ node }) => {
        container.innerHTML += `
          <a href="https://www.instagram.com/p/${node.shortcode}/" target="_blank">
            <img src="${node.thumbnail_src}" alt="Instagram post">
          </a>
        `;
      });
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("instagram-container").innerHTML = 
        "<p>Chyba při načítání příspěvků.</p>";
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    fetch("../custom-scripts/instagram-feed.php")
        .then(response => response.json())
        .then(data => {
            const instaContainer = document.getElementById("insta-container");

            if (data.error) {
                instaContainer.innerHTML = `<p>Chyba při načítání příspěvků.</p>`;
                return;
            }

            instaContainer.innerHTML = data.map(post => `
                <a href="${post.link}" target="_blank">
                    <img src="${post.image}" alt="${post.caption}">
                </a>
            `).join("");
        })
        .catch(err => console.error("Chyba:", err));
});