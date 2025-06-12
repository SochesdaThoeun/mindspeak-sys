// Removed unused import of ImportedConfession
import logo from "@/assets/admin.png";
import user from "@/assets/user.jpg";

export interface Confession {
  id: number;
  email: string;
  description: string;
  image?: string;
  hashtag: string;
  adminHashtag?: string;
  adminComment?: string;
  link?: string;
  feeling: string;
  timeConfession: string;
  status: string;
  category: string;
  hasWarning?: boolean;
  warningMessage?: string;
}

export const mockConfessions: Confession[] = [
  {
    id: 1,
    email: "sarah.m@example.com",
    description:
      "I've been struggling with anxiety about upcoming exams. The pressure from my parents and teachers is overwhelming, and I don't know how to cope anymore. I sometimes have panic attacks during tests and feel like I'm failing everyone.",
    image: user.src,
    hashtag: "#anxiety #exams #mentalhealth #stress",
    adminHashtag:
      "Admin:#counseling-required #high-priority #mental-health-support",
    adminComment:
      "Admin: Sarah, thank you for sharing this. I've scheduled you for a counseling session tomorrow at 2 PM. Please know that you're not alone and we're here to support you through this difficult time.",
    link: "https://atomic-portfolio.vercel.app/",
    feeling: "Anxious",
    timeConfession: "2024-01-24T14:30:00",
    status: "pending",
    category: "Mental Health",
  },
  {
    id: 2,
    email: "alex.k@example.com",
    description:
      "I witnessed bullying in the hallway today but was too scared to speak up. I feel guilty for not helping the victim. This has been happening for weeks and I don't know what to do.",
    image: logo.src,
    hashtag: "#bullying #guilt #bystander #help",
    adminHashtag: "Admin:#investigation-needed #bullying-report #urgent",
    adminComment:
      "Admin: Alex, your courage in reporting this is commendable. We take bullying very seriously. I've initiated an investigation and will ensure the victim gets proper support. You did the right thing by speaking up.",
    feeling: "Guilty",
    timeConfession: "2024-01-24T11:45:00",
    status: "pending",
    category: "Bullying",
  },
  {
    id: 3,
    email: "jamie.l@example.com",
    description:
      "I'm having trouble understanding the math curriculum and I'm too embarrassed to ask for help in class. I'm falling behind and my grades are suffering badly.",
    hashtag: "#academics #help #math #grades",
    adminHashtag: "Admin:#tutoring-assigned #academic-support #follow-up",
    adminComment:
      "Admin: Jamie, there's no shame in asking for help! I've arranged for you to meet with our math tutor every Tuesday and Thursday. Remember, seeking help shows strength, not weakness.",
    link: "https://example.com/tutoring",
    feeling: "Embarrassed",
    timeConfession: "2024-01-23T09:20:00",
    status: "approved",
    category: "Academic",
  },
  {
    id: 4,
    email: "morgan.t@example.com",
    description:
      "I think I might be dealing with depression. I've lost interest in activities I used to enjoy and feel isolated from my friends. Everything feels pointless and I don't want to get out of bed most days.",
    image: logo.src,
    hashtag: "#depression #isolation #mentalhealth #lonely",
    adminHashtag:
      "Admin:#counselor-contacted #depression-screening #immediate-support",
    adminComment:
      "Admin: Morgan, thank you for trusting us with this. Depression is real and treatable. I've contacted our school counselor who will reach out to you today. You matter, and we're here to help you through this.",
    link: "https://example.com/counseling",
    feeling: "Sad",
    timeConfession: "2024-01-21T16:15:00",
    status: "pending",
    category: "Mental Health",
  },
  {
    id: 5,
    email: "casey.r@example.com",
    description:
      "I'm confused about my identity and sexuality. I don't feel comfortable talking to anyone about it in person. I'm scared of how people will react if they find out.",
    hashtag: "#identity #lgbtq #support #acceptance",
    adminComment:
      "Admin: Casey, your feelings are valid and you deserve support. Our school has a safe space support group that meets Fridays. You're not alone in this journey of self-discovery.",
    link: "https://example.com/lgbtq-resources",
    feeling: "Confused",
    timeConfession: "2024-01-21T13:00:00",
    status: "pending",
    category: "Identity",
  },
  {
    id: 6,
    email: "taylor.b@example.com",
    description:
      "My parents are getting divorced and I blame myself. I feel like I'm caught in the middle and don't know who to talk to about it. They keep fighting and it's affecting my school work.",
    image: user.src,
    hashtag: "#family #divorce #guilt #support",
    adminHashtag: "Admin:#family-counseling #support-group #ongoing-monitoring",
    adminComment:
      "Admin: Taylor, divorce is never a child's fault. I've arranged for you to join our family support group and speak with our counselor. You're handling a difficult situation with remarkable maturity.",
    feeling: "Sad",
    timeConfession: "2024-01-20T20:30:00",
    status: "approved",
    category: "Family",
  },
  {
    id: 7,
    email: "jordan.p@example.com",
    description:
      "I'm being pressured to try drugs by my friends and I don't know how to say no without losing them. They make fun of me for being 'boring' and I'm starting to feel left out.",
    image: logo.src,
    hashtag: "#peer-pressure #drugs #friendship #help",
    adminHashtag:
      "Admin:#substance-abuse #peer-counseling #urgent-intervention",
    adminComment:
      "Admin: Jordan, real friends respect your choices. I'm proud of you for resisting peer pressure. Let's talk about building healthy friendships and strategies to handle these situations.",
    feeling: "Worried",
    timeConfession: "2024-01-24T16:45:00",
    status: "pending",
    category: "Substance Abuse",
    hasWarning: true,
    warningMessage:
      "This content discusses substance abuse. Please be mindful of school policies.",
  },
  {
    id: 8,
    email: "riley.m@example.com",
    description:
      "I think I have an eating disorder but I'm scared to tell anyone because they might not understand. I've been skipping meals and obsessing over my weight constantly.",
    hashtag: "#eating-disorder #body-image #fear #help",
    adminHashtag:
      "Admin:#eating-disorder-specialist #medical-referral #confidential",
    link: "https://example.com/eating-disorder-support",
    feeling: "Scared",
    timeConfession: "2024-01-23T19:20:00",
    status: "pending",
    category: "Health",
  },
  {
    id: 1,
    email: "sarah.m@example.com",
    description:
      "I've been struggling with anxiety about upcoming exams. The pressure from my parents and teachers is overwhelming, and I don't know how to cope anymore. I sometimes have panic attacks during tests and feel like I'm failing everyone.",
    image: user.src,
    hashtag: "#anxiety #exams #mentalhealth #stress",
    adminHashtag:
      "Admin:#counseling-required #high-priority #mental-health-support",
    adminComment:
      "Admin: Sarah, thank you for sharing this. I've scheduled you for a counseling session tomorrow at 2 PM. Please know that you're not alone and we're here to support you through this difficult time.",
    link: "https://atomic-portfolio.vercel.app/",
    feeling: "Anxious",
    timeConfession: "2024-01-24T14:30:00",
    status: "pending",
    category: "Mental Health",
  },
  {
    id: 1,
    email: "sarah.m@example.com",
    description:
      "I've been struggling with anxiety about upcoming exams. The pressure from my parents and teachers is overwhelming, and I don't know how to cope anymore. I sometimes have panic attacks during tests and feel like I'm failing everyone.",
    image: user.src,
    hashtag: "#anxiety #exams #mentalhealth #stress",
    adminHashtag:
      "Admin:#counseling-required #high-priority #mental-health-support",
    adminComment:
      "Admin: Sarah, thank you for sharing this. I've scheduled you for a counseling session tomorrow at 2 PM. Please know that you're not alone and we're here to support you through this difficult time.",
    link: "https://atomic-portfolio.vercel.app/",
    feeling: "Anxious",
    timeConfession: "2024-01-24T14:30:00",
    status: "pending",
    category: "Mental Health",
  },
  {
    id: 1,
    email: "sarah.m@example.com",
    description:
      "I've been struggling with anxiety about upcoming exams. The pressure from my parents and teachers is overwhelming, and I don't know how to cope anymore. I sometimes have panic attacks during tests and feel like I'm failing everyone.",
    image: user.src,
    hashtag: "#anxiety #exams #mentalhealth #stress",
    adminHashtag:
      "Admin:#counseling-required #high-priority #mental-health-support",
    adminComment:
      "Admin: Sarah, thank you for sharing this. I've scheduled you for a counseling session tomorrow at 2 PM. Please know that you're not alone and we're here to support you through this difficult time.",
    link: "https://atomic-portfolio.vercel.app/",
    feeling: "Anxious",
    timeConfession: "2024-01-24T14:30:00",
    status: "pending",
    category: "Mental Health",
  },
  {
    id: 1,
    email: "sarah.m@example.com",
    description:
      "I've been struggling with anxiety about upcoming exams. The pressure from my parents and teachers is overwhelming, and I don't know how to cope anymore. I sometimes have panic attacks during tests and feel like I'm failing everyone.",
    image: user.src,
    hashtag: "#anxiety #exams #mentalhealth #stress",
    adminHashtag:
      "Admin:#counseling-required #high-priority #mental-health-support",
    adminComment:
      "Admin: Sarah, thank you for sharing this. I've scheduled you for a counseling session tomorrow at 2 PM. Please know that you're not alone and we're here to support you through this difficult time.",
    link: "https://atomic-portfolio.vercel.app/",
    feeling: "Anxious",
    timeConfession: "2024-01-24T14:30:00",
    status: "pending",
    category: "Mental Health",
  },
];
