import axios from 'axios';
import { Surah, Ayah, Edition, PrayerTimes } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const getSurahs = async (): Promise<Surah[]> => {
  const response = await axios.get(`${BASE_URL}/surah`);
  return response.data.data;
};

export const getSurahDetail = async (surahNumber: number, translationEdition: string = 'en.sahih'): Promise<{ ayahs: Ayah[], surah: Surah }> => {
  const response = await axios.get(`${BASE_URL}/surah/${surahNumber}/editions/quran-uthmani,${translationEdition}`);
  const data = response.data.data;
  
  const uthmani = data[0];
  const translation = data[1];

  const ayahs = uthmani.ayahs.map((ayah: any, index: number) => ({
    ...ayah,
    translation: translation.ayahs[index].text,
  }));

  return { ayahs, surah: uthmani };
};

export const getTranslationEditions = async (): Promise<Edition[]> => {
  const response = await axios.get(`${BASE_URL}/edition?format=text&type=translation`);
  return response.data.data;
};

export const getPage = async (pageNumber: number, edition: string = 'quran-uthmani'): Promise<{ ayahs: Ayah[], pageNumber: number }> => {
  const response = await axios.get(`${BASE_URL}/page/${pageNumber}/${edition}`);
  return { ayahs: response.data.data.ayahs, pageNumber };
};

export const getPrayerTimes = async (latitude: number, longitude: number): Promise<PrayerTimes> => {
  const response = await axios.get(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
  return response.data.data.timings;
};

export const getQaris = async (): Promise<Edition[]> => {
  const response = await axios.get(`${BASE_URL}/edition?format=audio&type=versebyverse`);
  return response.data.data;
};
