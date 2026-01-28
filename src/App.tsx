import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VotePage } from './pages/VotePage';
import { AdminLayout } from './layouts/AdminLayout';
import { ClassRatings } from './pages/ClassRatings';
import { TotalsPage } from './pages/TotalsPage';

function App() {
  return (
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
    </BrowserRouter>
  );
}

export default App;
