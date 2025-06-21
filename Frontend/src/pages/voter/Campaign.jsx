import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CampaignCard from '../../components/ui/CampaignCard';
import Loader from '../../components/ui/Loader';
import NotFound from '../../pages/shared/NotFound';

export default function Campaign() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        // Replace with actual API call
        const data = await getCampaignById(id);
        if (!data) {
          setNotFound(true);
          return;
        }
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaign();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      // API call to like/unlike
      await toggleLike(id, currentUser.uid);
      setCampaign(prev => ({
        ...prev,
        likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
        userLiked: !prev.userLiked
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) return <Loader />;
  if (notFound) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CampaignCard 
          campaign={campaign} 
          onLike={currentUser ? handleLike : null}
          viewMode="voter"
          fullWidth
        />
      </div>
    </div>
  );
}

// Mock functions - replace with actual API calls
async function getCampaignById(id) {
  return {
    id: id,
    title: "Education Reform Initiative",
    description: "Detailed campaign description here...",
    tags: ["education", "reform"],
    images: [
      "https://source.unsplash.com/random/600x400/?school",
      "https://source.unsplash.com/random/600x400/?classroom"
    ],
    candidateId: "cand-001",
    candidateName: "Alex Johnson",
    createdAt: "2023-10-15T09:30:00Z",
    likes: 124,
    userLiked: false
  };
}

async function toggleLike(campaignId, userId) {
  console.log(`Toggling like for campaign ${campaignId} by user ${userId}`);
  return new Promise(resolve => setTimeout(resolve, 500));
}