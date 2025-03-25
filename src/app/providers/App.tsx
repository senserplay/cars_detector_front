import MainPage from "@/pages/MainPage/MainPage";
import VideoFrame from "@/pages/VideoFrame/VideoFrame";
import { Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/video-frame" element={<VideoFrame />} />
 
        </Routes>
    );
}