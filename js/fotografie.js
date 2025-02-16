document.addEventListener('DOMContentLoaded', function() {
    fetch('data/albums.json?v=2')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('album-grid');
            
            data.albums.forEach(album => {
                const albumCard = `
                    <div class="col">
                        <div class="card h-100 shadow-sm album-card">
                            <img src="${album.cover}" class="card-img-top" alt="${album.title}" loading="lazy">
                            <div class="card-body">
                                <h5 class="card-title">${album.title}</h5>
                                <a href="album.html?id=${album.id}" class="animated-button-link">

                                    <button class="animated-button">
                                        <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                                            </path>
                                        </svg>
                                        <span class="text">Zobrazit Album (${album.images.length})</span>
                                        <span class="circle"></span>
                                        <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                                            </path>
                                        </svg>
                                    </button>

                                </a>
                            </div>
                        </div>
                    </div>`;
                grid.insertAdjacentHTML('beforeend', albumCard);
            });
        });
});