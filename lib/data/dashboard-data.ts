// Dummy data for MTI Trade Insights Dashboard
export interface FormSubmission {
  id: string;
  organizationType:
    | "Government"
    | "Business Association"
    | "Cooperative/Farmers Association"
    | "Other";
  otherOrganization?: string;
  businessTypes?: string[];
  country: string;
  importGoods: Array<{
    sector: string;
    product: string;
    hsCode?: string;
    quantity?: string;
    unit?: string;
    frequency?: "Monthly" | "Quarterly" | "Annually";
    standards?: string;
    authority?: string;
  }>;
  importServices: Array<{
    sector: string;
    description: string;
  }>;
  exportGoods: Array<{
    sector: string;
    product: string;
    hsCode?: string;
    quantity?: string;
    unit?: string;
    frequency?: "Monthly" | "Quarterly" | "Annually";
  }>;
  exportServices: Array<{
    sector: string;
    description: string;
  }>;
  contactInfo: {
    name: string;
    company: string;
    city: string;
    country: string;
    email: string;
    phone?: string;
  };
  socialMedia: {
    originCountry: string;
    buyFromNigeria: Array<{ item: string }>;
    sellToNigeria: Array<{ item: string }>;
    userType: string;
    gender?: "Male" | "Female";
    contactMethod?: string[];
    contactInfo?: string;
  };
  submissionDate: string;
}

// Dummy submissions data
export const dummySubmissions: FormSubmission[] = [
  {
    id: "1",
    organizationType: "Business Association",
    businessTypes: ["SME Owner", "Distributor/Wholesaler"],
    country: "KE",
    importGoods: [
      {
        sector: "Agriculture",
        product: "Cocoa beans",
        quantity: "500",
        unit: "tons",
        frequency: "Monthly",
      },
      {
        sector: "Food & Beverage",
        product: "Palm oil",
        quantity: "200",
        unit: "tons",
        frequency: "Quarterly",
      },
    ],
    importServices: [
      {
        sector: "Financial Services",
        description: "Trade financing and letters of credit",
      },
    ],
    exportGoods: [
      {
        sector: "Agriculture",
        product: "Tea",
        quantity: "1000",
        unit: "tons",
        frequency: "Monthly",
      },
    ],
    exportServices: [
      {
        sector: "Software/Technology Services",
        description: "Mobile payment solutions and fintech",
      },
    ],
    contactInfo: {
      name: "John Kimani",
      company: "Kenya Trade Association",
      city: "Nairobi",
      country: "KE",
      email: "j.kimani@kta.ke",
    },
    socialMedia: {
      originCountry: "KE",
      buyFromNigeria: [{ item: "Cocoa products" }, { item: "Textiles" }],
      sellToNigeria: [{ item: "Tea" }, { item: "Coffee" }],
      userType: "SME Owner",
      gender: "Male",
    },
    submissionDate: "2024-01-15",
  },
  {
    id: "2",
    organizationType: "Government",
    country: "GH",
    importGoods: [
      {
        sector: "Machinery & Electronics",
        product: "Agricultural machinery",
        quantity: "50",
        unit: "units",
        frequency: "Annually",
      },
    ],
    importServices: [
      {
        sector: "Educational Services",
        description: "Technical training programs",
      },
    ],
    exportGoods: [
      {
        sector: "Minerals & Metals",
        product: "Gold",
        quantity: "10",
        unit: "kg",
        frequency: "Monthly",
      },
    ],
    exportServices: [
      {
        sector: "Business Services",
        description: "Mining consultancy services",
      },
    ],
    contactInfo: {
      name: "Akosua Mensah",
      company: "Ghana Ministry of Trade",
      city: "Accra",
      country: "GH",
      email: "a.mensah@trade.gov.gh",
    },
    socialMedia: {
      originCountry: "GH",
      buyFromNigeria: [{ item: "Petroleum products" }, { item: "Chemicals" }],
      sellToNigeria: [{ item: "Gold" }, { item: "Cocoa" }],
      userType: "Government",
      gender: "Female",
    },
    submissionDate: "2024-01-20",
  },
  {
    id: "3",
    organizationType: "Business Association",
    businessTypes: ["Large Company/Corporation"],
    country: "ZA",
    importGoods: [
      {
        sector: "Petrochemicals & Fuels",
        product: "Crude oil",
        quantity: "10000",
        unit: "barrels",
        frequency: "Monthly",
      },
    ],
    importServices: [
      {
        sector: "Transport Services",
        description: "Shipping and logistics",
      },
    ],
    exportGoods: [
      {
        sector: "Machinery & Electronics",
        product: "Mining equipment",
        quantity: "25",
        unit: "units",
        frequency: "Quarterly",
      },
      {
        sector: "Minerals & Metals",
        product: "Platinum",
        quantity: "5",
        unit: "kg",
        frequency: "Monthly",
      },
    ],
    exportServices: [
      {
        sector: "Financial Services",
        description: "Investment banking and capital markets",
      },
    ],
    contactInfo: {
      name: "Thabo Mthembu",
      company: "South African Chamber of Commerce",
      city: "Johannesburg",
      country: "ZA",
      email: "t.mthembu@sacc.co.za",
    },
    socialMedia: {
      originCountry: "ZA",
      buyFromNigeria: [
        { item: "Oil and gas" },
        { item: "Agricultural products" },
      ],
      sellToNigeria: [
        { item: "Mining equipment" },
        { item: "Financial services" },
      ],
      userType: "Large Company/Corporation",
      gender: "Male",
    },
    submissionDate: "2024-01-25",
  },
  // Add more dummy data...
  {
    id: "4",
    organizationType: "Cooperative/Farmers Association",
    country: "UG",
    importGoods: [
      {
        sector: "Agriculture",
        product: "Seeds and fertilizers",
        quantity: "100",
        unit: "tons",
        frequency: "Quarterly",
      },
    ],
    importServices: [
      {
        sector: "Educational Services",
        description: "Agricultural training and extension services",
      },
    ],
    exportGoods: [
      {
        sector: "Agriculture",
        product: "Coffee beans",
        quantity: "2000",
        unit: "tons",
        frequency: "Annually",
      },
    ],
    exportServices: [],
    contactInfo: {
      name: "Grace Nakato",
      company: "Uganda Coffee Farmers Association",
      city: "Kampala",
      country: "UG",
      email: "g.nakato@ucfa.ug",
    },
    socialMedia: {
      originCountry: "UG",
      buyFromNigeria: [{ item: "Agricultural inputs" }],
      sellToNigeria: [{ item: "Coffee" }, { item: "Bananas" }],
      userType: "Cooperative/Farmers Association",
      gender: "Female",
    },
    submissionDate: "2024-02-01",
  },
  {
    id: "5",
    organizationType: "Business Association",
    businessTypes: ["Startup"],
    country: "TZ",
    importGoods: [],
    importServices: [
      {
        sector: "Software/Technology Services",
        description: "Cloud computing and data analytics",
      },
    ],
    exportGoods: [],
    exportServices: [
      {
        sector: "Tourism and Travel-Related Services",
        description: "Safari and eco-tourism packages",
      },
    ],
    contactInfo: {
      name: "Amani Hassan",
      company: "Tanzania Tech Hub",
      city: "Dar es Salaam",
      country: "TZ",
      email: "a.hassan@tzhub.tz",
    },
    socialMedia: {
      originCountry: "TZ",
      buyFromNigeria: [{ item: "Tech services" }],
      sellToNigeria: [{ item: "Tourism services" }],
      userType: "Startup",
      gender: "Male",
    },
    submissionDate: "2024-02-05",
  },
];

