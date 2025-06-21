import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Auth Guards
import AdminRoute from './components/auth/AdminRoute';
import CandidateRoute from './components/auth/CandidateRoute';
import VoterRoute from './components/auth/VoterRoute';

// Shared Components
import Chat from './components/Chat';

// Public Pages
import Home from './pages/landing/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AnalyzerPage from './pages/AnalyzerPage';
import ElectionReports from './pages/ElectionReports';
import NotFound from './pages/shared/NotFound';

// Campaign Pages
import AddCampaign from './pages/candidate/AddCampaign';
// import CandidateCampaignList from './pages/candidate/CampaignList';
import VoterCampaignList from './pages/voter/CampaignList';
import VoterCampaign from './pages/voter/Campaign';
import PublicCampaign from './pages/landing/Campaign';

// Dashboards
import AdminDashboard from './pages/admin/Dashboard';
import VoterDashboard from './pages/voter/Dashboard';
import CandidateDashboard from './pages/candidate/Dashboard';
import ApproveCandidate from './pages/admin/ApproveCandidate';
import CreateElection from './pages/admin/CreateElection';
import AdminCloseExpiredElections from './pages/admin/AdminCloseExpiredElections';
import ParticipateElection from './pages/candidate/ParticipateElection';
import ElectionList from './pages/voter/ElectionList'
import ElectionDetails from './pages/voter/ElectionDetails';



function App() {
  return (
    <AuthProvider>
      {/* Global Chat Component */}
      <Chat />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
        <Route path="/election-report" element={<ElectionReports />} />
        <Route path="/campaign" element={<VoterCampaignList />} />
        <Route path="/campaign/:id" element={<PublicCampaign />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="approvals" element={<ApproveCandidate />} />
          <Route path="create-election" element={<CreateElection />} />
          <Route path="close-election" element={<AdminCloseExpiredElections />} />
          <Route path="election-reports" element={<ElectionReports />} />
        </Route>

        {/* Voter Routes */}
        <Route path="/voter" element={<VoterRoute />}>
          <Route index element={<VoterDashboard />} />
          <Route path="dashboard" element={<VoterDashboard />} />
          <Route path="campaign" element={<VoterCampaignList />} />
          <Route path="campaign/:id" element={<VoterCampaign />} />
          <Route path="election-list" element={<ElectionList />} />
          <Route path="election-list/:id" element={<ElectionDetails />} />
          <Route path="election-reports" element={<ElectionReports />} />
        </Route>

        {/* Candidate Routes */}
        <Route path="/candidate" element={<CandidateRoute />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="add-campaign" element={<AddCampaign />} />
          {/* <Route path="campaigns" element={<CandidateCampaignList />} /> */}
          <Route path="participate-election" element={<ParticipateElection />} />
          <Route path="election-reports" element={<ElectionReports />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
