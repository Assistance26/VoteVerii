import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import Loader from '../ui/Loader'; // Import your loader component

export default function CandidateRoute() {
  const { currentUser } = useAuth();
  const [isCandidate, setIsCandidate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCandidate = async () => {
      try {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          setIsCandidate(userDoc.exists() && userDoc.data().role === 'candidate');
        }
      } catch (error) {
        console.error("Error verifying candidate role:", error);
      } finally {
        setLoading(false);
      }
    };
    checkCandidate();
  }, [currentUser]);

  if (loading) return <Loader />;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isCandidate) return <Navigate to="/" replace />;
  
  return (
    <>
     
      <Outlet /> {/* This renders the nested child routes */}
    </>
  );
}