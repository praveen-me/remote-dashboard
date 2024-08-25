const awardLevels = [
  "Local",
  "Zonal",
  "State",
  "National",
  "International",
  "Regional",
  "District",
  "Inter-school",
  "Inter-college",
  "City",
  "Country",
  "Global",
];

const awardTypes = [
  "Champion",
  "Winner",
  "Runner-up",
  "Participant",
  "Gold Medalist",
  "Silver Medalist",
  "Bronze Medalist",
  "Top Performer",
  "Outstanding Achiever",
  "Distinguished Member",
  "Awardee",
  "Honoree",
  "Finalist",
];

const activities = [
  "Basketball",
  "Chess",
  "Debate",
  "Science Olympiad",
  "Math Contest",
  "Coding Competition",
  "Music Competition",
  "Dance Competition",
  "Art Exhibition",
  "Literature Contest",
  "Drama",
  "Photography Contest",
  "Robotics",
  "Athletics",
  "Swimming",
];

const generateAward = (): string => {
  const level = awardLevels[Math.floor(Math.random() * awardLevels.length)];
  const type = awardTypes[Math.floor(Math.random() * awardTypes.length)];
  const activity = activities[Math.floor(Math.random() * activities.length)];

  return `${level} level ${type} in ${activity}`;
};

export const generateRandomAward = (): string => {
  let awards = "";

  awards = generateAward() + ". ";

  return awards.trim();
};
