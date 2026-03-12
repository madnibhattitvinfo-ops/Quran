export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio?: string;
  audioSecondary?: string[];
  translation?: string;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  lastRead?: {
    surahNumber: number;
    ayahNumber: number;
    timestamp: string;
  };
  bookmarks?: {
    surahNumber: number;
    ayahNumber: number;
  }[];
  tasbeehCounts?: {
    [key: string]: number;
  };
}
