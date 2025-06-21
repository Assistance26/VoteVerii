

// import { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import CampaignCard from '../../components/ui/CampaignCard';
// import Loader from '../../components/ui/Loader';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function CampaignList() {
//   const { currentUser } = useAuth();
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCampaigns() {
//       if (!currentUser) return;

//       try {
//         const token = await currentUser.getIdToken();

//         const res = await axios.get('http://localhost:5000/api/posts/all', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const allPosts = res.data.data;

//         // Filter only posts created by current candidate
//         const myCampaigns = allPosts.filter(
//           post => post.candidate?.email === currentUser.email
//         );

//         const formatted = myCampaigns.map(post => ({
//           id: post.id,
//           title: post.title,
//           description: post.description,
//           images: post.images?.map(img => `http://localhost:5000/uploads/${img}`) || [],
//           candidateId: post.candidate?._id,
//           candidateName: post.candidate?.name || 'Unknown',
//           createdAt: post.postedAt,
//           likes: post.likes || 0,
//           views: post.comments?.length || 0
//         }));

//         setCampaigns(formatted);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCampaigns();
//   }, [currentUser]);

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-indigo-800">Your Campaigns</h1>
//             <p className="mt-1 text-gray-600">View and manage all your active campaigns</p>
//           </div>
//           <Link
//             to="/candidate/add-campaign"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//           >
//             Create New Campaign
//           </Link>
//         </div>

//         {campaigns.length === 0 ? (
//           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No campaigns yet</h3>
//             <p className="mt-1 text-gray-500">Get started by creating your first campaign</p>
//             <div className="mt-6">
//               <Link
//                 to="/candidate/add-campaign"
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//               >
//                 Create Campaign
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {campaigns.map((campaign) => (
//               <CampaignCard
//                 key={campaign.id}
//                 campaign={campaign}
//                 viewMode="candidate"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
