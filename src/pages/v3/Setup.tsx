import { PageShell } from "./components/PageShell";
import { GearGrid } from "./components/GearGrid";

export default function SetupPage() {
  return (
    <PageShell
      sectionId="setup"
      title="setup"
      intro="The desk, one card each. Tap any of them for the full spec sheet."
    >
      <GearGrid />
    </PageShell>
  );
}
