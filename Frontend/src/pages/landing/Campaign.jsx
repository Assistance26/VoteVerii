import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CampaignCard from '../../components/ui/CampaignCard';
import Loader from '../../components/ui/Loader';
import { useAuth } from '../../contexts/AuthContext';

export default function PublicCampaign() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // Replace with actual API call
        const data = await getPublicCampaign(id);
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <Loader />;
  if (!campaign) return <div className="text-center py-10">Campaign not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CampaignCard 
          campaign={campaign}
          viewMode="public"
          fullWidth
        />
        
        {!currentUser && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-blue-800">
              Want to interact with campaigns?{' '}
              <Link to="/login" className="font-semibold hover:underline">
                Sign in as a voter
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

async function getPublicCampaign(id) {
  // Replace with actual API call
  return {
    id,
    title: "Sample Campaign",
    description: "This is a sample campaign description...",
    tags: ["education", "reform"],
    images: ["https://source.unsplash.com/random/600x400/?school"],
    candidateId: "cand-001",
    candidateName: "Alex Johnson",
    createdAt: new Date().toISOString(),
    likes: 124
  };
}