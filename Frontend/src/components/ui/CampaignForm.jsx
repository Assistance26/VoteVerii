
// import { forwardRef, useState } from 'react';
// import axios from 'axios';
// import TextInput from '../TextInput';
// import TagInput from './TagInput';
// import MediaGallery from './MediaGallery';
// import { useAuth } from '../../contexts/AuthContext'; // 👈 adjust as needed

// const CampaignForm = forwardRef(({ initialData = {} }, ref) => {
//   const { currentUser } = useAuth(); // 👈 get user
//   const [title, setTitle] = useState(initialData.title || '');
//   const [description, setDescription] = useState(initialData.description || '');
//   const [tags, setTags] = useState(initialData.tags || []);
//   const [images, setImages] = useState(initialData.images || []);
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setSuccessMessage('');

  //   try {
  //     if (!currentUser) {
  //       throw new Error('User not logged in');
  //     }

  //     const token = await currentUser.getIdToken();
  //     console.log(currentUser, "current user in campaign form");
      
  //     const response = await axios.post(
  //       'http://localhost:5000/api/posts',
  //       { 
  //         email: currentUser.email, // 👈 use candidateId from user context
  //         title,
  //         description,
  //         tags,
  //         images,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setSuccessMessage('Campaign published successfully!');
  //     setTitle('');
  //     setDescription('');
  //     setTags([]);
  //     setImages([]);
  //   } catch (error) {
  //     console.error('Axios Error:', error);
  //     alert(error?.response?.data?.message || 'Something went wrong!');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//   return (
//     <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
//       {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//           Campaign Title
//         </label>
//         <TextInput
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter a compelling title"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//           Campaign Message
//         </label>
//         <textarea
//           id="description"
//           rows={6}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Explain your campaign goals, vision, and plans"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Tags
//         </label>
//         <TagInput tags={tags} setTags={setTags} />
//         <p className="mt-1 text-xs text-gray-500">
//           Add relevant tags to help voters find your campaign
//         </p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Media
//         </label>
//         <MediaGallery images={images} setImages={setImages} />
//         <p className="mt-1 text-xs text-gray-500">
//           Upload images to make your campaign more engaging (max 5 images)
//         </p>
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md"
//         >
//           {isLoading ? 'Publishing...' : 'Publish Campaign'}
//         </button>
//       </div>
//     </form>
//   );
// });

// CampaignForm.displayName = 'CampaignForm';

// export default CampaignForm;


 // for multiple images
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   formData.append('title', title);
  //   formData.append('description', description);
  //   formData.append('email', email); // for backend user lookup
  //   if (image) formData.append('image', image);

  //   try {
  //     const res = await axios.post('http://localhost:5000/api/posts', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });
  //     console.log('Uploaded post:', res.data);
  //     setStatus('Post created!');
  //   } catch (err) {
  //     console.error('Upload failed:', err);
  //     setStatus('Upload failed');
  //   }
  // };

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export default function CampaignCreate({ email }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const { currentUser } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSuccessMessage('');

  try {
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    const token = await currentUser.getIdToken();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('email', currentUser.email); // from Firebase user

    // Optional: append image file(s) if available
    if (images?.[0]) {
      formData.append('image', images[0]); // assuming single image for now
    }

    // Optional: if tags are used and expected as array
    if (tags && tags.length > 0) {
      formData.append('tags', JSON.stringify(tags)); // send as JSON string
    }

    const response = await axios.post(
      'http://localhost:5000/api/posts',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setSuccessMessage('Campaign published successfully!');
    setTitle('');
    setDescription('');
    setTags([]);
    setImages([]);
  } catch (error) {
    console.error('Axios Error:', error);
    alert(error?.response?.data?.message || 'Something went wrong!');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Create Campaign</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImages(e.target.files[0])}
        className="block"
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Upload
      </button>
      <p className="text-sm text-gray-600">{status}</p>
    </form>
  );
}
