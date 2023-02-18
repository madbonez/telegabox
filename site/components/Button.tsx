import { MouseEventHandler, ReactNode } from 'react';

export const Button = ({children, onClick}: {children: ReactNode, onClick: MouseEventHandler}) => (
  <button 
    onClick={onClick}
    className='bg-orange-300 p-2 shadow-xl active:shadow-none outline outline-1 outline-orange-700 active:outline-none'>
    {children}
  </button>
)