import PageHeader from "@/components/PageHeader";
import CosmosPanel from "@/components/CosmosPanel";

export const dynamic = "force-dynamic";

export default function CosmosPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall IV · The Observatory"
        title="Living Cosmology"
        subtitle="The heavens as the seers framed them — a mirror of inner rhythm, computed for this very moment. Jyotiṣa, the 'science of light,' reads time itself."
      />
      <div className="mx-auto mt-12 max-w-5xl px-6 sm:px-8">
        <CosmosPanel />
      </div>
    </div>
  );
}
