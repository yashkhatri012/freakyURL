import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Toast from '../components/Toast';



function RedirectPage()  {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);


  useEffect(()=>{
    const resolveAndRedirect = async ()=>{
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (!apiUrl) {
          throw new Error('API URL not configured');
        }


        const response = await fetch(`${apiUrl}/api/resolve/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Invalid or expired link');
        }
        console.log("API URL:", apiUrl);
        console.log("Resolve URL:", `${apiUrl}/api/resolve/${slug}`);
        // Redirect to the long URL
        window.location.href = data.longUrl;
        }catch (err) {
        setError(err.message || 'Failed to resolve link');
        setShowToast(true);
        setLoading(false);
      }


    }
    resolveAndRedirect();
  }, [slug]);

  return (
  <div className="min-h-screen p-5 flex items-center justify-center">
    <div className="max-w-170 w-full mx-auto py-6 px-3 box-border">

      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2 tracking-[-0.5px] text-white">
          FreakyURL
        </h1>
        <p className="text-[#888] text-base">
          make your links look suspicious
        </p>
      </header>

      <div className="flex flex-col items-center justify-center min-h-100 gap-5">

        {loading && (
          <>
            <div className="w-10 h-10 border-4 border-[#f0f0f0] border-t-[#ff6b6b] rounded-full animate-spin" />
            <p className="text-[#666] text-base">
              Resolving your link...
            </p>
          </>
        )}

        {error && !loading && (
          <div className="p-5 bg-[#fee] border border-[#fcc] rounded-lg text-[#c33] text-center max-w-100">
            <p className="mb-2.5 font-medium">Link not found</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

      </div>
    </div>

    <Toast
      message={error}
      show={showToast}
      onClose={() => setShowToast(false)}
    />
  </div>
);
}

export default RedirectPage;