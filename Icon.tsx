
import React from 'react';

interface IconProps {
    name: 'leaf' | 'tip' | 'chevron-down' | 'chevron-up';
    className?: string;
}

const icons = {
    leaf: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.354-1.354 12l11.028-11.028a1.5 1.5 0 0 1 2.122 0l11.028 11.028L12 21.354Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.354c-1.636 0-3.264-.65-4.44-1.826m8.88 0c-1.176 1.176-2.804 1.826-4.44 1.826m0-16.908c1.636 0 3.264.65 4.44 1.826m-8.88 0C8.316 4.97 9.944 4.32 12 4.32m0 0v17.034" />
        </svg>
    ),
    tip: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a14.994 14.994 0 0 1-7.5 0c-1.278 0-2.517-.19-3.723-.534a11.948 11.948 0 0 1-2.92-1.625M19.5 4.5v.75m0 0a2.25 2.25 0 0 1-2.25 2.25m2.25-2.25a2.25 2.25 0 0 0-2.25-2.25m-15 4.5v.75m0 0a2.25 2.25 0 0 0 2.25 2.25m-2.25-2.25a2.25 2.25 0 0 1 2.25-2.25M12 18.75a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Z" />
        </svg>
    ),
    'chevron-down': (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    ),
    'chevron-up': (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
    ),
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
    return <div className={className}>{icons[name]}</div>;
};

export default Icon;
