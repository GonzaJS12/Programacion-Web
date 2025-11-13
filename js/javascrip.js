document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carouselContainer => {
        const track = carouselContainer.querySelector('.carousel-track');
        const slides = Array.from(carouselContainer.querySelectorAll('.carousel-image'));
        const nextButton = carouselContainer.querySelector('.next');
        const prevButton = carouselContainer.querySelector('.prev');
        
        // Si no se encuentran todos los elementos, salta este carrusel
        if (!track || slides.length === 0 || !nextButton || !prevButton) {
            console.error('Faltan elementos para inicializar el carrusel:', carouselContainer.id);
            return;
        }

        const slideWidth = slides[0].getBoundingClientRect().width;
        let slideIndex = 0;

        // Función para mover el carrusel
        const moveToSlide = (track, currentSlide, targetSlide) => {
            const amountToMove = targetSlide.offsetLeft;
            track.style.transform = 'translateX(-' + amountToMove + 'px)';
            slideIndex = slides.indexOf(targetSlide);
        };
        
        // Mover a la primera imagen al inicio (necesario por si el navegador carga con scroll)
        moveToSlide(track, slides[0], slides[0]); 

        // Botón Siguiente
        nextButton.addEventListener('click', () => {
            let targetIndex = slideIndex + 1;
            if (targetIndex >= slides.length) {
                targetIndex = 0; // Vuelve al inicio
            }
            const targetSlide = slides[targetIndex];
            moveToSlide(track, slides[slideIndex], targetSlide);
        });

        // Botón Anterior
        prevButton.addEventListener('click', () => {
            let targetIndex = slideIndex - 1;
            if (targetIndex < 0) {
                targetIndex = slides.length - 1; // Va al final
            }
            const targetSlide = slides[targetIndex];
            moveToSlide(track, slides[slideIndex], targetSlide);
        });
        
        // Ajuste de Responsive: Recalcular el ancho si la ventana cambia de tamaño
        window.addEventListener('resize', () => {
             // Esto asegura que el desplazamiento sea siempre el 100% del contenedor actual
             const currentSlide = slides[slideIndex];
             if (currentSlide) {
                 moveToSlide(track, currentSlide, currentSlide);
             }
        });

    });
});