import { useState } from 'react';
import LikeButton from './LikeButton';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export default function CampaignCard({ 
  campaign, 
  onLike, 
  viewMode = 'voter', // 'voter', 'candidate', or 'public'
  fullWidth = false,
  showDetailsLink = true
}) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleExpand = () => setExpanded(!expanded);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === campaign.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? campaign.images.length - 1 : prev - 1
    );
  };

  const getCampaignLink = () => {
    if (viewMode === 'candidate') return `/candidate/campaigns/${campaign.id}`;
    if (viewMode === 'voter') return `/voter/campaign/${campaign.id}`;
    return `/campaign/${campaign.id}`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${fullWidth ? 'w-full' : ''}`}>
      {/* Header with candidate info */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {campaign.candidateName.charAt(0)}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{campaign.candidateName}</h3>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Campaign content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h2>
          {viewMode === 'candidate' && campaign.status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              campaign.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {campaign.status}
            </span>
          )}
        </div>
        
        <div className={`text-gray-600 ${expanded ? '' : 'line-clamp-3'}`}>
          {campaign.description}
        </div>
        
        {campaign.description.length > 200 && (
          <button 
            onClick={toggleExpand}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Image gallery */}
        {campaign.images?.length > 0 && (
          <div className="mt-4 relative">
            <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={campaign.images[currentImageIndex]}
                alt={`Campaign visual ${currentImageIndex + 1}`}
                className="h-full w-full object-cover"
              />
              
              {campaign.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="flex mt-2 space-x-2 overflow-x-auto py-2">
              {campaign.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 h-12 w-12 rounded-md overflow-hidden border-2 ${currentImageIndex === idx ? 'border-indigo-500' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {campaign.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {campaign.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {showDetailsLink && (
          <div className="mt-4">
            <Link 
              to={getCampaignLink()} 
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              View full campaign details →
            </Link>
          </div>
        )}
      </div>

      {/* Footer with actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        {viewMode !== 'public' ? (
          <LikeButton 
            likes={campaign.likes || 0} 
            liked={campaign.userLiked || false} 
            onLike={onLike ? () => onLike(campaign.id) : null}
            disabled={!onLike}
          />
        ) : (
          <div className="flex items-center text-gray-500">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{campaign.likes || 0} likes</span>
          </div>
        )}
        
        {viewMode === 'candidate' && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {campaign.views || 0} views
            </span>
            {campaign.commentsCount > 0 && (
              <span className="text-sm text-gray-500">
                {campaign.commentsCount} comments
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



