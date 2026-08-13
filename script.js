     document.addEventListener('DOMContentLoaded', () => {
    
    // ১. মোবাইল মেনু টগল লজিক
    const menuBtn = document.getElementById('mobile-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        // মোবাইল মেনুর সাধারণ লিঙ্কে ক্লিক করলে মেনু বন্ধ হবে (তবে সার্ভিসের সাব-লিঙ্কের ক্ষেত্রে যেন ঝামেলা না করে)
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // যদি লিঙ্কটি সার্ভিস ড্রপডাউনের ভেতরে না হয়, তবেই পুরো মেনু বন্ধ হবে
                if (!link.closest('#mobileServiceList')) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });
          window.addEventListener("load", function () {
            const preloader = document.getElementById("preloader");
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 700); // ০.৭ সেকেন্ড পর লোডারটি সম্পূর্ণ হাইড হয়ে যাবে
        });
        // বাইরে ক্লিক করলে মেনু বন্ধ হবে (সাব-মেনুর ভেতর ক্লিক করলে যাতে বন্ধ না হয়)
        document.addEventListener('click', (e) => {
            const serviceList = document.getElementById('mobileServiceList');
            const serviceBtn = document.querySelector('button[onclick="toggleMobileServices(event)"]');

            // যদি ক্লিকটি মোবাইল মেনু, মেনু বাটন বা সার্ভিস লিস্টের বাইরে হয় তবেই বন্ধ হবে
            if (!mobileMenu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
                
                // পাশাপাশি সার্ভিস লিস্টও বন্ধ করে দেওয়া ভালো
                if (serviceList && !serviceList.classList.contains('hidden')) {
                    serviceList.classList.add('hidden');
                    const arrow = document.getElementById('mobileServiceArrow');
                    if (arrow) arrow.classList.remove('rotate-180');
                }
            }
        });
    }

    // ২. টাইপরাইটার অ্যানিমেশন লজিক
   const textArray = [
    "Full-Stack MERN Developer",
    "React & Node.js Developer",
    "Web Designer & Developer"
];
    const heroTyping = document.getElementById("hero-typing-role");
    const sidebarTyping = document.getElementById("typing-role");

    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            const currentText = textArray[textArrayIndex].substring(0, charIndex + 1);
            if (heroTyping) heroTyping.textContent = currentText;
            if (sidebarTyping) sidebarTyping.textContent = currentText;
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            const currentText = textArray[textArrayIndex].substring(0, charIndex - 1);
            if (heroTyping) heroTyping.textContent = currentText;
            if (sidebarTyping) sidebarTyping.textContent = currentText;
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }

    if (heroTyping || sidebarTyping) {
        setTimeout(type, 1000);
    }

    // কাস্টম কার্সর অ্যানিমেশন লজিক (বড় সাইজের জন্য অপ্টিমাইজড)
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".cursor-circle");

    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            // সেন্টারে পজিশন করার জন্য এবং বড় সাইজের সামঞ্জস্য রাখতে 
            circle.style.left = x + "px";
            circle.style.top = y + "px";

            // স্কেল ও ট্রানজিশন স্মুথ করার লজিক
            circle.scale = (circles.length - index) / circles.length;
            circle.style.transform = `translate(-50%, -50%) scale(${circle.scale})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.25; // একটু ধীর গতিতে ট্রেইলিংয়ের জন্য স্পিড অ্যাডজাস্ট করা হয়েছে
            y += (nextCircle.y - y) * 0.25;
        });

        requestAnimationFrame(animateCircles);
    }

    if (circles.length > 0) {
        animateCircles();
    }

    // ৪. অটো কাউন্টার অ্যানিমেশন লজিক
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function runCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = 200 / target; 

            function updateCount() {
                count += 1;
                if (count <= target) {
                    counter.innerText = count;
                    setTimeout(updateCount, speed * 10);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
        });
    }

    const statsSection = document.querySelector('#stats-section'); 
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    runCounter();
                    animated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
});

// ৫. গ্লোবাল ফাংশনসমূহ (HTML থেকে সরাসরি কল করার জন্য)
function toggleDesktopService() {
    const menu = document.getElementById('desktopServiceMenu');
    const arrow = document.getElementById('desktopServiceArrow');
    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

function toggleMobileServices(event) {
    if (event) {
        event.stopPropagation();
    }
    const list = document.getElementById('mobileServiceList');
    const arrow = document.getElementById('mobileServiceArrow');
    
    if (list && arrow) {
        list.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

function toggleServiceDropdown() {
    const menu = document.getElementById('serviceDropdownMenu');
    const arrow = document.getElementById('serviceArrow');
    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-90');
    }
}

function openProjectModal(title, imageUrl, description) {
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc');
    const projectModal = document.getElementById('projectModal');

    if (modalTitle) modalTitle.innerText = title;
    if (modalImage) modalImage.src = imageUrl;
    if (modalDesc) modalDesc.innerText = description;
    if (projectModal) projectModal.classList.remove('hidden');
}

function closeProjectModal() {
    const projectModal = document.getElementById('projectModal');
    if (projectModal) projectModal.classList.add('hidden');
}
// ================= FIGMA MODAL JAVASCRIPT =================
const modal = document.getElementById('figmaModal');
const modalContent = document.getElementById('modalContent');
const body = document.body;

function openFigmaModal() {
    if (!modal || !modalContent) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
    body.style.overflow = 'hidden';
}

function closeFigmaModal() {
    if (!modal || !modalContent) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    body.style.overflow = '';
}

// Close modal on clicking outside the content area
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeFigmaModal();
    }
});

// Close modal on pressing 'Esc' key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && !modal.classList.contains('pointer-events-none')) {
        closeFigmaModal();
    }
});

   
