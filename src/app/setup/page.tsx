import { PageShell } from "@/components/v3/PageShell";
import { GearGrid } from "@/components/v3/GearGrid";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Desk Setup",
  description:
    "The hardware behind the work: workstation, displays, keyboards, audio and tools, with the full spec sheet for each.",
  path: "/setup",
});


export default function SetupPage() {
  return (
    <>
      <Breadcrumbs name="Desk Setup" path="/setup" />
      <PageShell
      sectionId="setup"
      title="setup"
      intro="The desk, one card each. Tap any of them for the full spec sheet."
    >
      <GearGrid />
      </PageShell>
    </>
  );
}
