import YantraBuilder from '@/components/yantra/YantraBuilder';

export const metadata = {
  title: 'Interactive Yantra Builder | AstroKalki',
  description: 'Design sacred geometry yantras with perfect proportions. SVG construction, export, and AR preview.',
};

export default function YantraBuilderPage() {
  return (
    <div className="min-h-screen">
      <YantraBuilder />
    </div>
  );
}
