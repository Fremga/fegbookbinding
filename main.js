/* ========================
   Shared JS for all pages
   ======================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile menu toggle --- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks   = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.innerHTML = navLinks.classList.contains("show") ? "&times;" : "&#9776;";
    });
  }

  /* --- Navbar scroll / hero detection --- */
  const navbar = document.querySelector('.navbar');
  const hero   = document.querySelector('.hero');

  if (navbar) {
    if (hero) {
      const io = new IntersectionObserver(([entry]) => {
        navbar.classList.toggle('scrolled', !entry.isIntersecting);
      }, { threshold: 0.1 });
      io.observe(hero);
    } else {
      navbar.classList.add('scrolled');
    }
  }

  /* --- Gallery / materials button toggle --- */
  const buttons  = document.querySelectorAll('.cta-button-services');
  const contents = document.querySelectorAll('.service-text');

  if (buttons.length) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        contents.forEach(content => content.style.display = 'none');
        const target = document.getElementById(button.getAttribute('data-target'));
        if (target) target.style.display = 'block';
      });
    });
  }

  /* --- Lightbox with prev/next navigation --- */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img') || document.getElementById('lightbox-img-cloth');
  const lbPrev      = document.getElementById('lb-prev');
  const lbNext      = document.getElementById('lb-next');
  const lbClose     = document.getElementById('lb-close');

  if (lightbox && lightboxImg) {
    let currentImgs = [];
    let currentIdx  = 0;

    function openLightbox(imgs, idx) {
      currentImgs = imgs;
      currentIdx  = idx;
      lightboxImg.src = currentImgs[currentIdx].src.replace('/100/', '/400/');
      lightbox.style.display = 'flex';
      // Show/hide arrows if only 1 image
      if (lbPrev) lbPrev.style.display = currentImgs.length > 1 ? '' : 'none';
      if (lbNext) lbNext.style.display = currentImgs.length > 1 ? '' : 'none';
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }

    // Bind clicks on all gallery items
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        // Collect siblings in the same .gallery
        const galleryEl = img.closest('.gallery');
        const imgs = galleryEl
          ? Array.from(galleryEl.querySelectorAll('.gallery-item img'))
          : [img];
        const idx = imgs.indexOf(img);
        openLightbox(imgs, idx);
      });
    });

    if (lbPrev) lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx - 1 + currentImgs.length) % currentImgs.length;
      lightboxImg.src = currentImgs[currentIdx].src.replace('/100/', '/400/');
    });

    if (lbNext) lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx + 1) % currentImgs.length;
      lightboxImg.src = currentImgs[currentIdx].src.replace('/100/', '/400/');
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);

    // Click backdrop to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display !== 'flex') return;
      if (e.key === 'ArrowRight') lbNext && lbNext.click();
      if (e.key === 'ArrowLeft')  lbPrev && lbPrev.click();
      if (e.key === 'Escape')     closeLightbox();
    });
  }

  /* --- Contact page: phone & email injection --- */
  const phoneEl = document.getElementById("phone");
  const emailEl = document.getElementById("email");
  const nameEl = document.getElementById("name");

  if (phoneEl) {
    const country = "+61", area = "449", number = "170 054";
    const phone = `${country} ${area} ${number}`;
    phoneEl.innerHTML = `<a href="tel:${country}${area}${number.replace(' ','')}">  ${phone}</a>`;
  }

  if (emailEl) {
    const user = "info", domain = "fegbookbinding.com.au";
    emailEl.innerHTML = `<a href="mailto:${user}@${domain}">  ${user}@${domain}</a>`;
  }

  if (nameEl) {
  const name = "Francesco Gabba";
  nameEl.innerHTML = name;
  }

  document.querySelectorAll('.site-footer').forEach(footer => {
  footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} FEG Bookbinding. All rights reserved.</p>`;
});

});
