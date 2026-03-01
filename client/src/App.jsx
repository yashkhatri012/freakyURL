
import { useState } from 'react'
import './App.css'
import LinkForm from './components/LinkForm'
import ResultCard from './components/ResultCard'
import { normalizeAndValidateUrl } from './utils/validation';



function App() {
    const [link, setLink] = useState("");
  const [phrase, setPhrase] = useState("");
  
  const [result, setResult] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
    
// Generate and send to backend
  const handleGenerate = async () => {
    if (!link) return;

    if (!phrase.trim()) {
      showErrorToast("Please enter a phrase");
      return;
    }

    let longUrl;
    try {
      longUrl = normalizeAndValidateUrl(link);
    } catch (err) {
      showErrorToast(err.message);
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, phrase }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      // Construct full short URL with frontend domain
      const frontendUrl = window.location.origin;
      const shortUrl = `${frontendUrl}/${data.slug}`;
      setResult(shortUrl);
      // Measurement ID stuff
      if (window.gtag) {
        window.gtag("event", "generate_link", {
          slug: data.slug,
          method: "custom_phrase",
        });
      }
    } catch (err) {
      showErrorToast(err.message || "Failed to contact the server");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    // Measurement ID stuff
    if (window.gtag) {
      window.gtag("event", "copy_link", {
        short_url: result,
      });
    }

    setTimeout(() => setCopied(false), 1500);
  };

  const showErrorToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

 
  return (
    <>
      
      <div className=" text-[#ffffff] min-h-screen p-5 flex items-center justify-center bg-[#0a0a0a]">
        <div className='max-w-170 w-full mx-auto py-6 px-3 box-border'>
          <header className='text-center mb-12'>
            <h1 className='text-5xl font-bold text-center mb-3'>FreakyURL</h1>  
            <p className='text-[#888] text-16px'>Make your links look suspicious</p>
          </header>

          <LinkForm
            link={link}
          setLink={setLink}
          phrase={phrase}
          setPhrase={setPhrase}
          setLoading={setLoading}
          loading={loading}
          onGenerate={handleGenerate}
        />

        <ResultCard
          result={result}
          link={link}
          onCopy={handleCopy}
          copied={copied}
        />

        <footer className='text-center p-20px'>
          <p className='text-[#555] text-13px '>  
            NOTE: This is a fun project. Don't use it for any malicious
            activities.
          </p>
        </footer>

        </div>
      </div>
    </>
  )
}

export default App
