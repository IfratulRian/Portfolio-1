import { useEffect, useState } from "react";
import { achievements, leadershipRoles } from "./data/achievements";
import { codingProfiles } from "./data/codingProfiles";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import {
  IconAtCoder,
  IconBeecrowd,
  IconCodeChef,
  IconCodeforces,
  IconGitHub,
  IconLeetCode,
  IconLinkedIn,
  IconMail,
  IconVJudge,
} from "./components/Icons";

const navItems = [
  ["Home", "top"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Competitive", "competitive"],
  ["Achievements", "achievements"],
  ["Leadership", "leadership"],
  ["Education", "education"],
  ["Contact", "contact"],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

function PlatformIcon({ name }: { name: string }) {
  switch (name) {
    case "Codeforces":
      return <IconCodeforces />;
    case "LeetCode":
      return <IconLeetCode />;
    case "CodeChef":
    case "CodeChef DSA Contest":
      return <IconCodeChef />;
    case "beecrowd":
      return <IconBeecrowd />;
    case "AtCoder":
      return <IconAtCoder />;
    case "VJudge":
      return <IconVJudge />;
    default:
      return null;
  }
}

type ModalImage = {
  url: string;
  title: string;
  subtitle?: string;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<ModalImage | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="site-shell" data-theme={theme}>
      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              onClick={() => setActiveModalImage(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <div className="modal-image-wrapper">
              <img src={activeModalImage.url} alt={activeModalImage.title} />
            </div>
            <div className="modal-caption">
              <h3>{activeModalImage.title}</h3>
              {activeModalImage.subtitle && <p>{activeModalImage.subtitle}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="navbar" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Ifratul Islam Rian, home">
          IR<span>.</span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "night" : "day"} theme`}
            title={`Switch to ${theme === "light" ? "night" : "day"} theme`}
          >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
            <span>{theme === "light" ? "Night" : "Day"}</span>
          </button>
          <a className="nav-cta" href={`mailto:${profile.email}`}>
            Let’s talk <Arrow diagonal />
          </a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>

      <main id="top">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-content">
            <div className="availability">
              <span />
              CS student at Daffodil International University
            </div>
            <div className="portrait-frame" aria-label="Formal portrait of Md. Ifratul Islam Rian">
              <img
                src={profile.avatar}
                alt="Md. Ifratul Islam Rian"
                className="portrait-img"
              />
            </div>
            <p className="hero-name">{profile.name}</p>
            <p className="hero-kicker">{profile.role}</p>
            <div className="typewriter">
              <h1 aria-label="I solve problems. I build what matters.">
                <span aria-hidden="true">I solve problems.</span>
                <span aria-hidden="true">I build what matters.</span>
              </h1>
            </div>
            <p className="hero-copy">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <Arrow />
              </a>
              <a className="text-link" href="#competitive">
                Competitive journey <Arrow diagonal />
              </a>
            </div>
          </div>
          {/* Subtle Hero Statistics Row */}
          <div className="hero-stats" aria-label="Key Statistics">
            <div>
              <strong>600+</strong>
              <span>Codeforces Problems</span>
            </div>
            <div>
              <strong>250+</strong>
              <span>LeetCode Problems</span>
            </div>
            <div>
              <strong>230+</strong>
              <span>CodeChef Problems</span>
            </div>
            <div>
              <strong>2×</strong>
              <span>Problem Setter Semesters</span>
            </div>
          </div>
        </section>

        {/* 01: About Me */}
        <section className="section about" id="about">
          <SectionHeading eyebrow="01 / About Me" title="Three sides of one curious mind." />
          <div className="about-grid">
            <p className="about-lead">
              I’m a computer science student who enjoys the full journey—from breaking down a difficult algorithm to turning an idea into reliable software.
            </p>
            <div className="about-copy">
              <p>
                Competitive programming sharpens how I think under constraints. Development lets me turn that algorithmic discipline into tangible software systems. Community contribution gives me a way to give back and mentor fellow students.
              </p>
              <p>
                At Daffodil International University, I actively participate in programming contests, author original implementation problems, and help organize competitive programming events with the DIU ACM Club.
              </p>
            </div>
          </div>
          <div className="pillars">
            <article className="pillar">
              <span>01</span>
              <h3>Computer Science Student</h3>
              <p>Studying OOP, Java, C++, algorithms, data structures, and practical software development.</p>
            </article>
            <article className="pillar">
              <span>02</span>
              <h3>Competitive Programmer</h3>
              <p>Solving problems consistently across Codeforces, LeetCode, CodeChef, AtCoder, VJudge, and beecrowd.</p>
            </article>
            <article className="pillar">
              <span>03</span>
              <h3>Community Contributor</h3>
              <p>Designing contest problems as a Problem Setter and organizing events with the DIU ACM Club.</p>
            </article>
          </div>
        </section>

        {/* 02: Skills */}
        <section className="section skills" id="skills">
          <SectionHeading eyebrow="02 / Skills" title="Tools for thinking and making." />
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 03: Featured Projects */}
        <section className="section projects" id="projects">
          <SectionHeading
            eyebrow="03 / Featured Projects"
            title="Selected work & implementations."
            intro="A showcase of how I apply computer science fundamentals across algorithms, software architecture, and modular systems."
          />
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span className="project-number">{project.number}</span>
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.link && (
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    View Repository on GitHub <Arrow diagonal />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 04: Competitive Programming */}
        <section className="section competitive" id="competitive">
          <SectionHeading
            eyebrow="04 / Competitive Programming"
            title="Practice, persistence, progress."
            intro="Algorithms are a daily discipline. These numbers reflect verified solved problem counts and current platform statistics—not percentages."
          />
          <div className="profile-grid">
            {codingProfiles.map((item, index) => (
              <article className={`profile-card ${index < 3 ? "featured" : ""}`} key={item.name}>
                <div className="profile-top">
                  <div className="platform-mark" aria-hidden="true">
                    <PlatformIcon name={item.name} />
                  </div>
                  <span className="platform-index">0{index + 1}</span>
                </div>
                <h3>{item.name}</h3>
                <div className="metrics">
                  {item.solved && (
                    <div>
                      <strong>{item.solved}</strong>
                      <span>Problems solved</span>
                    </div>
                  )}
                  {item.rating !== undefined && (
                    <div>
                      <strong>{item.rating}</strong>
                      <span>Rating</span>
                    </div>
                  )}
                  {item.countryRank !== undefined && (
                    <div className="wide">
                      <strong>{item.countryRank}</strong>
                      <span>Current Bangladesh Rank</span>
                    </div>
                  )}
                </div>
                {item.url ? (
                  <a className="card-link" href={item.url} target="_blank" rel="noreferrer">
                    View Profile <Arrow diagonal />
                  </a>
                ) : (
                  <span className="card-note">Verified platform record</span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 05: Achievements */}
        <section className="section achievements" id="achievements">
          <SectionHeading
            eyebrow="05 / Achievements"
            title="Milestones along the way."
            intro="Contest results, hackathons, and contributions—presented factually as earned with photo verification."
          />
          <div className="timeline">
            {achievements.map((item, index) => (
              <article className="timeline-item" key={`${item.event}-${item.result}-${index}`}>
                <div className="timeline-marker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="timeline-body">
                  <span className="category">{item.category}</span>
                  <h3>{item.event}</h3>
                  <p>{item.result}</p>
                  {item.image && (
                    <div
                      className="milestone-photo-card"
                      onClick={() =>
                        setActiveModalImage({
                          url: item.image!,
                          title: item.event,
                          subtitle: item.result,
                        })
                      }
                      title="Click for full-screen zoom"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setActiveModalImage({
                            url: item.image!,
                            title: item.event,
                            subtitle: item.result,
                          });
                        }
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.event}
                        className="milestone-photo-img"
                        loading="lazy"
                      />
                      <div className="milestone-photo-caption">
                        <span>{item.imageAlt || "Stage Award & Verification"}</span>
                        <span className="caption-zoom">🔍 Full view</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 06: Leadership & Contribution */}
        <section className="section leadership" id="leadership">
          <SectionHeading
            eyebrow="06 / Leadership & Contribution"
            title="Beyond participation."
            intro="Contributing to the competitive programming community at DIU by creating challenging problems and helping organize contests."
          />
          <div className="leadership-grid">
            {leadershipRoles.map((role) => (
              <article className="leadership-card" key={role.role + role.organization}>
                <span className="role-label">{role.role}</span>
                <h3>{role.organization}</h3>
                <p>{role.description}</p>
                
                {/* Photo Gallery / Verification */}
                {role.images && role.images.length > 0 ? (
                  <div className="leadership-gallery">
                    <button
                      type="button"
                      className="leadership-photo-button"
                      onClick={() =>
                        setActiveModalImage({
                          url: role.images![0],
                          title: `${role.role} — ${role.organization}`,
                          subtitle: "Spring 2026 Problem Setting Recognition",
                        })
                      }
                    >
                      <img src={role.images[0]} alt="Spring 2026 Problem Setter" />
                      <span>Spring 2026 Award ↗</span>
                    </button>
                    <button
                      type="button"
                      className="leadership-photo-button"
                      onClick={() =>
                        setActiveModalImage({
                          url: role.images![1],
                          title: `${role.role} — ${role.organization}`,
                          subtitle: "Summer 2026 Problem Setting Recognition",
                        })
                      }
                    >
                      <img src={role.images[1]} alt="Summer 2026 Problem Setter" />
                      <span>Summer 2026 Award ↗</span>
                    </button>
                  </div>
                ) : role.image ? (
                  <div className="leadership-single-photo">
                    <button
                      type="button"
                      className="leadership-photo-button full-width"
                      onClick={() =>
                        setActiveModalImage({
                          url: role.image!,
                          title: `${role.role} — ${role.organization}`,
                          subtitle: "DIU ACM Club Organizing Team & Members",
                        })
                      }
                    >
                      <img src={role.image} alt={role.organization} />
                      <span>DIU ACM Members Group Photo ↗</span>
                    </button>
                  </div>
                ) : null}

                <div className="role-meta">
                  {role.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 07 & 08: Education & Certifications */}
        <section className="section credentials">
          <div className="credential-block" id="education">
            <SectionHeading eyebrow="07 / Education" title="Building the foundation." />
            <article className="education-card">
              <span className="edu-year">Undergraduate Program</span>
              <h3>B.Sc. in Computer Science & Engineering</h3>
              <p>Daffodil International University (DIU)</p>
              <span className="edu-focus">Focus: Algorithms, Object-Oriented Programming, and Software Systems</span>
            </article>
          </div>
          <div className="credential-block" id="certifications">
            <SectionHeading eyebrow="08 / Certifications" title="Always learning." />
            <div className="cert-card">
              <span className="cert-icon">+</span>
              <div>
                <h3>Continuous Skill Development</h3>
                <p>
                  Professional certifications, specializations, and verified learning credentials will be added here as they are earned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 09: GitHub & Coding Profiles Band */}
        <section className="section profiles-band" id="profiles">
          <div>
            <p className="eyebrow">09 / GitHub & Coding Profiles</p>
            <h2>See the work in motion.</h2>
          </div>
          <div className="profile-links">
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-2">
                <IconGitHub /> GitHub
              </span>
              <Arrow diagonal />
            </a>
            <a href={profile.socials.codeforces} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-2">
                <IconCodeforces /> Codeforces
              </span>
              <Arrow diagonal />
            </a>
            <a href={profile.socials.leetcode} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-2">
                <IconLeetCode /> LeetCode
              </span>
              <Arrow diagonal />
            </a>
            <a href={profile.socials.codechef} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-2">
                <IconCodeChef /> CodeChef
              </span>
              <Arrow diagonal />
            </a>
          </div>
        </section>

        {/* 10: Contact */}
        <section className="section contact" id="contact">
          <p className="eyebrow">10 / Contact</p>
          <h2>
            Have an idea?
            <br />
            <em>Let’s make it real.</em>
          </h2>
          <p>
            I’m always open to discussing algorithmic problems, engineering challenges, open source collaborations, or new opportunities.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            <IconMail /> {profile.email} <Arrow diagonal />
          </a>
          <div className="social-row" aria-label="Social and coding profiles">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <IconLinkedIn />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <IconGitHub />
            </a>
            <a
              href={profile.socials.codeforces}
              target="_blank"
              rel="noreferrer"
              aria-label="Codeforces"
              title="Codeforces"
            >
              <IconCodeforces />
            </a>
            <a
              href={profile.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              title="LeetCode"
            >
              <IconLeetCode />
            </a>
            <a
              href={profile.socials.codechef}
              target="_blank"
              rel="noreferrer"
              aria-label="CodeChef"
              title="CodeChef"
            >
              <IconCodeChef />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              title="Email"
            >
              <IconMail />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <a className="wordmark" href="#top">
          IR<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Md. Ifratul Islam Rian. All rights reserved.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
