import axios from 'axios';

export async function fetchGallery(word, page = 1) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '38659360-bc0842e55c2c51de5ea7c36c0',
        q: `${word}`,
        image_type: 'photo',
        orientation: ' horizontal',
        safesearch: true,
        page: `${page}`,
        per_page: 12,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
