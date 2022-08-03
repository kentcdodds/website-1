import deterministicSplit from "deterministic-split";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";
import { v4 as uuid } from "uuid";

/**
 * AB experiments with keys as experiment names and values as the variants.
 */
const abExperiments = {
  // e.g. "2022-01-01-experiment-name": ["variant-1", "variant-2"]
  "2022-08-03-headline": ["kill-queues", "you-send-events"],
} as const;

/**
 * Fetch and return the user's anonymous ID.
 */
export const useAnonId = (): { anonId: string; existing: boolean } => {
  const [anonId, setAnonId] = useLocalStorage<string>("inngest-anon-id");
  if (!anonId) {
    const id = uuid();
    setAnonId(id);
    return {
      anonId: id,
      existing: false,
    };
  }
  return {
    anonId,
    existing: false,
  };
};

/**
 * Fetch the user's current variant for a particular AB experiment.
 */
export const useAbTest = <T extends keyof typeof abExperiments>(
  /**
   * The experiment name to return the variant of.
   */
  experimentName: T
) => {
  const { anonId } = useAnonId();

  const variant = useMemo(() => {
    // for server side rendering, always render the first variant
    if (typeof window === "undefined") {
      return abExperiments[experimentName][0];
    }
    return deterministicSplit(
      `${anonId}_${experimentName}`,
      abExperiments[experimentName]
    ) as typeof abExperiments[T][number];
  }, [anonId, experimentName]);

  /**
   * Whenever the variant and fetched and used, send an event to mark that this
   * has happened.
   */
  useEffect(() => {
    // Inngest is undefined on server side during local dev
    if (window?.Inngest) {
      window.Inngest.event({
        name: "app/experiment.viewed",
        data: {
          anonymous_id: anonId,
          experiment: experimentName,
          variant,
        },
      });
    }
  }, [variant, anonId, experimentName]);

  return {
    /**
     * The variant of the given experiment for this user.
     */
    variant,
  };
};
