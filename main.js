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

  /* --- Lightbox --- */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img') || document.getElementById('lightbox-img-cloth');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        // materials page: swap /100/ → /400/ for hi-res version
        lightboxImg.src = img.src.replace('/100/', '/400/');
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
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
