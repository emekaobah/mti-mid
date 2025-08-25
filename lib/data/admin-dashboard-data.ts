// Admin Dashboard Data - Dummy data for MTI Trade Intelligence
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
  goods: Array<{
    sector: string;
    product: string;
    hsCode?: string;
    quantity?: string;
    unit?: string;
    frequency?: "Monthly" | "Quarterly" | "Annually";
    standards?: string;
    authority?: string;
  }>;
  services: Array<{
    sector: string;
    description: string;
  }>;
  name: string;
  company: string;
  city: string;
  email: string;
  phone?: string;
  originCountry: string;
  buyFromNigeria: Array<{ item: string }>;
  sellToNigeria: Array<{ item: string }>;
  userType: string;
  gender?: "Male" | "Female";
  contactMethod?: string[];
  contactInfo?: string;
  submissionDate: string;
  status: "pending" | "reviewed" | "contacted";
}

// Dummy submissions data
export const dummySubmissions: FormSubmission[] = [
  {
    id: "sub_1703123456789_abc123def",
    organizationType: "Business Association",
    businessTypes: ["SME Owner", "Distributor/Wholesaler"],
    country: "KE",
    goods: [
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
    services: [
      {
        sector: "Financial Services",
        description: "Trade financing and letters of credit",
      },
    ],
    name: "John Kimani",
    company: "Kenya Trade Association",
    city: "Nairobi",
    email: "j.kimani@kta.ke",
    originCountry: "KE",
    buyFromNigeria: [{ item: "Cocoa products" }, { item: "Textiles" }],
    sellToNigeria: [{ item: "Tea" }, { item: "Coffee" }],
    userType: "SME Owner",
    gender: "Male",
    submissionDate: "2024-01-15T10:30:00Z",
    status: "contacted",
  },
  {
    id: "sub_1703123456790_def456ghi",
    organizationType: "Government",
    country: "GH",
    goods: [
      {
        sector: "Machinery & Electronics",
        product: "Agricultural machinery",
        quantity: "50",
        unit: "units",
        frequency: "Annually",
      },
    ],
    services: [
      {
        sector: "Educational Services",
        description: "Technical training programs",
      },
    ],
    name: "Akosua Mensah",
    company: "Ghana Ministry of Trade",
    city: "Accra",
    email: "a.mensah@trade.gov.gh",
    originCountry: "GH",
    buyFromNigeria: [{ item: "Petroleum products" }, { item: "Chemicals" }],
    sellToNigeria: [{ item: "Gold" }, { item: "Cocoa" }],
    userType: "Government",
    gender: "Female",
    submissionDate: "2024-01-20T14:15:00Z",
    status: "reviewed",
  },
  {
    id: "sub_1703123456791_ghi789jkl",
    organizationType: "Business Association",
    businessTypes: ["Large Company/Corporation"],
    country: "ZA",
    goods: [
      {
        sector: "Petrochemicals & Fuels",
        product: "Crude oil",
        quantity: "10000",
        unit: "barrels",
        frequency: "Monthly",
      },
    ],
    services: [
      {
        sector: "Transport Services",
        description: "Shipping and logistics",
      },
    ],
    name: "Thabo Mthembu",
    company: "South African Chamber of Commerce",
    city: "Johannesburg",
    email: "t.mthembu@sacc.co.za",
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
    submissionDate: "2024-01-25T09:45:00Z",
    status: "pending",
  },
  {
    id: "sub_1703123456792_jkl012mno",
    organizationType: "Cooperative/Farmers Association",
    country: "UG",
    goods: [
      {
        sector: "Agriculture",
        product: "Seeds and fertilizers",
        quantity: "100",
        unit: "tons",
        frequency: "Quarterly",
      },
    ],
    services: [
      {
        sector: "Educational Services",
        description: "Agricultural training and extension services",
      },
    ],
    name: "Grace Nakato",
    company: "Uganda Coffee Farmers Association",
    city: "Kampala",
    email: "g.nakato@ucfa.ug",
    originCountry: "UG",
    buyFromNigeria: [{ item: "Agricultural inputs" }],
    sellToNigeria: [{ item: "Coffee" }, { item: "Bananas" }],
    userType: "Cooperative/Farmers Association",
    gender: "Female",
    submissionDate: "2024-02-01T11:20:00Z",
    status: "contacted",
  },
  {
    id: "sub_1703123456793_mno345pqr",
    organizationType: "Business Association",
    businessTypes: ["Startup"],
    country: "TZ",
    goods: [],
    services: [
      {
        sector: "Software/Technology Services",
        description: "Cloud computing and data analytics",
      },
    ],
    name: "Amani Hassan",
    company: "Tanzania Tech Hub",
    city: "Dar es Salaam",
    email: "a.hassan@tzhub.tz",
    originCountry: "TZ",
    buyFromNigeria: [{ item: "Tech services" }],
    sellToNigeria: [{ item: "Tourism services" }],
    userType: "Startup",
    gender: "Male",
    submissionDate: "2024-02-05T16:30:00Z",
    status: "reviewed",
  },
];

// Dashboard metrics
export const getDashboardMetrics = () => {
  const totalResponses = dummySubmissions.length;
  const uniqueCountries = new Set(dummySubmissions.map((s) => s.country)).size;
  const totalOrganizations = dummySubmissions.length;
  const activeOpportunities = dummySubmissions.reduce(
    (acc, s) =>
      acc +
      s.goods.length +
      s.services.length +
      s.buyFromNigeria.length +
      s.sellToNigeria.length,
    0
  );

  return {
    totalResponses: 1247, // Scaled up for demo
    uniqueCountries: 54,
    totalOrganizations: 892,
    activeOpportunities: 2156,
  };
};

// Country distribution data
export const getCountryDistribution = () => {
  const countryLabels: Record<string, string> = {
    KE: "Kenya",
    GH: "Ghana",
    ZA: "South Africa",
    UG: "Uganda",
    TZ: "Tanzania",
    CM: "Cameroon",
    EG: "Egypt",
    NG: "Nigeria",
    ET: "Ethiopia",
    MA: "Morocco",
  };

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

// Organization types data
export const getOrganizationTypes = () => {
  return [
    { type: "Business Association", count: 561, percentage: 45 },
    { type: "Government", count: 312, percentage: 25 },
    { type: "Cooperative/Farmers Association", count: 250, percentage: 20 },
    { type: "Other", count: 124, percentage: 10 },
  ];
};

// Business types data
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

// Sector distribution data
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

// Service distribution data
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

// Trade opportunities data
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

// Frequency distribution data
export const getFrequencyDistribution = () => {
  return [
    { frequency: "Monthly", count: 748, percentage: 60 },
    { frequency: "Quarterly", count: 374, percentage: 30 },
    { frequency: "Annually", count: 125, percentage: 10 },
  ];
};

// Submission trends data
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

// Volume distribution data
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

export const getRegionalAnalysis = () => {
  return [
    {
      region: "East Africa",
      countries: 8,
      submissions: 456,
      tradeVolume: 1250,
      percentage: 37,
    },
    {
      region: "West Africa",
      countries: 12,
      submissions: 389,
      tradeVolume: 980,
      percentage: 31,
    },
    {
      region: "Southern Africa",
      countries: 6,
      submissions: 234,
      tradeVolume: 650,
      percentage: 19,
    },
    {
      region: "North Africa",
      countries: 5,
      submissions: 168,
      tradeVolume: 420,
      percentage: 13,
    },
  ];
};

// Recent submissions data
export const getRecentSubmissions = () => {
  return dummySubmissions.slice(0, 5).map((sub) => ({
    id: sub.id,
    name: sub.name,
    company: sub.company,
    country: sub.country,
    organizationType: sub.organizationType,
    submissionDate: sub.submissionDate,
    status: sub.status,
  }));
};

// Data quality metrics
export const getDataQualityMetrics = () => {
  return {
    completeSubmissions: 98,
    validEmail: 99,
    contactInfo: 85,
    totalSubmissions: dummySubmissions.length,
  };
};
