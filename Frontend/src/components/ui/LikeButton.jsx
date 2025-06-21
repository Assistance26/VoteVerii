import { useState } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function LikeButton({ likes, liked, onLike }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onLike();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1 group focus:outline-none"
      aria-label={liked ? 'Unlike this campaign' : 'Like this campaign'}
    >
      <div className="relative">
        {liked ? (
          <HeartSolid className={`h-6 w-6 text-red-500 ${isAnimating ? 'animate-ping' : ''}`} />
        ) : (
          <HeartOutline className="h-6 w-6 text-gray-400 group-hover:text-red-500" />
        )}
      </div>
      <span className={`text-sm ${liked ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
        {likes}
      </span>
    </button>
  );
}