// Aggregated data for charts
export const getDashboardMetrics = () => {
  const totalResponses = dummySubmissions.length;
  const uniqueCountries = new Set(dummySubmissions.map((s) => s.country)).size;
  const totalOrganizations = dummySubmissions.length;
  const activeOpportunities = dummySubmissions.reduce(
    (acc, s) =>
      acc +
      s.importGoods.length +
      s.importServices.length +
      s.exportGoods.length +
      s.exportServices.length,
    0
  );

  return {
    totalResponses: 1247, // Scaled up for demo
    uniqueCountries: 54,
    totalOrganizations: 892,
    activeOpportunities: 2156,
  };
};

export const getCountryDistribution = () => {
  const countryLabels: Record<string, string> = {
    KE: "Kenya",
    GH: "Ghana",
    ZA: "South Africa",
    UG: "Uganda",
    TZ: "Tanzania",
    CM: "Cameroon",
    EG: "Egypt",
  };

  // Scaled dummy data
  return [
    { country: "Kenya", code: "KE", responses: 287, percentage: 23 },
    { country: "Ghana", code: "GH", responses: 224, percentage: 18 },
    { country: "South Africa", code: "ZA", responses: 187, percentage: 15 },
    { country: "Uganda", code: "UG", responses: 150, percentage: 12 },
    { country: "Tanzania", code: "TZ", responses: 125, percentage: 10 },
    { country: "Cameroon", code: "CM", responses: 100, percentage: 8 },
    { country: "Egypt", code: "EG", responses: 87, percentage: 7 },
    { country: "Others", code: "OT", responses: 87, percentage: 7 },
  ];
};

