import React, { useEffect } from 'react';


const Toast = ({ message, show, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (show && duration) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    return (
        <div className="fixed bottom-7.5 left-1/2 -translate-x-1/2
                bg-white text-[#0a0a0a]
                px-6 py-3
                rounded-lg text-sm font-medium
                shadow-[0_4px_12px_rgba(0,0,0,0.3)]
                z-1000
                animate-fade-in">
            {message}
        </div>
    );
};

export default Toast;