import React from 'react';
const ResultCard = ({ result, link, onCopy, copied }) => {
  if (!result) return null;

  return (
    <div className="bg-[#141414] py-7 px-8 rounded-xl border border-[#1f1f1f] mb-6 animate-slideUp">
      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 mb-4 overflow-x-auto">
        <code>{result}</code>
      </div>
      <button onClick={onCopy} className="w-full py-3 bg-[#1f1f1f] text-white border-[1.5px] border-[#2a2a2a] rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#3a3a3a]">
        {copied ? 'copied!' : 'copy to clipboard'}
      </button>
      <p className="mt-3.5 text-[13px] text-[#666] text-center">
        redirects to: <span className='text-[#4ade80] font-medium'  >{link}</span>
      </p>
    </div>
  );
};

export default ResultCard;