export const getSectorDistribution = () => {
  return {
    import: [
      { sector: "Agriculture", count: 145, percentage: 25 },
      { sector: "Food & Beverage", count: 120, percentage: 21 },
      { sector: "Minerals & Metals", count: 95, percentage: 16 },
      { sector: "Textiles & Apparel", count: 75, percentage: 13 },
      { sector: "Petrochemicals & Fuels", count: 60, percentage: 10 },
      { sector: "Machinery & Electronics", count: 45, percentage: 8 },
      {
        sector: "Pharmaceuticals & Medical Supplies",
        count: 35,
        percentage: 6,
      },
      { sector: "Building Materials", count: 25, percentage: 4 },
    ],
    export: [
      { sector: "Machinery & Electronics", count: 135, percentage: 28 },
      { sector: "Minerals & Metals", count: 115, percentage: 24 },
      { sector: "Agriculture", count: 95, percentage: 20 },
      { sector: "Chemicals", count: 65, percentage: 14 },
      { sector: "Textiles & Apparel", count: 45, percentage: 9 },
      { sector: "Food & Beverage", count: 35, percentage: 7 },
      { sector: "Building Materials", count: 25, percentage: 5 },
      {
        sector: "Pharmaceuticals & Medical Supplies",
        count: 15,
        percentage: 3,
      },
    ],
  };
};

export const getOrganizationTypes = () => {
  return [
    { type: "Business Association", count: 561, percentage: 45 },
    { type: "Government", count: 312, percentage: 25 },
    { type: "Cooperative/Farmers Association", count: 250, percentage: 20 },
    { type: "Other", count: 124, percentage: 10 },
  ];
};

export const getBusinessTypes = () => {
  return [
    { type: "SME Owner", count: 312, percentage: 35 },
    { type: "Distributor/Wholesaler", count: 214, percentage: 24 },
    { type: "Large Company/Corporation", count: 161, percentage: 18 },
    { type: "Individual Buyer/Consumer", count: 134, percentage: 15 },
    { type: "Supermarket/Retailer", count: 45, percentage: 5 },
    { type: "Startup", count: 26, percentage: 3 },
  ];
};

export const getServiceDistribution = () => {
  return {
    requested: [
      { service: "Financial Services", count: 95, percentage: 28 },
      { service: "Software/Technology Services", count: 78, percentage: 23 },
      { service: "Business Services", count: 65, percentage: 19 },
      { service: "Educational Services", count: 45, percentage: 13 },
      { service: "Health-Related Services", count: 35, percentage: 10 },
      { service: "Transport Services", count: 25, percentage: 7 },
    ],
    offered: [
      { service: "Software/Technology Services", count: 125, percentage: 32 },
      { service: "Business Services", count: 98, percentage: 25 },
      { service: "Construction Services", count: 85, percentage: 22 },
      { service: "Financial Services", count: 65, percentage: 17 },
      { service: "Educational Services", count: 45, percentage: 12 },
      { service: "Transport Services", count: 35, percentage: 9 },
    ],
  };
};

export const getTradeOpportunities = () => {
  return [
    {
      demand: "Agriculture",
      demandCountry: "Kenya",
      supply: "Nigeria",
      matchScore: 95,
      status: "high" as const,
    },
    {
      demand: "Machinery",
      demandCountry: "Ghana",
      supply: "South Africa",
      matchScore: 87,
      status: "high" as const,
    },
    {
      demand: "Tech Services",
      demandCountry: "Nigeria",
      supply: "Kenya",
      matchScore: 82,
      status: "medium" as const,
    },
    {
      demand: "Textiles",
      demandCountry: "Uganda",
      supply: "Nigeria",
      matchScore: 78,
      status: "medium" as const,
    },
    {
      demand: "Financial Services",
      demandCountry: "Tanzania",
      supply: "South Africa",
      matchScore: 71,
      status: "medium" as const,
    },
  ];
};

export const getFrequencyDistribution = () => {
  return [
    { frequency: "Monthly", count: 748, percentage: 60 },
    { frequency: "Quarterly", count: 374, percentage: 30 },
    { frequency: "Annually", count: 125, percentage: 10 },
  ];
};

export const getSubmissionTrends = () => {
  return [
    { month: "Jan", submissions: 85 },
    { month: "Feb", submissions: 120 },
    { month: "Mar", submissions: 95 },
    { month: "Apr", submissions: 140 },
    { month: "May", submissions: 110 },
    { month: "Jun", submissions: 165 },
    { month: "Jul", submissions: 135 },
    { month: "Aug", submissions: 180 },
    { month: "Sep", submissions: 155 },
    { month: "Oct", submissions: 195 },
    { month: "Nov", submissions: 170 },
    { month: "Dec", submissions: 145 },
  ];
};

export const getVolumeDistribution = () => {
  return [
    { volume: "High", frequency: "Monthly", count: 45, x: 3000, y: 12 },
    { volume: "High", frequency: "Quarterly", count: 25, x: 2500, y: 4 },
    { volume: "Medium", frequency: "Monthly", count: 35, x: 1500, y: 12 },
    { volume: "Medium", frequency: "Quarterly", count: 40, x: 1200, y: 4 },
    { volume: "Medium", frequency: "Annually", count: 15, x: 1000, y: 1 },
    { volume: "Low", frequency: "Monthly", count: 20, x: 500, y: 12 },
    { volume: "Low", frequency: "Quarterly", count: 30, x: 400, y: 4 },
    { volume: "Low", frequency: "Annually", count: 25, x: 300, y: 1 },
  ];
};
