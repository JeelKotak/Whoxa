declare module 'react-world-flags' {
  import { ComponentType, ReactNode } from 'react';
  
  interface FlagProps {
    code: string;
    height?: string | number;
    width?: string | number;
    className?: string;
    style?: React.CSSProperties;
    fallback?: ReactNode;
  }
  
  const Flag: ComponentType<FlagProps>;
  export default Flag;
}