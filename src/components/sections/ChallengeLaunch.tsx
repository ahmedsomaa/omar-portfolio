import type { ChallengeSection } from "@/content/types";
import { Reveal } from "@/components/layout/Reveal";

export function ChallengeLaunch({
  challenge,
  onStart,
}: {
  challenge: ChallengeSection;
  onStart: () => void;
}) {
  return (
    <section className="game-launch" id="game">
      <Reveal className="game-launch-copy">
        <p className="section-kicker">{challenge.launchKicker}</p>
        <h2>{challenge.launchTitle}</h2>
        <p>{challenge.launchBody}</p>
      </Reveal>
      <button className="button primary game-start reveal visible" type="button" onClick={onStart}>
        {challenge.launchCta} <span>→</span>
      </button>
    </section>
  );
}
