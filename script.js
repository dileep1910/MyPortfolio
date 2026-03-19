document.addEventListener('DOMContentLoaded', () => {

    // ================= Mobile Menu =================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const bxIcon = menuBtn.querySelector('.bx');

    menuBtn.addEventListener('click', () => {
        const isClosed = mobileMenu.classList.contains('translate-x-full');

        if (isClosed) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            bxIcon.classList.remove('bx-menu');
            bxIcon.classList.add('bx-x');
            document.body.style.overflow = 'hidden';
        } else {
            closeMobileMenu();
        }
    });

    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        bxIcon.classList.remove('bx-x');
        bxIcon.classList.add('bx-menu');
        document.body.style.overflow = 'auto';
    }

    // ================= Navbar Scroll =================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('scrolled', 'py-2');
            header.classList.add('py-4');
        }
    });

    // ================= Active Section Highlight =================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobLinks = document.querySelectorAll('.mobile-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active', 'text-brand-400');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active', 'text-brand-400');
                    }
                });

                mobLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ================= Fade Animation =================
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ================= Footer Year =================
    document.getElementById('current-year').textContent = new Date().getFullYear();

});


// ================= EmailJS =================
emailjs.init("KTh00aPDzUE_YV7uV");

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');

    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm("service_nfsx57n", "template_lrhparo", form)
        .then(() => {
            showMessage("Message sent successfully! ✅", "success");
            form.reset();
        })
        .catch((error) => {
            console.log(error);
            showMessage("Failed to send message ❌", "error");
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});


// ================= Message UI =================
function showMessage(text, type) {
    let messageBox = document.getElementById('form-message');

    if (!messageBox) {
        messageBox = document.createElement('div');
        messageBox.id = 'form-message';
        document.getElementById("contact-form").prepend(messageBox);
    }

    messageBox.className = "mb-4 p-3 rounded text-sm";

    if (type === "success") {
        messageBox.classList.add("bg-green-500/10", "text-green-400");
    } else {
        messageBox.classList.add("bg-red-500/10", "text-red-400");
    }

    messageBox.innerText = text;

    setTimeout(() => {
        messageBox.remove();
    }, 4000);
}


// ================= Resume Modal =================
function openResumeModal() {
    const modal = document.getElementById("resume-modal");
    const content = document.getElementById("resume-modal-content");

    modal.classList.remove("hidden");

    setTimeout(() => {
        modal.classList.remove("opacity-0");
        content.classList.add("scale-100");
    }, 10);

    document.body.style.overflow = "hidden";
}

function closeResumeModal() {
    const modal = document.getElementById("resume-modal");
    const content = document.getElementById("resume-modal-content");

    modal.classList.add("opacity-0");
    content.classList.remove("scale-100");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);

    document.body.style.overflow = "auto";
}

document.addEventListener("click", function (e) {
    const modal = document.getElementById("resume-modal");
    if (e.target === modal) {
        closeResumeModal();
    }
});