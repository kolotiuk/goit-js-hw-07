import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

const markup = galleryItems
    .map(({ preview, original, description }) => {
        return `<div class="gallery__item">
                <a class="gallery__link" href="large-image.jpg">
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

galleryRef.insertAdjacentHTML("afterbegin", markup);

let instance = 0;

function openModal(e) {
    e.preventDefault();

    if (e.target.tagName !== "IMG") {
        return;
    }

    window.addEventListener("keydown", closeModal);

    const dataSet = e.target.dataset.source;

    instance = basicLightbox.create(`
        <img src="${dataSet}"/>
    `);

    instance.show();
}

function closeModal(e) {
    if (e.key === "Escape") {
        window.removeEventListener("keydown", closeModal);
        instance.close();
    }
}

galleryRef.addEventListener("click", openModal);
