const wordList = [
  "passionate",
  "dedicated",
  "experienced",
  "driven",
  "innovative",
  "skilled",
  "enthusiastic",
  "creative",
  "focused",
  "collaborative",
  "detail-oriented",
  "quality-driven",
  "team-player",
  "communicative",
  "technologically-savvy",
  "goal-oriented",
  "proactive",
  "efficient",
  "adaptable",
  "problem-solving",
  "visionary",
  "strategic",
  "reliable",
  "empathetic",
  "responsible",
  "trustworthy",
  "leadership",
  "dynamic",
  "customer-focused",
  "entrepreneurial",
  "analytical",
  "motivated",
  "independent",
  "supportive",
  "organized",
  "methodical",
  "thoughtful",
  "meticulous",
  "pragmatic",
  "resourceful",
  "innovative",
  "perseverant",
  "self-motivated",
  "curious",
  "open-minded",
  "resilient",
  "versatile",
];

const sentenceTemplates = [
  "A {adjective} individual who {verb} in {noun}.",
  "With a strong background in {noun}, {pronoun} is {adjective} about {verb}-ing.",
  "{pronoun} has a {adjective} approach to {verb}-ing, always striving for {noun}.",
  "Passionate about {noun}, {pronoun} has a {adjective} background in {verb}-ing.",
  "Known for {pronoun} {adjective} skills in {noun}, {pronoun} consistently {verb}s.",
  "{pronoun} {verb}s with a {adjective} mindset, focusing on {noun}.",
];

const pronouns = ["He", "She", "They"];
const verbs = [
  "excel",
  "thrive",
  "specialize",
  "focus",
  "lead",
  "innovate",
  "transform",
];
const nouns = [
  "technology",
  "innovation",
  "problem-solving",
  "excellence",
  "quality",
  "leadership",
  "collaboration",
];

const generateSentence = (): string => {
  const template =
    sentenceTemplates[Math.floor(Math.random() * sentenceTemplates.length)];
  const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const adjective = wordList[Math.floor(Math.random() * wordList.length)];

  return template
    .replace(/{pronoun}/g, pronoun)
    .replace(/{adjective}/g, adjective)
    .replace(/{verb}/g, verb)
    .replace(/{noun}/g, noun);
};

export const generateRandomSummary = (): string => {
  let summary = "";
  while (summary.split(" ").length < 60) {
    summary += generateSentence() + " ";
  }

  return summary.trim();
};
