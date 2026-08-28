import { useCallback, useEffect, useRef, useState } from "react";
import type { ChallengeSection } from "@/content/types";

interface GameDialogProps {
  challenge: ChallengeSection;
  open: boolean;
  onClose: () => void;
}

type Scores = { reliability: number; speed: number; cost: number };

export function GameDialog({ challenge, open, onClose }: GameDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({
    reliability: 0,
    speed: 0,
    cost: 0,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<{ title: string; text: string } | null>(null);

  const rounds = challenge.rounds;
  const currentRound = rounds[roundIndex];

  const reset = useCallback(() => {
    setRoundIndex(0);
    setScores({ reliability: 0, speed: 0, cost: 0 });
    setShowFeedback(false);
    setFeedback(null);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      reset();
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open, reset]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCloseEvent = () => {
      document.body.style.overflow = "";
      onClose();
    };

    dialog.addEventListener("close", onCloseEvent);
    return () => dialog.removeEventListener("close", onCloseEvent);
  }, [onClose]);

  const resultSummary = (s: Scores) => {
    const total = s.reliability + s.speed + s.cost;
    if (total >= challenge.results.high.threshold) {
      return challenge.results.high;
    }
    if (s.speed > s.reliability + 2) {
      return challenge.results.fast;
    }
    return challenge.results.default;
  };

  const chooseOption = (optionIndex: number) => {
    const option = currentRound.options[optionIndex];
    setScores((prev) => ({
      reliability: prev.reliability + option.scores.reliability,
      speed: prev.speed + option.scores.speed,
      cost: prev.cost + option.scores.cost,
    }));

    const isFinal = roundIndex === rounds.length - 1;
    setFeedback(
      isFinal
        ? resultSummary({
            reliability: scores.reliability + option.scores.reliability,
            speed: scores.speed + option.scores.speed,
            cost: scores.cost + option.scores.cost,
          })
        : { title: option.title, text: option.feedback },
    );
    setShowFeedback(true);
  };

  const onFeedbackNext = () => {
    if (roundIndex === rounds.length - 1) {
      reset();
    } else {
      setRoundIndex((i) => i + 1);
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  const progress = ((roundIndex + 1) / rounds.length) * 100;

  return (
    <dialog
      ref={dialogRef}
      className="game-dialog"
      id="game-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <button
        className="game-dialog-close"
        type="button"
        aria-label="Close engineering challenge"
        onClick={onClose}
      >
        ×
      </button>
      <div className="game-dialog-intro">
        <p className="section-kicker">{challenge.dialogKicker}</p>
        <h2>{challenge.dialogTitle}</h2>
        <div className="game-pill-row">
          {challenge.pills.map((pill) => (
            <span key={pill}>{pill}</span>
          ))}
        </div>
      </div>
      <div className="game-shell" aria-live="polite">
        <div className="game-top">
          <div>
            <small id="game-step">
              Scenario {roundIndex + 1} of {rounds.length}
            </small>
            <div className="game-progress">
              <i id="game-progress" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button className="game-reset" type="button" onClick={reset}>
            Reset ↺
          </button>
        </div>
        <div className="game-stage">
          <p className="game-status">
            PROTOTYPE STATUS <span>AT RISK</span>
          </p>
          <h3 id="game-question">{currentRound.question}</h3>
          {!showFeedback && (
            <div className="game-options" id="game-options">
              {currentRound.options.map((option, i) => (
                <button
                  key={option.label}
                  type="button"
                  className="game-option"
                  onClick={() => chooseOption(i)}
                >
                  <b>{String.fromCharCode(65 + i)}</b>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
          {showFeedback && feedback && (
            <div className="game-feedback" id="game-feedback">
              <h4>{feedback.title}</h4>
              <p>{feedback.text}</p>
              <button type="button" onClick={onFeedbackNext}>
                {roundIndex === rounds.length - 1
                  ? "Play again ↺"
                  : "Next scenario →"}
              </button>
            </div>
          )}
        </div>
        <div className="game-scores">
          <div>
            <span>Reliability</span>
            <b id="score-reliability">{scores.reliability}</b>
          </div>
          <div>
            <span>Speed</span>
            <b id="score-speed">{scores.speed}</b>
          </div>
          <div>
            <span>Cost control</span>
            <b id="score-cost">{scores.cost}</b>
          </div>
        </div>
      </div>
    </dialog>
  );
}
