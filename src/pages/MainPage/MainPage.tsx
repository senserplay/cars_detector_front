import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useVideoUploader } from "./hooks/useVioeoUploader";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const { videoUrl,  handleFileChange, cancelVideo } =
    useVideoUploader();
  const handleConfirm = () => {
    if (videoUrl ) {
      try {
        console.log("try to redirect");

        navigate("/video-frame", { state: { videoUrl } });
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
      {videoUrl && (
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
      )}
    </Box>
  );
}
