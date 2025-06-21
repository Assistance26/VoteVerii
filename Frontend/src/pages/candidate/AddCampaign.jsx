import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CampaignForm from '../../components/ui/CampaignForm';
import Loader from '../../components/ui/Loader';

export default function AddCampaign() {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (campaignData) => {
    setIsSubmitting(true);
    try {
      // API call to save campaign
      await saveCampaign({
        ...campaignData,
        candidateId: currentUser.uid,
        candidateName: currentUser.displayName,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      formRef.current.reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h1 className="text-2xl font-bold text-white">Create New Campaign</h1>
          <p className="text-indigo-100 mt-1">
            Share your vision with voters through images, text, and tags
          </p>
        </div>
        
        <div className="p-6">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Campaign published successfully!
              </div>
            </div>
          )}
          
          <CampaignForm 
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              title: '',
              description: '',
              tags: [],
              images: []
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Mock function - replace with actual API call
async function saveCampaign(data) {
  console.log("Saving campaign:", data);
  return new Promise(resolve => setTimeout(resolve, 1500));
}