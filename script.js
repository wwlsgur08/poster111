document.addEventListener('DOMContentLoaded', () => {
    const rotateBtn = document.getElementById('rotateBtn');
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const videos = [video1, video2];
    let currentRotation = 0;
    let activeVideoIndex = 0;

    // Start playing the first video
    video1.play();

    function switchVideo(endedVideo, nextVideo) {
        nextVideo.classList.add('active');
        endedVideo.classList.remove('active');

        // Reset the ended video
        endedVideo.currentTime = 0;
        endedVideo.pause(); // Ensure it stops

        // Play the next video
        nextVideo.play().catch(e => console.error("Play failed:", e));
    }

    video1.addEventListener('ended', () => {
        switchVideo(video1, video2);
        activeVideoIndex = 1;
    });

    video2.addEventListener('ended', () => {
        document.addEventListener('DOMContentLoaded', () => {
            const rotateBtn = document.getElementById('rotateBtn');
            const video1 = document.getElementById('video1');
            const video2 = document.getElementById('video2');
            const videos = [video1, video2];
            let currentRotation = 0;
            let activeVideoIndex = 0;

            // Start playing the first video
            video1.play();

            function switchVideo(endedVideo, nextVideo) {
                nextVideo.classList.add('active');
                endedVideo.classList.remove('active');

                // Reset the ended video
                endedVideo.currentTime = 0;
                endedVideo.pause(); // Ensure it stops

                // Play the next video
                nextVideo.play().catch(e => console.error("Play failed:", e));
            }

            video1.addEventListener('ended', () => {
                switchVideo(video1, video2);
                activeVideoIndex = 1;
            });

            video2.addEventListener('ended', () => {
                switchVideo(video2, video1);
                activeVideoIndex = 0;
            });

            rotateBtn.addEventListener('click', () => {
                currentRotation += 90;
                const isRotated = currentRotation % 180 !== 0;

                videos.forEach(video => {
                    let scale = 1;

                    if (isRotated) {
                        // When rotated 90deg, we want to fill the screen.
                        // We need to scale the video element so that its rotated dimensions cover the viewport.
                        // The video element is 100vw x 100vh.
                        // Rotated, it effectively becomes height x width.
                        // We calculate the scale factor to ensure it covers the screen.
                        const width = window.innerWidth;
                        const height = window.innerHeight;

                        // Scale to cover: we need the smaller dimension of the rotated box (which was the larger dimension)
                        // to match the larger dimension of the screen?
                        // Actually, simply: we are mapping H -> W and W -> H.
                        // We need to scale such that the new width (old H) >= Screen W
                        // AND new height (old W) >= Screen H.
                        // Scale = max(ScreenW / OldH, ScreenH / OldW)
                        // But OldW = ScreenW, OldH = ScreenH.
                        // So Scale = max(ScreenW / ScreenH, ScreenH / ScreenW).
                        scale = Math.max(width / height, height / width);

                        video.style.objectFit = 'cover';
                    } else {
                        video.style.objectFit = 'contain';
                    }

                    video.style.transform = `rotate(${currentRotation}deg) scale(${scale})`;
                });
            });
        });
