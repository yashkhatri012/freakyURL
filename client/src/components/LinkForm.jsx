import React, { useState } from 'react'

const LinkForm = ({link , setLink, phrase, setPhrase, loading, onGenerate}) => {

 
    
  return (
    <div className='bg-[#141414] p-8 rounded-xl border border-[#1f1f1f] mb-6'>
      <div className='mb-2'>
        <label className='block mb-3 text-sm font-medium text-white' htmlFor="link">Enter your URL</label>
        <input className='w-full py-3 px-3.5 border-[1.5px] border-[#2a2a2a] rounded-lg text-[15px] transition-colors duration-200 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4a4a4a]'
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-2 text-sm font-medium text-white' >Custom Phrase</label>
        <input className='w-full py-3 px-3.5 border-[1.5px] border-[#2a2a2a] rounded-lg text-[15px] transition-colors duration-200 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4a4a4a]'
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="type something sketchy..."
        />
      </div>
       <button
        onClick={onGenerate}
        disabled={!link || !phrase.trim() || loading}
        className="w-full py-3.5 bg-white text-[#0a0a0a] rounded-lg text-[15px] font-medium cursor-pointer transition-colors duration-200 hover:bg-[#e5e5e5] disabled:bg-[#2a2a2a] disabled:text-[#555] disabled:cursor-not-allowed"
        aria-busy={loading}
      >
        {loading ? 'Generating...' : 'Generate link'}
      </button>


      
    </div>
  )
}

export default LinkForm
