export const gradientId = 'waterGradient';

export const LinearGradient = () => (
  <defs>
    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#0000FF" stopOpacity={1} />  
    <stop offset="100%" stopColor="#FF0000" stopOpacity={1} />
    </linearGradient>
  </defs>
);