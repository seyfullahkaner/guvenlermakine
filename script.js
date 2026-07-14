const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const quoteForm = document.querySelector(".quote-form");
const formNote = document.querySelector(".form-note");
const whatsappNumber = "905349501349";
const galleryItems = [
  { src: "Görseller/2.jpeg", alt: "Tır üzerinde sevk edilen kırmızı iş makinaları", title: "Nakliyat ve sevk" },
  { src: "Görseller/1.jpeg", alt: "Telehandler araçları şantiyede", title: "Araç parkuru" },
  { src: "Görseller/10.jpeg", alt: "Gece yüksek erişim çalışması", title: "Yüksek erişim" },
  { src: "Görseller/6.jpeg", alt: "Kırmızı telehandler kepçe ataşmanı ile çalışırken", title: "Telehandler" },
  { src: "Görseller/7.jpeg", alt: "İnşaat alanında çalışan sarı telehandler", title: "İnşaat sahası" },
  { src: "Görseller/4.jpeg", alt: "Kırmızı telehandler araçları", title: "Hazır araçlar" },
  { src: "Görseller/9.jpeg", alt: "Kiralık telehandler yan görünüm", title: "Kiralık makine" }
];
const galleryButtons = document.querySelectorAll("[data-gallery-index]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
let activeGalleryIndex = 0;

menuButton?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const location = String(data.get("location") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !phone || !location || !message) {
    formNote.textContent = "Lütfen tüm alanları doldurun.";
    return;
  }

  const body = [
    "Merhaba, Güven Makina için teklif almak istiyorum.",
    "",
    `Ad Soyad: ${name}`,
    `Telefon: ${phone}`,
    `Konum: ${location}`,
    `İhtiyaç: ${message}`
  ].join("\n");

  formNote.textContent = "WhatsApp mesajı hazırlanıyor.";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
});

const showGalleryItem = (index) => {
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.title;
};

const openLightbox = (index) => {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  showGalleryItem(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
  lightboxClose?.focus();
};

const closeLightbox = () => {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(Number(button.getAttribute("data-gallery-index") || 0));
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => showGalleryItem(activeGalleryIndex - 1));
lightboxNext?.addEventListener("click", () => showGalleryItem(activeGalleryIndex + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showGalleryItem(activeGalleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryItem(activeGalleryIndex + 1);
});
