import NyasaVisualizer from '@/components/nyasa/NyasaVisualizer';

export const metadata = {
  title: 'Nyasa Visualization | AstroKalki',
  description: 'Sacred chakra installation practices. Interactive visualization and mantra chanting for body-based practices.',
};

export default function NyasaPage() {
  return (
    <div className="min-h-screen">
      <NyasaVisualizer />
    </div>
  );
}
