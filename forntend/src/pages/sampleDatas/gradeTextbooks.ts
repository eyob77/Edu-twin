export type Topic = {
  id: string
  title: string
}

export type Chapter = {
  id: string
  title: string
  topics: Topic[]
}

export type SubjectBook = {
  subject: string
  chapters: Chapter[]
}

export const gradeBooks: Record<number, SubjectBook[]> = {
  9: [
    {
      subject: "Biology",
      chapters: [
        { id: "bio-9-1", title: "Cell Structure", topics: [{ id: "cell-theory", title: "Cell Theory" }, { id: "organelles", title: "Cell Organelles" }] },
        { id: "bio-9-2", title: "Classification", topics: [{ id: "taxonomy", title: "Taxonomy Basics" }, { id: "kingdoms", title: "Five Kingdoms" }] },
      ],
    },
    {
      subject: "Physics",
      chapters: [
        { id: "phy-9-1", title: "Motion", topics: [{ id: "distance-speed", title: "Distance and Speed" }, { id: "graphs", title: "Motion Graphs" }] },
        { id: "phy-9-2", title: "Forces", topics: [{ id: "newton-laws", title: "Newton Laws" }, { id: "friction", title: "Friction" }] },
      ],
    },
    {
      subject: "Chemistry",
      chapters: [
        { id: "chem-9-1", title: "Matter", topics: [{ id: "states-matter", title: "States of Matter" }, { id: "changes-matter", title: "Physical vs Chemical Changes" }] },
        { id: "chem-9-2", title: "Atom", topics: [{ id: "atomic-structure", title: "Atomic Structure" }, { id: "isotopes", title: "Isotopes" }] },
      ],
    },
    {
      subject: "Mathematics",
      chapters: [
        { id: "math-9-1", title: "Algebra", topics: [{ id: "expressions", title: "Linear Expressions" }, { id: "equations", title: "Solving Equations" }] },
        { id: "math-9-2", title: "Geometry", topics: [{ id: "angles", title: "Angles and Lines" }, { id: "triangles", title: "Triangles" }] },
      ],
    },
  ],
  10: [
    {
      subject: "Biology",
      chapters: [
        { id: "bio-10-1", title: "Genetics", topics: [{ id: "dna", title: "DNA and Genes" }, { id: "inheritance", title: "Patterns of Inheritance" }] },
        { id: "bio-10-2", title: "Human Systems", topics: [{ id: "circulatory", title: "Circulatory System" }, { id: "respiratory", title: "Respiratory System" }] },
      ],
    },
    {
      subject: "Physics",
      chapters: [
        { id: "phy-10-1", title: "Work and Energy", topics: [{ id: "work", title: "Work" }, { id: "energy", title: "Energy Conservation" }] },
        { id: "phy-10-2", title: "Electricity", topics: [{ id: "current", title: "Electric Current" }, { id: "circuits", title: "Basic Circuits" }] },
      ],
    },
    {
      subject: "Chemistry",
      chapters: [
        { id: "chem-10-1", title: "Periodic Table", topics: [{ id: "periodic-trends", title: "Periodic Trends" }, { id: "valency", title: "Valency" }] },
        { id: "chem-10-2", title: "Chemical Reactions", topics: [{ id: "reaction-types", title: "Reaction Types" }, { id: "balancing", title: "Balancing Equations" }] },
      ],
    },
    {
      subject: "Mathematics",
      chapters: [
        { id: "math-10-1", title: "Quadratics", topics: [{ id: "factoring", title: "Factoring" }, { id: "roots", title: "Roots and Graphs" }] },
        { id: "math-10-2", title: "Trigonometry", topics: [{ id: "ratios", title: "Trig Ratios" }, { id: "applications", title: "Applications" }] },
      ],
    },
  ],
  11: [
    {
      subject: "Biology",
      chapters: [
        { id: "bio-11-1", title: "Biotechnology", topics: [{ id: "genetic-engineering", title: "Genetic Engineering" }, { id: "applications-bio", title: "Biotech Applications" }] },
        { id: "bio-11-2", title: "Ecology", topics: [{ id: "ecosystems", title: "Ecosystems" }, { id: "cycles", title: "Biogeochemical Cycles" }] },
      ],
    },
    {
      subject: "Physics",
      chapters: [
        { id: "phy-11-1", title: "Waves", topics: [{ id: "wave-properties", title: "Wave Properties" }, { id: "interference", title: "Interference" }] },
        { id: "phy-11-2", title: "Thermodynamics", topics: [{ id: "heat", title: "Heat Transfer" }, { id: "laws-thermo", title: "Laws of Thermodynamics" }] },
      ],
    },
    {
      subject: "Chemistry",
      chapters: [
        { id: "chem-11-1", title: "Bonding", topics: [{ id: "ionic-covalent", title: "Ionic and Covalent Bonding" }, { id: "molecular-geometry", title: "Molecular Geometry" }] },
        { id: "chem-11-2", title: "Solutions", topics: [{ id: "concentration", title: "Concentration" }, { id: "solubility", title: "Solubility" }] },
      ],
    },
    {
      subject: "Mathematics",
      chapters: [
        { id: "math-11-1", title: "Functions", topics: [{ id: "polynomial", title: "Polynomial Functions" }, { id: "exponential", title: "Exponential Functions" }] },
        { id: "math-11-2", title: "Calculus Intro", topics: [{ id: "limits", title: "Limits" }, { id: "derivatives", title: "Derivatives Basics" }] },
      ],
    },
  ],
  12: [
    {
      subject: "Biology",
      chapters: [
        { id: "bio-12-1", title: "Evolution", topics: [{ id: "natural-selection", title: "Natural Selection" }, { id: "speciation", title: "Speciation" }] },
        { id: "bio-12-2", title: "Advanced Human Biology", topics: [{ id: "neural", title: "Neural Coordination" }, { id: "hormonal", title: "Hormonal Control" }] },
      ],
    },
    {
      subject: "Physics",
      chapters: [
        { id: "phy-12-1", title: "Electromagnetism", topics: [{ id: "fields", title: "Electric and Magnetic Fields" }, { id: "induction", title: "Electromagnetic Induction" }] },
        { id: "phy-12-2", title: "Modern Physics", topics: [{ id: "quantum", title: "Quantum Basics" }, { id: "nuclear", title: "Nuclear Physics" }] },
      ],
    },
    {
      subject: "Chemistry",
      chapters: [
        { id: "chem-12-1", title: "Organic Chemistry", topics: [{ id: "hydrocarbons", title: "Hydrocarbons" }, { id: "functional-groups", title: "Functional Groups" }] },
        { id: "chem-12-2", title: "Equilibrium", topics: [{ id: "dynamic-equilibrium", title: "Dynamic Equilibrium" }, { id: "le-chatelier", title: "Le Chatelier Principle" }] },
      ],
    },
    {
      subject: "Mathematics",
      chapters: [
        { id: "math-12-1", title: "Calculus", topics: [{ id: "integration", title: "Integration" }, { id: "applications-calc", title: "Applications of Calculus" }] },
        { id: "math-12-2", title: "Probability", topics: [{ id: "random-variables", title: "Random Variables" }, { id: "distributions", title: "Distributions" }] },
      ],
    },
  ],
}

export function getBooksForGrade(gradeLevel: number) {
  return gradeBooks[gradeLevel] ?? gradeBooks[9]
}
