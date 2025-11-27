document.addEventListener('DOMContentLoaded', () => {
    const rotateBtn = document.getElementById('rotateBtn');
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const videos = [video1, video2];
    let currentRotation = 0;

    // Helper to switch videos
    function switchVideo(endedVideo, nextVideo) {
        nextVideo.classList.add('active');
        endedVideo.classList.remove('active');

        endedVideo.currentTime = 0;
        endedVideo.pause();

        nextVideo.play().catch(e => console.error("Play failed:", e));
    }

    // Event listeners for video ending
    video1.addEventListener('ended', () => {
        switchVideo(video1, video2);
    });

    video2.addEventListener('ended', () => {
        switchVideo(video2, video1);
    });

    // Rotation logic with scaling
    rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the global click listener
        currentRotation += 90;
        const isRotated = currentRotation % 180 !== 0;
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        videos.forEach(video => {
            video.style.objectFit = 'contain';
            let scale = 1;

            if (isRotated) {
                const vw = video.videoWidth || 1920;
                const vh = video.videoHeight || 1080;
                const videoRatio = vw / vh;
                const windowRatio = winW / winH;

                let rw, rh;
                if (videoRatio > windowRatio) {
                    rw = winW;
                    rh = winW / videoRatio;
                } else {
                    rh = winH;
                    rw = winH * videoRatio;
                }

                // Calculate scale to fit the screen with the rotated video (Contain)
                scale = Math.min(winW / rh, winH / rw);
            }

            video.style.transform = `rotate(${currentRotation}deg) scale(${scale})`;
        });
    });

    // Attempt to play immediately
    const playPromise = video1.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay prevented. Waiting for interaction.");
            // Add a one-time click listener to start playback if autoplay failed
            const startPlay = () => {
                video1.play();
                document.removeEventListener('click', startPlay);
            };
            document.addEventListener('click', startPlay);
        });
    }
});
