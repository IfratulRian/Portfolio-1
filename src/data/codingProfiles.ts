export type CodingProfile = {
  name: string;
  mark: string;
  solved?: string;
  rating?: number;
  countryRank?: number;
  url?: string;
};

export const codingProfiles: CodingProfile[] = [
  {
    name: "Codeforces",
    mark: "CF",
    solved: "600+",
    rating: 973,
    url: "https://codeforces.com/profile/Ifratul_Rian",
  },
  {
    name: "LeetCode",
    mark: "LC",
    solved: "250+",
    rating: 1454,
    url: "https://leetcode.com/u/Ifratul_Rian/",
  },
  {
    name: "CodeChef",
    mark: "CC",
    solved: "230+",
    rating: 1320,
    countryRank: 1601,
    url: "https://www.codechef.com/users/ifratul_rian",
  },
  {
    name: "CodeChef DSA Contest",
    mark: "DS",
    rating: 1246,
    countryRank: 107,
  },
  { name: "beecrowd", mark: "BC", solved: "175+" },
  { name: "AtCoder", mark: "AC", solved: "50+" },
  { name: "VJudge", mark: "VJ", solved: "290+" },
];
