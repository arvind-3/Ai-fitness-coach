let frameCount = 0;
const detectionInterval = 2; // detect pose every 2 frames

async function detectPose() {
    if (!isWorkoutActive) return;

    frameCount++;
    if (frameCount % detectionInterval === 0) {
        try {
            const poses = await detector.estimatePoses(video);
            drawKeypoints(poses);
            analyzeForm(poses);
        } catch (error) {
            console.error('Error detecting pose:', error);
        }
    }

    requestAnimationFrame(detectPose);
}
detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
);
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        frameRate: { ideal: 30 }  // you can try 60 if your webcam supports it
    }
});


