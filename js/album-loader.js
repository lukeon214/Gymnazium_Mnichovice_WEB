document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');

    fetch('../fotografie/data/albums.json')
        .then(response => response.json())
        .then(data => {
            const album = data.albums.find(a => a.id === albumId);
            if (!album) return;

            document.title = album.title;
            document.getElementById('album-title').textContent = album.title;
            
            const grid = document.getElementById('album-images');
            album.images.forEach(img => {
                grid.insertAdjacentHTML('beforeend', `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div class="card shadow-sm">
                            <img src="../${img}" class="img-fluid" loading="lazy" 
                                 alt="${album.title} photo" style="cursor: pointer"
                                 onclick="this.classList.toggle('enlarged')">
                        </div>
                    </div>
                `);
            });
        });
});