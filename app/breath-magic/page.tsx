import BreathMagicLab from '@/components/breath/BreathMagicLab';

export const metadata = {
  title: 'Breath Magic Lab | AstroKalki',
  description: 'Sacred breathing techniques with haptic & audio guidance. 4-7-8, Bhastrika, Ujjayi, and more.',
};

export default function BreathMagicPage() {
  return (
    <div className="min-h-screen">
      <BreathMagicLab />
    </div>
  );
}
