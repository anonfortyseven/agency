import React from 'react';
import { MilestoneStatus, ApprovalStatus, ProjectStatus } from '../types';
import { Loader2, X } from 'lucide-react';

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', isLoading, className = '', ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-black disabled:opacity-50 disabled:pointer-events-none rounded-md";
  
  const variants = {
    primary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-200",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:ring-zinc-700",
    outline: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
    ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
    danger: "bg-red-900/30 text-red-200 hover:bg-red-900/50 border border-red-900/50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

// --- Cards ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-brand-dark border border-brand-border rounded-lg overflow-hidden shadow-sm ${className}`}>
    {children}
  </div>
);

// --- Inputs ---
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border border-brand-border bg-brand-black px-3 py-2 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className = '', ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={`appearance-none flex h-10 w-full rounded-md border border-brand-border bg-brand-black px-3 py-2 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
    </div>
  </div>
));

export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`flex min-h-[80px] w-full rounded-md border border-brand-border bg-brand-black px-3 py-2 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));

// --- Modal ---
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-brand-dark border border-brand-border rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-brand-border bg-zinc-900/50">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Badges ---
export const StatusBadge: React.FC<{ status: string; type?: 'project' | 'milestone' | 'approval' }> = ({ status, type = 'project' }) => {
  let colorClass = "bg-zinc-800 text-zinc-300";
  
  if (type === 'approval') {
    if (status === ApprovalStatus.APPROVED) colorClass = "bg-emerald-900/30 text-emerald-400 border border-emerald-900/50";
    if (status === ApprovalStatus.CHANGES_REQUESTED) colorClass = "bg-amber-900/30 text-amber-400 border border-amber-900/50";
    if (status === ApprovalStatus.PENDING) colorClass = "bg-blue-900/30 text-blue-400 border border-blue-900/50";
  } else if (type === 'milestone') {
    if (status === MilestoneStatus.COMPLETED) colorClass = "text-zinc-400 line-through decoration-zinc-600";
    if (status === MilestoneStatus.IN_PROGRESS) colorClass = "text-blue-400 font-semibold";
    if (status === MilestoneStatus.BLOCKED) colorClass = "text-red-400";
  } else {
    // Project
    if (status === ProjectStatus.DELIVERED) colorClass = "bg-emerald-900/30 text-emerald-400 border border-emerald-800";
    if (status === ProjectStatus.PRODUCTION || status === ProjectStatus.POST_PRODUCTION) colorClass = "bg-indigo-900/30 text-indigo-300 border border-indigo-800";
  }

  if (type === 'milestone') {
    return <span className={`text-sm ${colorClass}`}>{status}</span>
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};