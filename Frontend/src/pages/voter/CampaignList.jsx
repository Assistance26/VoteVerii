import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CampaignCard from '../../components/ui/CampaignCard';
import Loader from '../../components/ui/Loader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { log } from '@tensorflow/tfjs';




export default function CampaignList() {
  const { currentUser } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const token = currentUser ? await currentUser.getIdToken() : null;

        const res = await axios.get('http://localhost:5000/api/posts/all', {

          headers: token ? { Authorization: `Bearer ${token}` } : {}

        });
        console.log('Response from API:', res.data);
        const formatted = res.data.data.map(post => ({

          id: post.id,
          title: post.title,
          description: post.description,
          // images: post.images?.map(img => `http://localhost:5000/uploads/${img}`) || [],
          images: post.imageUrl ? [`http://localhost:5000${post.imageUrl}`] : [],

          candidateId: post.candidate?._id,
          candidateName: post.candidate?.name || 'Unknown',
          createdAt: post.postedAt,
          likes: post.likes || 0,
          views: post.comments?.length || 0
        }));

        setCampaigns(formatted);
        console.log('Fetched campaigns:', formatted);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [currentUser]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">All Campaigns</h1>
            <p className="mt-1 text-gray-600">Explore campaigns from all candidates</p>
          </div>
        </div>

        {campaigns.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No campaigns available</h3>
            <p className="mt-1 text-gray-500">Please check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                viewMode="voter"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
