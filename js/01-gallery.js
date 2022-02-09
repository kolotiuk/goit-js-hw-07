import { galleryItems } from "./gallery-items.js";
// Change code below this line

const listGallery = document.querySelector(".gallery");
let instance;

const markup = galleryItems
    .map(({ preview, original, description }) => {
        return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`;
    })
    .join("");

listGallery.insertAdjacentHTML("afterbegin", markup);
listGallery.addEventListener("click", onModalOpen);

function onModalOpen(e) {
    e.preventDefault();

    const dataSource = e.target.dataset.source;

    if (!dataSource) {
        return;
    }

    window.addEventListener("keydown", onEscCloseModal);

    instance = basicLightbox.create(
        `
        <img src="${dataSource}" width="800" height="600">
    `
    );

    instance.show();
}

function onEscCloseModal(e) {
    if (e.code === "Escape") {
        instance.close();
        onRemoveLisetener();
        return;
    }
}

function onRemoveLisetener() {
    window.removeEventListener("keydown", onEscCloseModal);
}
