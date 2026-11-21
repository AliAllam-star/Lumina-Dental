/* ====================================================================
   ⚙️ إعدادات الموقع الأساسية (Site Configuration)
   ====================================================================
   من هنا يمكنك تعديل بيانات العيادة، الأسعار، الأطباء، والآراء.
   أي تعديل هنا هيظهر في كل صفحات الموقع تلقائياً.
   ==================================================================== */

const siteConfig = {
  // 1. بيانات العيادة الأساسية
  clinic: {
    name: "لومينا لطب الأسنان",
    phone: "+20 100 000 0000",
    phoneLink: "+201000000000",
    whatsappLink: "https://wa.me/201000000000",
    email: "hello@lumina.dental",
    address: "التجمع الخامس، شارع التسعين الجنوبي، مبنى ٢٤، القاهرة الجديدة",
    workingHours: {
      weekdays: "السبت – الخميس: 10:00 ص – 10:00 م",
      friday: "الجمعة: 4:00 م – 10:00 م",
    },
  },

  // 2. الباقات والأسعار (صفحة pricing.html)
  pricing: [
    {
      id: "pkg-basic",
      title: "العناية الأساسية",
      desc: "للمتابعة الدورية والوقاية.",
      price: "1,500",
      currency: "EGP",
      isPopular: false,
      features: [
        "فحص وتشخيص شامل",
        "تنظيف وتلميع الأسنان",
        "إزالة الجير والتكلسات",
        "أشعة بانورامية (عند الحاجة)",
      ],
    },
    {
      id: "pkg-smile",
      title: "تجميل الابتسامة",
      desc: "لابتسامة هوليوود متناسقة.",
      price: "18,000",
      currency: "EGP",
      isPopular: true, // دي الباقة اللي هيطلع عليها شريط "الأكثر طلباً"
      features: [
        "تصميم ابتسامة رقمي DSD",
        "فينير إيماكس (للأسنان الأمامية)",
        "تبييض ليزر مجاني",
        "متابعة لمدة 6 أشهر",
      ],
    },
    {
      id: "pkg-comprehensive",
      title: "العلاج الشامل",
      desc: "لإعادة تأهيل الفم بالكامل.",
      price: "45,000",
      currency: "EGP",
      isPopular: false,
      features: [
        "زراعة أسنان (لكل غرسة)",
        "تركيبات زيركونيا",
        "علاج جذور بالميكروسكوب",
        "خطة تقسيط مرنة",
      ],
    },
  ],

  // 3. آراء المرضى (الصفحة الرئيسية)
  testimonials: [
    {
      text: "كنت مرعوبة من فكرة الزراعة، لكن د. كريم شرح لي كل خطوة على الشاشة قبل ما نبدأ. العملية خلصت في أقل من ساعة وما حسيتش بأي ألم. النتيجة فاقت توقعاتي.",
      name: "منى عبد الرحمن",
      type: "زراعة الأسنان",
      initial: "م",
    },
    {
      text: "تجربة راقية جداً من أول ما دخلت. الفريق محترم، والمكان هادي جداً. عملت ابتسامة هوليوود والنتيجة طبيعية جداً ومحدش عرف إني مركبة فينير.",
      name: "أحمد سامي",
      type: "ابتسامة هوليوود",
      initial: "أ",
    },
    {
      text: "د. يوسف كان متعاون جداً معايا في التقويم الشفاف. كنت خايفة من التقويم المعدني بس الشفاف مريح ومحدش بياخد باله منه.",
      name: "سارة محمود",
      type: "تقويم شفاف",
      initial: "س",
    },
  ],
};
document.addEventListener("DOMContentLoaded", function () {
  // 1. قائمة الموبايل (Mobile Menu)
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () =>
      mobileMenu.classList.toggle("hidden"),
    );
  }

  // 2. النجوم (Particles / Canvas)
  const canvas = document.getElementById("particle-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const perspective = 800;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initParticles();
    }

    class Particle {
      constructor(radius) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        this.baseX = radius * Math.sin(phi) * Math.cos(theta);
        this.baseY = radius * Math.sin(phi) * Math.sin(theta);
        this.baseZ = radius * Math.cos(phi);
        this.size = Math.random() * 1.5 + 0.5;
      }
      draw(cx, cy, rotX, rotY) {
        const cosY = Math.cos(rotY),
          sinY = Math.sin(rotY);
        const x1 = this.baseX * cosY - this.baseZ * sinY;
        const z1 = this.baseZ * cosY + this.baseX * sinY;
        const cosX = Math.cos(rotX),
          sinX = Math.sin(rotX);
        const y1 = this.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.baseY * sinX;
        const scale = perspective / (perspective + z2);
        const x2d = x1 * scale + cx;
        const y2d = y1 * scale + cy;
        ctx.fillStyle = `rgba(203, 255, 252, ${Math.max(0.1, scale * 0.6)})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const radius = Math.min(canvas.width, canvas.height) * 0.45;
      for (let i = 0; i < 400; i++) particles.push(new Particle(radius));
    }

    let targetRotX = 0,
      targetRotY = 0,
      currentRotX = 0,
      currentRotY = 0;

    // حركة الماوس (للكمبيوتر)
    window.addEventListener("mousemove", (e) => {
      targetRotY =
        ((e.clientX - window.innerWidth / 2) / window.innerWidth) * Math.PI * 2;
      targetRotX =
        ((e.clientY - window.innerHeight / 2) / window.innerHeight) * Math.PI;
    });

    // حركة اللمس (للموبايل والتابلت)
    window.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 0) {
          targetRotY =
            ((e.touches[0].clientX - window.innerWidth / 2) /
              window.innerWidth) *
            Math.PI *
            2;
          targetRotX =
            ((e.touches[0].clientY - window.innerHeight / 2) /
              window.innerHeight) *
            Math.PI;
        }
      },
      { passive: true },
    );

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // حركة تلقائية بطيئة عشان تفضل شغالة لوحدها
      targetRotY += 0.002;

      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      const cx = canvas.width / 2,
        cy = canvas.height / 2;
      particles.forEach((p) => p.draw(cx, cy, currentRotX, currentRotY));
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
  }

  // 3. حركة الظهور بالـ Scroll (Reveal) وعداد الأرقام (Counter)
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          const c = entry.target.querySelectorAll(".counter");
          c.forEach((counter) => {
            if (counter.innerText === "0") {
              const target = +counter.getAttribute("data-target");
              const isDecimal = counter
                .getAttribute("data-target")
                .includes(".");
              let count = 0;
              const speed = target / 100;
              const update = () => {
                count += speed;
                if (count < target) {
                  counter.innerText = isDecimal
                    ? count.toFixed(1)
                    : Math.ceil(count);
                  setTimeout(update, 30);
                } else {
                  counter.innerText = isDecimal ? target.toFixed(1) : target;
                }
              };
              update();
            }
          });
        }
      });
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll(".scroll-reveal")
    .forEach((el) => observer.observe(el));

  // 4. سلايدر قبل وبعد (Before/After Slider)
  const sliders = document.querySelectorAll(".slider-input");
  sliders.forEach((slider) => {
    slider.addEventListener("input", function () {
      const container = this.closest(".group");
      if (container) {
        const beforeImage = container.querySelector(".before-image");
        const sliderHandle = container.querySelector(".slider-handle");
        if (beforeImage)
          beforeImage.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
        if (sliderHandle) sliderHandle.style.left = `${this.value}%`;
      }
    });
  });

  // 5. آراء المرضى (Testimonials Slider)
  const testimonialsData = [
    {
      text: "كنت مرعوبة من فكرة الزراعة، لكن د. كريم شرح لي كل خطوة على الشاشة قبل ما نبدأ. العملية خلصت في أقل من ساعة وما حسيتش بأي ألم. النتيجة فاقت توقعاتي.",
      name: "منى عبد الرحمن",
      type: "زراعة الأسنان",
      initial: "م",
    },
    {
      text: "تجربة راقية جداً من أول ما دخلت. الفريق محترم، والمكان هادي جداً. عملت ابتسامة هوليوود والنتيجة طبيعية جداً ومحدش عرف إني مركبة فينير.",
      name: "أحمد سامي",
      type: "ابتسامة هوليوود",
      initial: "أ",
    },
    {
      text: "د. يوسف كان متعاون جداً معايا في التقويم الشفاف. كنت خايفة من التقويم المعدني بس الشفاف مريح ومحدش بياخد باله منه.",
      name: "سارة محمود",
      type: "تقويم شفاف",
      initial: "س",
    },
  ];

  let currentTestimonial = 0;
  let progressInterval;
  const progressBars = document.querySelectorAll(".progress-fill");

  function updateTestimonial(index) {
    const content = document.getElementById("testimonial-content");
    if (!content) return;
    content.style.opacity = 0;

    setTimeout(() => {
      document.getElementById("testimonial-text").innerText =
        `«${testimonialsData[index].text}»`;
      document.getElementById("testimonial-name").innerText =
        testimonialsData[index].name;
      document.getElementById("testimonial-type").innerText =
        testimonialsData[index].type;
      document.getElementById("testimonial-initial").innerText =
        testimonialsData[index].initial;
      content.style.opacity = 1;
    }, 300);

    currentTestimonial = index;
    resetProgress();
  }

  function resetProgress() {
    clearInterval(progressInterval);
    progressBars.forEach((bar, i) => {
      bar.style.width = i < currentTestimonial ? "100%" : "0%";
    });

    let currentProgress = 0;
    progressInterval = setInterval(() => {
      currentProgress += 2;
      if (currentProgress <= 100) {
        if (progressBars[currentTestimonial])
          progressBars[currentTestimonial].style.width = `${currentProgress}%`;
      } else {
        clearInterval(progressInterval);
        let nextIndex = (currentTestimonial + 1) % testimonialsData.length;
        updateTestimonial(nextIndex);
      }
    }, 100);
  }

  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      let prevIndex =
        (currentTestimonial - 1 + testimonialsData.length) %
        testimonialsData.length;
      updateTestimonial(prevIndex);
    });
    nextBtn.addEventListener("click", () => {
      let nextIndex = (currentTestimonial + 1) % testimonialsData.length;
      updateTestimonial(nextIndex);
    });
    resetProgress();
  }

  // 6. اختيار الطبيب تلقائياً في صفحة الحجز
  const urlParams = new URLSearchParams(window.location.search);
  const doctor = urlParams.get("doctor");
  const selectElement = document.getElementById("doctor-select");
  if (doctor && selectElement) {
    selectElement.value = doctor;
  }
});
