// Navigation Menu
$("#search-icon").click(function () {
    $(".nav").toggleClass("search");
    $(".nav").toggleClass("no-search");
    $(".search-input").toggleClass("search-active");
});

$(".menu-toggle").click(function () {
    $(".nav").toggleClass("mobile-nav");
    $(this).toggleClass("is-active");
});

// Hero Slider (OLD - now replaced by vanilla JS below)
$(document).ready(function () {
    $(".slideEventImg i:eq(1)").click(function () {
        if ($(".slideEventImg img.activeImg").is(":last-of-type"))
            $(".slideEventImg img:first-of-type")
                .addClass("activeImg")
                .siblings()
                .removeClass("activeImg");
        else
            $(".slideEventImg img.activeImg")
                .removeClass("activeImg")
                .next()
                .addClass("activeImg");
    });

    $(".slideEventImg i:eq(0)").click(function () {
        if ($(".slideEventImg img.activeImg").is(":first-of-type"))
            $(".slideEventImg img:last-of-type")
                .addClass("activeImg")
                .siblings()
                .removeClass("activeImg");
        else
            $(".slideEventImg img.activeImg")
                .removeClass("activeImg")
                .prev()
                .addClass("activeImg");
    });
}); //ready

// Simple Modal component
$(document).ready(function () {
    $("#openModal").click(function () {
        $("#myModal").show();
    });

    $(".close").click(function () {
        $("#myModal").hide();
    });

    $(window).click(function (event) {
        if ($(event.target).is("#myModal")) {
            $("#myModal").hide();
        }
    });
});

// Carousel
$(document).ready(function () {
    const carouselSlides = $(".carousel .carousel-slide");
    if (carouselSlides.length > 0) {
        const carouselTotalSlides = carouselSlides.length;
        const visibleSlides = 3;
        let carouselCurrentIndex = 0;

        $(".carousel .slides").append(carouselSlides.clone());

        function updateCarouselSlides() {
            const newTransform = `translateX(-${(carouselCurrentIndex * 100) / visibleSlides}%)`;
            $(".carousel .slides").css("transform", newTransform);
        }

        function nextCarouselSlide() {
            carouselCurrentIndex++;
            if (carouselCurrentIndex === carouselTotalSlides) {
                carouselCurrentIndex = 0;
                $(".carousel .slides").css("transitionDuration", "0s");
                updateCarouselSlides();
                setTimeout(() => {
                    $(".carousel .slides").css("transitionDuration", "0.5s");
                }, 20);
            } else {
                updateCarouselSlides();
            }
        }

        setInterval(nextCarouselSlide, 3000);
    }
});

// Collapse FAQ
$(document).ready(function () {
    // Toggle the FAQ answer on question click
    $(".faq-question").click(function () {
        const answer = $(this).next(".faq-answer");
        answer.slideToggle(); // Slide up/down for smooth transition
        $(this)
            .find(".toggle-icon")
            .text($(this).find(".toggle-icon").text() === "+" ? "−" : "+"); // Change icon
    });
});

// Hero Slider (Main slider) - Vanilla JavaScript with Multiple Side Slides
let currentSlide = 0;
let heroSlides;
let indicators;
let totalSlides;
let autoSlideInterval;

function updateSlides() {
    heroSlides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

        if (index === currentSlide) {
            // Center active slide
            slide.classList.add('active');
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            // Left side 1
            slide.classList.add('prev');
        } else if (index === (currentSlide + 1) % totalSlides) {
            // Right side 1
            slide.classList.add('next');
        } else if (index === (currentSlide - 2 + totalSlides) % totalSlides) {
            // Left side 2
            slide.classList.add('far-prev');
        } else if (index === (currentSlide + 2) % totalSlides) {
            // Right side 2
            slide.classList.add('far-next');
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlides();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
    resetAutoSlide();
}

function autoSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
}

// Initialize hero slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    heroSlides = document.querySelectorAll('.hero-slider .slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = heroSlides.length;
    
    if (heroSlides.length > 0) {
        // Initialize slides
        updateSlides();

        // Start auto-sliding
        autoSlideInterval = setInterval(autoSlide, 5000);

        // Pause auto-slide on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            heroSlider.addEventListener('mouseleave', () => {
                resetAutoSlide();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });

        // Click on side slides to navigate
        heroSlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (slide.classList.contains('prev') || slide.classList.contains('far-prev')) {
                    changeSlide(-1);
                } else if (slide.classList.contains('next') || slide.classList.contains('far-next')) {
                    changeSlide(1);
                }
            });
        });
    }
});

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}