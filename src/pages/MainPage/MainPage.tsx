import { Box, Button, Flex, HStack, Input, Spinner, Text } from "@chakra-ui/react";
import { useVideoUploader } from "./hooks/useVioeoUploader";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "./hooks/uploadVideo";
import { useState } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const { videoUrl, videoFile, handleFileChange, cancelVideo } =
    useVideoUploader();
  const [isTup,setIsTup]=useState(false);
  const handleConfirm = async () => {
    if (videoUrl && videoFile) {
      setIsTup(true);
      console.log("Тип файла:", videoFile.type);
      console.log("Размер файла:", videoFile.size);
      try {
        const result = await uploadVideo(videoFile);
        console.log("Ответ от сервера:", result);
        const { file_name } = result;

        navigate("/video-frame", {
          state: {
            videoUrl,
            fileName: file_name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box p={20} display="flex" alignItems="center" flexDirection="column">
      <Text fontSize="2xl" mb={4}>
        Загрузка видео
      </Text>
      {!videoUrl && (
        <Input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          mb={4}
          variant="subtle"
        />
      )}
      {videoUrl &&
        (isTup ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          <>
            <HStack mb={4}>
              <Button colorPalette="blue" onClick={handleConfirm}>
                Начать работу с видео
              </Button>
              <Button colorPalette="gray.300" onClick={cancelVideo}>
                Отмена
              </Button>
            </HStack>
          </>
        ))}
    </Box>
  );
}
