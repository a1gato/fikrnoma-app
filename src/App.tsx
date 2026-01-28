import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VotePage } from './pages/VotePage';
import { AdminLayout } from './layouts/AdminLayout';
import { ClassRatings } from './pages/ClassRatings';
import { TotalsPage } from './pages/TotalsPage';

import { LanguageProvider } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Voting Route */}
          <Route path="/" element={<VotePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/vote/:classCode" element={<VotePage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<TotalsPage />} />
            <Route path="totals" element={<TotalsPage />} />
            <Route path="class/:className" element={<ClassRatings />} />
          </Route>
        </Routes>
        <LanguageSwitcher />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
