export type Achievement = {
  event: string;
  result: string;
  category: "Contest" | "Hackathon" | "Contribution";
  image?: string;
  imageAlt?: string;
};

export type LeadershipRole = {
  role: string;
  organization: string;
  description: string;
  tags: string[];
  image?: string;
  images?: string[];
};

export const achievements: Achievement[] = [
  // --- Photo-Verified Milestones ---
  {
    event: "DIU Take-Off Programming Contest (Fall 2025)",
    result: "Preliminary Round: 2nd Runner-up",
    category: "Contest",
    image: "/images/takeoff-fall-2025-2nd-runner-up.jpg",
    imageAlt: "DIU Take-Off Programming Contest Fall 2025 Preliminary 2nd Runner-up Stage Award",
  },
  {
    event: "DIU Unlock the Algorithm Contest",
    result: "11th place",
    category: "Contest",
    image: "/images/uta-11th-place.jpg",
    imageAlt: "DIU Unlock the Algorithm Contest 11th Place Stage Award",
  },
  {
    event: "Take-Off Mock Round",
    result: "Problem Setter · Summer 2026",
    category: "Contribution",
    image: "/images/takeoff-mock-summer-2026.jpg",
    imageAlt: "Take-Off Mock Round Summer 2026 Problem Setter Crest & Recognition",
  },
  {
    event: "Take-Off Mock Round",
    result: "Problem Setter · Spring 2026",
    category: "Contribution",
    image: "/images/takeoff-mock-spring-2026.jpg",
    imageAlt: "Take-Off Mock Round Spring 2026 Problem Setter Crest & Recognition",
  },
  {
    event: "DIU ACM Club",
    result: "Contest Organizer",
    category: "Contribution",
    image: "/images/diu-acm-all-members.jpg",
    imageAlt: "DIU ACM Club Contest Organizing Team & Members",
  },

  // --- Other Milestones ---
  {
    event: "DIU Unlock the Algorithm Contest",
    result: "Preliminary Round: 5th place",
    category: "Contest",
  },
  {
    event: "DIU Take-Off Programming Contest",
    result: "Final Round: 28th place",
    category: "Contest",
  },
  {
    event: "DIU AI Innovation Hackathon",
    result: "Finalist",
    category: "Hackathon",
  },
];

export const leadershipRoles: LeadershipRole[] = [
  {
    role: "Problem Setter",
    organization: "DIU Take-Off Mock Round",
    description:
      "Designed implementation-based programming problems for the Take-Off Mock Round across Spring 2026 and Summer 2026.",
    tags: ["Spring 2026", "Summer 2026", "Problem Setting"],
    image: "/images/takeoff-mock-summer-2026.jpg",
    images: [
      "/images/takeoff-mock-spring-2026.jpg",
      "/images/takeoff-mock-summer-2026.jpg",
    ],
  },
  {
    role: "Contest Organizer",
    organization: "DIU ACM Club",
    description:
      "Contributed to organizing the DIU Take-Off Programming Contest and Unlock the Algorithm Contest.",
    tags: ["Take-Off Contest", "Unlock the Algorithm", "DIU ACM Club"],
    image: "/images/diu-acm-all-members.jpg",
  },
];
