import React from 'react';
import { Flame, ShieldCheck, Cpu, Briefcase, Award } from 'lucide-react';
import { Badge } from '../../types';

interface ConsistencyBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ConsistencyBadge: React.FC<ConsistencyBadgeProps> = ({
  size = 'md',
  showLabel = true
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div
      className={`inline-flex items-center gap-1.5 select-none font-semibold transition-all ${
        isSm ? 'px-2 py-0.5 text-[10px]' : isLg ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-[11px]'
      } rounded border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-600/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] tracking-wider uppercase`}
      title="CONSISTENCY: Verified uninterrupted professional development & momentum"
    >
      <div className="relative flex items-center justify-center">
        <Flame className={`${isSm ? 'w-3 h-3' : isLg ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-amber-400 animate-pulse`} />
        <span className="absolute inset-0 rounded-full bg-amber-400/30 blur-xs" />
      </div>
      {showLabel && <span className="font-display font-bold tracking-widest text-amber-200">CONSISTENCY</span>}
    </div>
  );
};

export const ProfessionalBadgeChip: React.FC<{ badge: Badge; size?: 'sm' | 'md' }> = ({
  badge,
  size = 'md'
}) => {
  if (badge.isConsistencyBadge || badge.name.toUpperCase() === 'CONSISTENCY') {
    return <ConsistencyBadge size={size} />;
  }

  const getIcon = () => {
    switch (badge.iconName) {
      case 'Cpu':
        return <Cpu className="w-3 h-3 text-cyan-400" />;
      case 'Briefcase':
        return <Briefcase className="w-3 h-3 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3 h-3 text-violet-400" />;
      default:
        return <Award className="w-3 h-3 text-sky-400" />;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded border border-slate-700/80 bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300 ${
        size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : ''
      }`}
      title={badge.description}
    >
      {getIcon()}
      <span className="tracking-wide">{badge.name}</span>
    </div>
  );
};
