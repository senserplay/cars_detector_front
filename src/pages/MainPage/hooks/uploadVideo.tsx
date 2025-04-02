import { apiInstance } from '@/shared/api/apiConfig';


export const uploadVideo = async (videoFile:File) => {
  const formData = new FormData();
  formData.append('file', videoFile);
  console.log(formData, typeof(videoFile))
  try {
    const response = await apiInstance.post('/upload', formData, {
      
    });
    console.log('Видео успешно загружено:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Ошибка при загрузке видео:', error);
    
    throw error;
  }
};
