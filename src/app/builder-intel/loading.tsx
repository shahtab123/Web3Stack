import { IntelSectionLoader } from "@/components/builder-intel/intel-section-loader";

export default function BuilderIntelLoading() {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <IntelSectionLoader
        label="Loading Builder Intel…"
        className="min-h-[60vh]"
      />
    </div>
  );
}
