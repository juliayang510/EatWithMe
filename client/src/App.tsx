import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { DMsPage } from './pages/DMsPage'
import { ExplorePage } from './pages/ExplorePage'
import { MatchesPage } from './pages/MatchesPage'
import { ModeSelectPage } from './pages/onboarding/ModeSelectPage'
import { ProfileSetupPage } from './pages/onboarding/ProfileSetupPage'
import { SignInPage } from './pages/onboarding/SignInPage'
import { ProfilePage } from './pages/ProfilePage'
import { RequireOnboarding } from './routes/RequireOnboarding'

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/onboarding/profile" element={<ProfileSetupPage />} />
      <Route path="/onboarding/mode" element={<ModeSelectPage />} />

      <Route
        element={
          <RequireOnboarding>
            <AppShell />
          </RequireOnboarding>
        }
      >
        <Route index element={<Navigate to="/explore" replace />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/dms" element={<DMsPage />} />
        <Route path="/dms/:roomId" element={<DMsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
