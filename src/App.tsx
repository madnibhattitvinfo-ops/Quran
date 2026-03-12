import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SurahReader } from './pages/SurahReader';
import { PrayerTimes } from './pages/PrayerTimes';
import { Tasbeeh } from './pages/Tasbeeh';
import { Qibla } from './pages/Qibla';
import { Listen } from './pages/Listen';
import { About } from './pages/About';
import { Mushaf } from './pages/Mushaf';
import { QuranIndex } from './pages/QuranIndex';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Home />} />
            <Route path="/surah/:id" element={<SurahReader />} />
            <Route path="/listen" element={<Listen />} />
            <Route path="/prayer" element={<PrayerTimes />} />
            <Route path="/tasbeeh" element={<Tasbeeh />} />
            <Route path="/qibla" element={<Qibla />} />
            <Route path="/about" element={<About />} />
            <Route path="/mushaf" element={<Mushaf />} />
            <Route path="/index" element={<QuranIndex />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

