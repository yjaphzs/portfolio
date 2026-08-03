export type Education = {
  degree: string;
  major?: string;
  school: string;
  location: string;
  period: string;
  coursework?: string[];
};

const education: Education[] = [
  {
    degree: "BS Information Technology",
    major: "System Development",
    school: "Central Luzon State University",
    location: "Science City of Muñoz, Nueva Ecija",
    period: "2015 – 2019",
    coursework: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Systems",
      "Web & Mobile Development",
    ],
  },
  {
    degree: "Associate in Computer Technology",
    school: "Central Luzon State University",
    location: "Science City of Muñoz, Nueva Ecija",
    period: "2015 – 2017",
  },
];

export default education;
