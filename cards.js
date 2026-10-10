const articles = [
    {
        title: "My Favorite Albums Pt. 1",
        description: "A review of my favorite albums, starting with Violator by Depeche Mode.",
        link: "/Articles/article0001.html",
        image: "https://www.depechemode.de/wp-content/uploads/2011/06/depeche-mode-violator-520x520.jpg",
        tags: ["MyFavoriteAlbums", "Albums", "DepecheMode"],
        date: "2026-10-09"
    },
    {
        title: "My Favorite Albums Pt. 2",
        description: "A review of my favorite albums, today featuring Toxicity by System of a Down.",
        link: "/Articles/article0002.html",
        image: "https://cdn.prod.website-files.com/67533e5e13fe1a0b864efa4b/675349da236604b7259e1614_SOAD-ALBUM-TOXICITY-p-500.jpg",
        tags: ["MyFavoriteAlbums", "Albums", "SystemOfADown"],
        date: "2026-10-10"
    },
    {
        title: "Concert: System Of A Down, Berlin 2026",
        description: "My experience at the System Of A Down Concert in the Berlin Olympiastadium.",
        link: "/Articles/article0003.html",
        image: "https://www.shop-olympiastadion.berlin/wp-content/uploads/2025/09/SOAD.png",
        tags: ["Concerts", "SystemOfADown", "QOTSA", "AcidBath"],
        date: "2026-10-10"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("card-grid");
    if (!grid) return;

    const searchInput = document.getElementById("search-input");
    const targetTag = grid.dataset.tag || "all";
    const rawSort = grid.dataset.sort ? grid.dataset.sort.trim().toLowerCase() : "desc";

    function renderArticles() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

        // 1. Filtern
        const filteredArticles = articles.filter(article => {
            const articleTags = article.tags || [];
            
            // Tag-Matching (z. B. data-tag="all" oder übereinstimmender Tag)
            const matchesCategory = (targetTag === "all" || articleTags.includes(targetTag));

            // Suchbegriff-Matching (Titel oder Tags)
            const matchesTitle = article.title ? article.title.toLowerCase().includes(searchTerm) : false;
            const matchesTags = articleTags.some(tag => tag.toLowerCase().includes(searchTerm));

            const matchesSearch = searchTerm === "" || matchesTitle || matchesTags;

            return matchesCategory && matchesSearch;
        });

        // 2. Sortieren nach Datum
        filteredArticles.sort((a, b) => {
            const timeA = new Date(a.date).getTime();
            const timeB = new Date(b.date).getTime();
            return rawSort === "asc" ? timeA - timeB : timeB - timeA;
        });

        // 3. Wenn keine Artikel gefunden wurden
        if (filteredArticles.length === 0) {
            grid.innerHTML = `<p class="no-results">Keine Artikel gefunden.</p>`;
            return;
        }

        // 4. HTML Generierung
        let gridHTML = "";
        filteredArticles.forEach(article => {
            const articleTags = article.tags || [];
            const tagBadges = articleTags.map(tag => `<span class="tag-badge">${tag}</span>`).join(" ");

            gridHTML += `
                <article class="article-card">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="article-body">
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <div class="tags">${tagBadges}</div>
                        <a href="${article.link}" class="button">Read more</a>
                    </div>
                </article>
            `;
        });

        grid.innerHTML = gridHTML;
    }

    // Event-Listener für Suchfeld
    if (searchInput) {
        searchInput.addEventListener("input", renderArticles);
    }

    // Erstes Rendern
    renderArticles();
});