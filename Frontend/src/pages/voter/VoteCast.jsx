import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';

export default function VotingHistory() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [votingHistory, setVotingHistory] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Simulate API calls
        const history = await fetchUserVotingHistory(currentUser.uid);
        setVotingHistory(history);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-800">Your Voting History</h1>
          <p className="mt-2 text-gray-600">
            View all elections you've participated in and their outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Voting History List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Your Participated Elections
            </h2>
            
            {votingHistory.length === 0 ? (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500">No voting history found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {votingHistory.map((election) => (
                  <div 
                    key={election.id}
                    onClick={() => setSelectedElection(election)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedElection?.id === election.id 
                      ? 'bg-indigo-100 border-l-4 border-indigo-500' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
                  >
                    <h3 className="font-medium text-gray-800">{election.title}</h3>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className={`px-2 py-1 rounded-full ${election.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'}`}>
                        {election.status}
                      </span>
                      <span className="text-gray-500">
                        {new Date(election.votedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Election Details */}
          <div className="lg:col-span-2">
            {selectedElection ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedElection.title}
                      </h2>
                      <p className="mt-1 text-gray-600">
                        {selectedElection.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedElection.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}`}>
                      {selectedElection.status}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-700 mb-3">Your Vote</h3>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {selectedElection.userVote.choice.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{selectedElection.userVote.choice}</p>
                          <p className="text-sm text-gray-500">
                            Voted on {new Date(selectedElection.votedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-700 mb-3">Voting Method</h3>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Secure Digital Ballot</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Verified with {selectedElection.verificationMethod}
                      </p>
                    </div>
                  </div>

                  {/* Results Section */}
                  {selectedElection.status === 'completed' && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Election Results</h3>
                      
                      <div className="space-y-4">
                        {selectedElection.results.candidates.map((candidate, idx) => (
                          <div key={candidate.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  <span className="font-medium">{idx + 1}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{candidate.name}</p>
                                  <p className="text-sm text-gray-500">{candidate.party}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{candidate.votes} votes</p>
                                <p className="text-sm text-gray-500">
                                  {((candidate.votes / selectedElection.results.totalVotes) * 100).toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-indigo-500'}`} 
                                style={{ width: `${(candidate.votes / selectedElection.results.totalVotes) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 text-blue-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-medium">
                            {selectedElection.results.winner === selectedElection.userVote.choice 
                              ? "Your chosen candidate won this election!" 
                              : "The election results are now final."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-200 h-full flex items-center justify-center">
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No election selected</h3>
                  <p className="mt-1 text-gray-500">Select an election from your history to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock API function
async function fetchUserVotingHistory(userId) {
  // In a real app, this would be an API call
  return [
    {
      id: "elec-2023-001",
      title: "2023 National General Election",
      description: "Election for National Assembly Representatives",
      status: "completed",
      votedAt: "2023-11-15T08:30:00Z",
      verificationMethod: "Biometric Authentication",
      userVote: {
        choice: "Democratic Progressive Party",
        timestamp: "2023-11-15T08:32:18Z"
      },
      results: {
        totalVotes: 1250000,
        winner: "Democratic Progressive Party",
        candidates: [
          {
            id: "cand-001",
            name: "Democratic Progressive Party",
            party: "DPP",
            votes: 650000
          },
          {
            id: "cand-002",
            name: "National Unity Party",
            party: "NUP",
            votes: 450000
          },
          {
            id: "cand-003",
            name: "Green Future Alliance",
            party: "GFA",
            votes: 150000
          }
        ]
      }
    },
    {
      id: "elec-2023-002",
      title: "2023 Regional Council Election",
      description: "Election for Regional Council Members",
      status: "ongoing",
      votedAt: "2023-12-01T10:15:00Z",
      verificationMethod: "Blockchain Verification",
      userVote: {
        choice: "Independent Candidate",
        timestamp: "2023-12-01T10:17:42Z"
      },
      results: null
    }
  ];
}