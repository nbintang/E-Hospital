
//client-side
export async function replaceImageUrlToBase64(imgUrl: string) : Promise<string> {
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return imgUrl; 
  }
  }
