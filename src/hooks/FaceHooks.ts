import { RefObject, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import randomstring from '@/lib/randomstring';

const useFaceDetection = () => {
    const [detection, setDetection] = useState<faceapi.FaceDetection | null>(null); // Detected face

    useEffect(() => {
        // Load the face detection models
        const loadModels = async () => {
            try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            console.log('Models loaded');
            } catch (error) {
            console.error('Error loading models:', error);
            }
        };
        loadModels();
    }, []);

    const getDescriptors = async (videoRef: RefObject<HTMLVideoElement>) => {
        if (!videoRef.current) {
            return;
        }

        const result = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions(),
        ).withFaceLandmarks(true).withFaceDescriptor();

        if (!result) {
            console.log('No face detected');
            return;
        }

        console.log('result', result)

        const faceName = randomstring(6);
        const labeledDescriptors = new faceapi.LabeledFaceDescriptors(faceName, [result.descriptor]);
        console.log('result', labeledDescriptors)

        setDetection(result.detection);

        return labeledDescriptors;
    };

    return { detection, getDescriptors };
}

export { useFaceDetection };