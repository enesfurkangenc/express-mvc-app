class CategoryListItem extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    set article(article) {
        this.root.innerHTML = `
            <style>
              h2 {
                font-family: Georgia, 'Times New Roman', Times, serif;
              }
              
               a,
               a:visited {
                text-decoration: none;
                color: inherit;
              }
            </style>
            <img src="${article.thumbnailUrl ? article.thumbnailUrl : ''}" class="image">
        `
    }

}

customElements.define('category-list-item', CategoryListItem);
