import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};


export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    const video = videoRef.current;

    // 1. Check if model and video exist
    if (!landmarkerRef.current || !video) return;

    // 2. Check if video is ready for processing
    if (
        video.readyState < 2 ||
        video.videoWidth <= 0 ||
        video.videoHeight <= 0
    ) {
        console.log("Video frame is not ready yet");
        return;
    }

    try {
        // 3. Detect facial features
        const results = landmarkerRef.current.detectForVideo(
            video,
            performance.now()
        );

        // 4. Check if a face is detected
        if (!results.faceBlendshapes?.length) {
            setExpression("Neutral");
            return "Neutral";
        }

        const blendshapes = results.faceBlendshapes[0].categories;

        // 5. Get individual facial feature scores
        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score ?? 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        // 6. Classify expression
        let currentExpression = "Neutral";

        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "Happy";
        } else if (jawOpen > 0.2 && browUp > 0.2) {
            currentExpression = "Surprised";
        } else if (frownLeft > 0.3 && frownRight > 0.3) {
            currentExpression = "Sad";
        }

        // 7. Update React state
        setExpression(currentExpression);

        return currentExpression;

    } catch (error) {
        console.error("Face detection failed:", error);
        return;
    }
};

