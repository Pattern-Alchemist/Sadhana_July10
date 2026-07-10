import SacredTimeline from '@/components/timeline/SacredTimeline';

export const metadata = {
  title: 'Sacred Timeline | AstroKalki',
  description: 'Lunar calendar, Tithi calculator, practice recommendations, and cosmic alignment tracking.',
};

export default function SacredTimelinePage() {
  return (
    <div className="min-h-screen">
      <SacredTimeline />
    </div>
  );
}
