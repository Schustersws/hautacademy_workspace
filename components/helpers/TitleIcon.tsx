
import React from 'react';
import { Crown, Medal, Award, Sparkles, Stethoscope, Rocket, TrendingUp, Gem, Shield, Star, Trophy, Badge, Ribbon } from 'lucide-react';

type Props = {
  iconKey?: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
};

export const TitleIcon: React.FC<Props> = ({ iconKey, ...props }) => {
  switch (iconKey) {
    case 'crown':
      return <Crown {...props} />;
    case 'medal':
      return <Medal {...props} />;
    case 'award':
      return <Award {...props} />;
    case 'sparkles':
        return <Sparkles {...props} />;
    case 'stethoscope':
        return <Stethoscope {...props} />;
    case 'rocket':
        return <Rocket {...props} />;
    case 'trending-up':
        return <TrendingUp {...props} />;
    case 'gem':
      return <Gem {...props} />;
    case 'shield':
        return <Shield {...props} />;
    case 'star':
        return <Star {...props} />;
    case 'trophy':
        return <Trophy {...props} />;
    case 'badge':
        return <Badge {...props} />;
    case 'ribbon':
        return <Ribbon {...props} />;
    default:
      return <Award {...props} />;
  }
};