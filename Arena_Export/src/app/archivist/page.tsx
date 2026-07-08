import PageHeader from "@/components/PageHeader";
import Archivist from "@/components/Archivist";

export const dynamic = "force-dynamic";

export default function ArchivistPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall V · The Reference Desk"
        title="The Custodian"
        subtitle="An objective librarian of the archive — it indexes, it cites, it points. It does not claim the guru's seat, nor does it prescribe."
      />
      <div className="mx-auto mt-12 max-w-3xl px-6 sm:px-8">
        <Archivist />
      </div>
    </div>
  );
}
