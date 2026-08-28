import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSite } from "@/content/load";
import { useSiteEnhancements } from "@/hooks/useSiteEnhancements";
import { SkipLink } from "@/components/layout/SkipLink";
import { Noise } from "@/components/layout/Noise";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { DeliveryStrip } from "@/components/sections/DeliveryStrip";
import { Impact } from "@/components/sections/Impact";
import { FeaturedCase } from "@/components/sections/FeaturedCase";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ChallengeLaunch } from "@/components/sections/ChallengeLaunch";
import { ProjectDialog } from "@/components/overlays/ProjectDialog";
import { GameDialog } from "@/components/overlays/GameDialog";
import { CompareSlider } from "@/components/sections/CompareSlider";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

function App() {
  const site = loadSite();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [gameOpen, setGameOpen] = useState(false);

  useSiteEnhancements();

  const featuredProject = site.projects[site.featuredProjectId];

  const cardProjects = useMemo(
    () =>
      Object.entries(site.projects)
        .filter(
          ([id, p]) => p.placement === "card" && id !== site.featuredProjectId,
        )
        .map(([id, project]) => ({ id, project })),
    [site.projects, site.featuredProjectId],
  );

  const libraryProjects = useMemo(
    () =>
      Object.entries(site.projects)
        .filter(([, p]) => p.placement === "library")
        .map(([id, project]) => ({ id, project })),
    [site.projects],
  );

  const openProject = useCallback((id: string) => {
    setProjectId(id);
    try {
      history.replaceState(null, "", `#project=${id}`);
    } catch {
      /* no-op */
    }
  }, []);

  const closeProject = useCallback(() => {
    setProjectId(null);
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch {
      /* no-op */
    }
  }, []);

  useEffect(() => {
    const match = location.hash.match(/^#project=([A-Za-z0-9_-]+)$/);
    if (match && site.projects[match[1]]) {
      setProjectId(match[1]);
    }
  }, [site.projects]);

  useEffect(() => {
    const onHashChange = () => {
      const match = location.hash.match(/^#project=([A-Za-z0-9_-]+)$/);
      if (match && site.projects[match[1]]) {
        setProjectId(match[1]);
      } else if (!match) {
        setProjectId(null);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [site.projects]);

  useEffect(() => {
    document.title = `${site.profile.name} — Product Development`;
  }, [site.profile.name]);

  const activeProject = projectId ? site.projects[projectId] : null;

  return (
    <>
      <SkipLink />
      <Noise />
      <CursorGlow />
      <ScrollProgress />

      <SiteHeader profile={site.profile} nav={site.nav} />

      <main id="main">
        <Hero profile={site.profile} hero={site.hero} />
        <DeliveryStrip strip={site.deliveryStrip} />
        <Impact impact={site.impact} />
        {featuredProject && (
          <FeaturedCase
            project={featuredProject}
            projectId={site.featuredProjectId}
            onOpen={openProject}
          />
        )}
        <WorkGrid
          work={site.work}
          cardProjects={cardProjects}
          libraryProjects={libraryProjects}
          onOpen={openProject}
        />
        <ChallengeLaunch
          challenge={site.challenge}
          onStart={() => setGameOpen(true)}
        />
        <CompareSlider compare={site.compare} />
        <About about={site.about} />
        <Credentials credentials={site.credentials} />
        <Contact contact={site.contact} profile={site.profile} />
      </main>

      <SiteFooter profile={site.profile} />

      <ProjectDialog
        project={activeProject}
        open={projectId !== null && activeProject !== undefined}
        onClose={closeProject}
      />
      <GameDialog
        challenge={site.challenge}
        open={gameOpen}
        onClose={() => setGameOpen(false)}
      />
    </>
  );
}

export default App;
