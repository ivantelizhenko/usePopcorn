import { useState } from 'react';

export function Main({ children }) {
  return <main className="main">{children}</main>;
}

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function Button({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
      {isOpen ? '–' : '+'}
    </button>
  );
}
