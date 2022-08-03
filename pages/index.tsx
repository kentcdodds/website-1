import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import Script from "next/script";
import Footer from "../shared/footer";
import Nav from "../shared/nav";
import IconList from "../shared/IconList";
import Button from "../shared/Button";
import Section from "../shared/Section";
import ContentBlock from "../shared/ContentBlock";

// Icons
import Github from "src/shared/Icons/Github";
import Check from "src/shared/Icons/Check";
import CLIGradient from "src/shared/Icons/CLIGradient";
import KeyboardGradient from "src/shared/Icons/KeyboardGradient";
import TrendingUp from "src/shared/Icons/TrendingUp";
import { useAbTest } from "src/shared/trackingHooks";

// TODO: move these into env vars
export const INGEST_KEY =
  "BIjxBrM6URqxAu0XgIAae5HgBCv8l_LodmdGonFCfngjhwIgQEbvbUUQTwvFMHO21vxCJEGsC7KPdXEzdXgOAQ";

// test key
// export const INGEST_KEY = 'MnzaTCk7Se8i74hA141bZGS-NY9P39RSzYFbxanIHyV2VDNu1fwrns2xBQCEGdIb9XRPtzbp0zdRPjtnA1APTQ';

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title: "The Serverless Event-Driven Queue",
        description:
          "Inngest makes it simple for you to write delayed or background jobs by triggering functions from events",
        image: "/assets/img/og-image-default.jpg",
      },
    },
  };
}

const Experiment = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  if (!show) {
    return null;
  }
  return <>{children}</>;
};

export default function Home() {
  const { variant } = useAbTest("2022-08-03-headline");
  return (
    <Wrapper className="home">
      <Nav sticky={true} />

      <Hero>
        <h1>
          {variant === "kill-queues" ? (
            "Kill Your Queues."
          ) : (
            <>
              You Send Events.
              <br />
              We Run Your Code.
            </>
          )}
        </h1>
        <p className="hero-subheading">
          Inngest makes it simple for you to write delayed or background jobs by
          triggering functions from events
        </p>
        <p className="hero-subheading">
          <em>No infra, no config — just ship.</em>
        </p>

        <img
          key="kill-queues"
          style={{ display: variant === "kill-queues" ? "block" : "none" }}
          className="hero-graphic"
          src="/assets/homepage/hero-graphic-june-2022.png"
          alt="How Inngest works diagram"
        />
        <img
          key="you-send-events"
          style={{ display: variant === "kill-queues" ? "none" : "block" }}
          className="hero-graphic"
          src="/assets/homepage/hero-graphic-simplified-aug-2022.png"
          alt="How Inngest works diagram"
        />

        <IconList
          direction="vertical"
          items={[
            "Simple publishing with HTTP + JSON",
            "No SDKs needed",
            "Developer tooling for the entire workflow",
            "No boilerplate polling code",
            "Any programming language",
            "Step function support with DAGs",
          ].map((text) => ({
            icon: Check,
            text,
          }))}
        />

        <div className="hero-ctas">
          <Button
            size="medium"
            kind="primary"
            href="/sign-up?ref=homepage-hero"
          >
            Jump Right In
          </Button>
        </div>
      </Hero>

      <Section>
        <header>
          <h2>
            The Complete Platform For <br />
            Everything Async
          </h2>
          <p className="subheading">
            Our serverless solution provides everything you need to effortlessly
            <br />
            build and manage every type of asynchronous and event-driven job.
          </p>
        </header>

        <ContentBlock
          layout="reverse"
          heading="No queue required"
          text={
            <>
              Inngest is serverless, requiring absolutely no infrastructure to
              manage. Use our built-in scalable queuing system.{" "}
              {/* TODO - Link to something */}
            </>
          }
          image="/assets/homepage/serverless-queue.png"
        />
        <ContentBlock
          layout="reverse"
          heading="A real-time admin UI keeps everyone in the&nbsp;loop"
          text={
            <>
              The Inngest Admin UI brings full transparency to all your
              asynchronous jobs, so you can stay on top of performance,
              throughput, and more, without needing to dig through logs.
            </>
          }
          image="/assets/homepage/admin-ui-screenshot.png"
        />
        <ContentBlock
          layout="reverse"
          heading="Event-driven, as easy as just sending events!"
          text={
            <>
              We built all the hard stuff so you don’t have to: idempotency,
              throttling, backoff, retries, replays, job versioning, and so much
              more. With Inngest, you just write the job and we take care of the
              rest.
            </>
          }
          image="/assets/homepage/checklist-fade.png"
        />
        <div className="cta-container">
          <Button
            href="/product?ref=home-complete-platform"
            kind="outlinePrimary"
          >
            See The Full Picture
          </Button>
        </div>
      </Section>

      <Section theme="dark">
        <header>
          <h2>
            Build for <u>Builders</u>
          </h2>
          <p className="subheading">Write business logic, not boilerplate.</p>
        </header>

        <ContentBlock
          heading="Fits your workflow"
          text={
            <>
              Inngest works just like you'd hope — write your jobs alongside
              your project code, use our CLI to create new functions, mock
              queues, test and deploy your work manually or automate it with
              your favorite tool.
            </>
          }
          image="/assets/homepage/cli-3-commands.png"
          imageSize="full"
          icon={<CLIGradient />}
        />

        <ContentBlock
          layout="reverse"
          heading="Fully flexible"
          text={
            <>
              Write your jobs in any language or framework, and POST your events
              in standard JSON. If it runs in Docker, it works with Inngest,
              with zero vendor-specific libraries or boilerplate code needed.
            </>
          }
          image="/assets/homepage/language-logos.png"
          icon={<KeyboardGradient />}
        />

        <ContentBlock
          heading="Build in Minutes, Not&nbsp;Days"
          text={
            <>
              Zero config from setup to production — with Inngest there's no
              need to configure or manage queues, event stream topics, workers,
              or builds. Write jobs, send events, with zero fuss.
            </>
          }
          image="/assets/homepage/payload-and-job-generic.png"
          icon={<KeyboardGradient />}
        />

        <div className="cta-container">
          <Button href="/product?ref=home-start-building" kind="primary">
            Start Building Today
          </Button>
        </div>
      </Section>

      <BlackBackgroundWrapper>
        <NextLevelSection>
          <header>
            <h2>
              <TrendingUp /> <span className="gradient-text">Next-Level</span>{" "}
              Async Awesomeness
            </h2>
            <p className="subheading">
              Building the future with event-driven experiences
            </p>
          </header>

          <div className="content-grid">
            <div>
              <h3>Limitless</h3>
              <p>
                Inngest jobs aren't bound by artificial time or isolation
                constraints. Develop long running, context aware tasks that
                coordinate and interact to build even the most sophisticated
                workflows.
              </p>
            </div>
            <div>
              <h3>Controlled</h3>
              <p>
                Our platform enforces data governance and accuracy so you'll
                immediately know if issues arise. Our detailed audit logs mean
                you're never in the dark.
              </p>
            </div>
            <div>
              <h3>Experienced</h3>
              <p>
                Our <a href="/about">founding team</a> has built high-throughput
                complex event-driven systems that scale to millions of daily
                events and we're excited to share with you the reliable
                performant system we always wished we had.
              </p>
            </div>
          </div>

          <div className="cta-container">
            <Button href="/product?ref=home-next-level" kind="outlinePrimary">
              Take it to the next level <TrendingUp size="1em" />
            </Button>
          </div>
        </NextLevelSection>
      </BlackBackgroundWrapper>

      {/*<SocialProof>
        <blockquote>
          “This is 100% the dev/prod parity that we’re lacking for queue-based
          systems.”
        </blockquote>
        <div className="attribution">
          <img src="/assets/team/dan-f-2022-02-18.jpg" />
          Developer A. - Staff Engineer at XYZ
        </div>
        </SocialProof> */}

      <ClosingSection>
        <header>
          <h2>Write Code, Not Too Much, Mostly Business Logic</h2>
          <p className="subheading">
            Inngest tasks lets you skip the boilerplate and get right to the
            heart of the matter:
            <br />
            writing code that helps your business achieve its goals.
          </p>
        </header>
        <div className="cta-container">
          <Button
            href="/docs/quick-start?ref=home-inngest-in-action"
            kind="primary"
            size="medium"
          >
            See Inngest in Action
          </Button>
        </div>
      </ClosingSection>

      <Footer />
    </Wrapper>
  );
}

