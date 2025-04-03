import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { apiInstance } from "@/shared/api/apiConfig";

interface Point {
  x: number;
  y: number;
}

export default function VideoFrame() {
  const { state } = useLocation();
  const { videoUrl, fileName } = state;
  const [isTup,setIsTup]=useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [firstFrameImg, setFirstFrameImg] = useState<string | null>(null);
  const [carsCount, setCarsCount] = useState<number | null>(null); // Новое состояние

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.addEventListener("loadeddata", () => {
      // Переходим к первому кадру
      video.currentTime = 0;
    });
    video.addEventListener("seeked", () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setFirstFrameImg(canvas.toDataURL());
    });
  }, [videoUrl]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (points.length >= 8) return;
    const newPoint: Point = { x: Math.round(x), y: Math.round(y) };
    setPoints([...points, newPoint]);
  };

  useEffect(() => {
    if (!firstFrameImg) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = firstFrameImg;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      points.forEach((pt, index) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.font = "14px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText(String(index + 1), pt.x + 8, pt.y - 8);
      });
    };
  }, [points, firstFrameImg]);

  const handleProcess = async () => {
    if (points.length !== 8) {
      alert("Пожалуйста, выберите 8 точек.");
      return;
    }
    setIsTup(true)
    const region1 = points.slice(0, 4);
    const region2 = points.slice(4, 8);
    
   
    console.log(region1, region2);
    const payload = {
      file_name: state.fileName,
      start: region1,
      end: region2,
    };
    console.log('payload',payload)
    try {
      const response = await apiInstance.post("/process-video", payload,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("запрос прошел", response.data);
      
      // const data = await response.json();
      alert(`Количество машин: ${response.data.cars_cnt}`);
      setCarsCount(response.data.cars_cnt);
      setIsTup(false)
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при обработке видео.");
    }
  };

  return (
    <Box p={20}>
      <Text fontSize="2xl" mb={4}>
        Выберите 8 точек на первом кадре видео (сначала 4 для первого региона,
        затем 4 для второго)
      </Text>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ border: "1px solid #ccc", cursor: "crosshair" }}
      />
          {isTup?(
          <Spinner size="xl" color="blue.500" />

          ):carsCount === null ? (<><Box mt={4}>
        <Button onClick={handleProcess} disabled={points.length !== 8}>
          Получить результат
        </Button>
      </Box>
      <Box mt={2}>
        <Text>Выбрано точек: {points.length} из 8</Text>
      </Box></>):(
        <Box mt={4}>
          <Text fontSize="xl">Количество машин: {carsCount}</Text>
        </Box>
      )}
      
    </Box>
  );
}
