import { useEffect, useRef, useState } from "react";
import "./Webcam.css";

export default function Webcam() {
  const camera = useRef<ImageCapture | null>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);

  const drawCanvas = () => {
    if (!canvasCtx.current || !camera.current) {
      return;
    }
    camera.current
      .grabFrame()
      .then((bmp) => {
        if (canvasCtx == null) {
          console.log("no more errors");
        }
        canvasCtx.current?.drawImage(bmp, 0, 0);
        requestAnimationFrame(drawCanvas);
      })
      .catch((err) => console.log(err));
  };

  const startCamera = async () => {
    if (camera == null) {
      return;
    }
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    const vidTrack = mediaStream.getVideoTracks()[0];
    const imgCapture = new ImageCapture(vidTrack);
    camera.current = imgCapture;

    const height = (await imgCapture.getPhotoSettings()).imageHeight || 0;
    const width = (await imgCapture.getPhotoSettings()).imageWidth || 0;

    const canvas = document.getElementById(
      "drawingCanvas"
    ) as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    canvasCtx.current = canvas.getContext("2d");
    requestAnimationFrame(drawCanvas);
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="webcam">
      <div>
        <canvas id="drawingCanvas"></canvas>
      </div>
    </div>
  );
}
