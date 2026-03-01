const diveBtn = document.querySelector('.btn');
const aboutSection = document.querySelector('#about');

diveBtn.addEventListener('click', function(e){
    e.preventDefault();

    const start = window.scrollY;
    const end = aboutSection.offsetTop + 320; 
    const distance = end - start;
    const duration = 1400; 

    let startTime = null;

    function animation(currentTime){
        if(!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // easeInOutCubic
        const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, start + distance * ease);

        if(timeElapsed < duration){
        requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
});