// Wrapper defines a top-level scope for nesting home-specific CSS classes within.
const Wrapper = styled.div`
  .section-header-top {
    margin-top: 6rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
  }

  .use-cases-header {
    margin-top: 6rem;
  }
  .discord-cta-wrapper {
    margin: 4em auto;
    max-width: 600px;
  }

  .video-player {
    max-width: 1000px;
    margin: 0 auto;
    border: 1px solid var(--gray);
  }
  @media (max-width: 1040px) {
    .video-player {
      margin: 0 1em;
    }
  }
`;

const Hero = styled.header`
  padding: 14vh 0 4rem;
  text-align: center;

  h1 {
    font-size: 4.4rem;
    margin-bottom: 1.7rem;
  }

  .hero-subheading {
    margin: 1em auto;
    max-width: 540px;
    font-size: 1rem;
  }

  .hero-graphic {
    margin: 2.5rem auto;
    max-width: 748px;
  }

  .icon-list {
    margin: 2.5rem auto;
    max-width: 400px;
    max-width: fit-content;
    text-align: left; // In case text wraps
  }

  .hero-ctas {
    margin-top: 2em;
    display: flex;
    justify-content: center;
  }

  .button {
    display: inline-flex;
    font-family: var(--font-mono);
    letter-spacing: -0.5px;
  }
  .button svg {
    margin-right: 0.4rem;
  }
  .button-text-light {
    font-weight: 200;
  }
  .button-text-med {
    font-weight: 600;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 8vh 1rem;

    > div:first-of-type {
      grid-column: 1;
    }

    .hero-graphic {
      width: 90%;
    }

    .icon-list {
      max-width: fit-content;
      padding: 0 1rem;
    }

    .hero-subheading:last-child {
      padding: 0 0 2rem;
    }

    .button {
      margin: 0.5rem !important;
    }
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
    .hero-subheading {
      font-size: 0.9rem;
    }
  }
`;

const BlackBackgroundWrapper = styled.div`
  background: linear-gradient(180deg, black 50%, transparent 50%);
`;

const NextLevelSection = styled(Section)`
  width: 96%;
  max-width: 1200px;
  padding: 2.5rem;

  background: linear-gradient(134.83deg, #f4f4fb 24.75%, #fbfbff 89.21%);
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  @media (max-width: 800px) {
    padding: 2rem 1rem;
  }
`;

const ClosingSection = styled(Section)`
  h2 {
    font-size: 2.1rem;
  }
  .cta-container {
    margin-top: 3rem;
  }
`;

const SocialProof = styled.section`
  max-width: 800px;
  margin: 20vh auto 10vh;
  padding: 0 1rem;
  text-align: center;

  blockquote {
    font-size: 1.6rem;
    font-style: italic;
    font-weight: bold;
    color: var(--color-gray-purple);
  }
  .attribution {
    display: inline-flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 0.8rem;
  }
  img {
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 1rem;
    margin-right: 0.6rem;
  }

  @media (max-width: 800px) {
    margin: 14vh auto 8vh;
  }
`;
