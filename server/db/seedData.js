// Sample categories and banking products used to seed the Neon database.
// metric.format tells the UI how to display the value: currency | percent | date | text
export const categoryData = [
  { slug: "savings", name: "Savings", description: "Everyday and high-interest savings accounts", sortOrder: 1 },
  { slug: "credit_card", name: "Credit Cards", description: "Rewards, cashback and travel credit cards", sortOrder: 2 },
  { slug: "loan", name: "Loans", description: "Home, car and personal loans", sortOrder: 3 },
  { slug: "wealth", name: "Wealth", description: "Mutual funds, PMS and gold investments", sortOrder: 4 },
  { slug: "deposit", name: "Deposits", description: "Fixed and recurring deposits", sortOrder: 5 },
];

export const productData = [
  // ---------- Savings ----------
  {
    name: "Everyday Savings Account",
    category: "savings",
    status: "active",
    description: "A flexible savings account for daily banking with instant transfers and a free debit card.",
    accountRef: "XXXX 4821",
    metrics: [
      { label: "Available Balance", value: 248650.75, format: "currency" },
      { label: "Interest Rate", value: 3.5, format: "percent" },
    ],
    features: ["Free platinum debit card", "Unlimited UPI & IMPS transfers", "Monthly interest credit"],
  },
  {
    name: "Salary Plus Account",
    category: "savings",
    status: "active",
    description: "Zero-balance salary account with higher interest on balances above ₹1 lakh.",
    accountRef: "XXXX 1907",
    metrics: [
      { label: "Available Balance", value: 92340.0, format: "currency" },
      { label: "Interest Rate", value: 4.0, format: "percent" },
    ],
    features: ["Zero minimum balance", "Free cheque book", "Overdraft up to 2x salary"],
  },
  {
    name: "Senior Citizen Savings",
    category: "savings",
    status: "available",
    description: "A savings account for customers aged 60+ with extra interest and doorstep banking.",
    accountRef: null,
    metrics: [
      { label: "Interest Rate", value: 4.5, format: "percent" },
      { label: "Min. Balance", value: 5000, format: "currency" },
    ],
    features: ["Extra 0.5% interest", "Doorstep banking", "Priority branch service"],
  },

  // ---------- Credit cards ----------
  {
    name: "Platinum Rewards Card",
    category: "credit_card",
    status: "active",
    description: "Earn 5X reward points on dining and travel, with complimentary airport lounge access.",
    accountRef: "XXXX 7734",
    metrics: [
      { label: "Available Limit", value: 184500, format: "currency" },
      { label: "Next Due Date", value: "2026-11-24", format: "date" },
    ],
    features: ["5X points on dining & travel", "8 domestic lounge visits / year", "1% fuel surcharge waiver"],
  },
  {
    name: "Cashback Card",
    category: "credit_card",
    status: "pending",
    description: "Flat 5% cashback on online shopping and 1% on all other spends. Application under review.",
    accountRef: "APP-20931",
    metrics: [
      { label: "Requested Limit", value: 150000, format: "currency" },
      { label: "Applied On", value: "2026-10-30", format: "date" },
    ],
    features: ["5% cashback online", "1% cashback everywhere else", "No annual fee above ₹2L spend"],
  },
  {
    name: "Travel Elite Card",
    category: "credit_card",
    status: "available",
    description: "A premium travel card with zero forex markup and international lounge access.",
    accountRef: null,
    metrics: [
      { label: "Forex Markup", value: 0, format: "percent" },
      { label: "Annual Fee", value: 4999, format: "currency" },
    ],
    features: ["Zero forex markup", "Unlimited international lounges", "Complimentary travel insurance"],
  },

  // ---------- Loans ----------
  {
    name: "Home Loan",
    category: "loan",
    status: "active",
    description: "A 20-year home loan at a floating rate, with part-prepayment allowed at no extra charge.",
    accountRef: "HL-558210",
    metrics: [
      { label: "Outstanding", value: 3845000, format: "currency" },
      { label: "Next EMI Due", value: "2026-12-05", format: "date" },
    ],
    features: ["Floating rate 8.40% p.a.", "Zero prepayment charges", "Tax benefits under 80C & 24(b)"],
  },
  {
    name: "Car Loan",
    category: "loan",
    status: "active",
    description: "A 5-year auto loan for your new vehicle with fixed monthly EMIs.",
    accountRef: "CL-310477",
    metrics: [
      { label: "Outstanding", value: 412800, format: "currency" },
      { label: "Monthly EMI", value: 14250, format: "currency" },
    ],
    features: ["Fixed rate 9.10% p.a.", "Up to 100% on-road funding", "Flexible tenure up to 7 years"],
  },
  {
    name: "Personal Loan",
    category: "loan",
    status: "available",
    description: "A pre-approved personal loan with instant disbursal and no collateral.",
    accountRef: null,
    metrics: [
      { label: "Pre-approved Up To", value: 500000, format: "currency" },
      { label: "Interest From", value: 10.5, format: "percent" },
    ],
    features: ["Instant disbursal", "No collateral required", "Tenure 12 to 60 months"],
  },

  // ---------- Wealth ----------
  {
    name: "Equity Mutual Fund SIP",
    category: "wealth",
    status: "active",
    description: "A monthly SIP in a diversified large-cap equity fund.",
    accountRef: "FOLIO 88213",
    metrics: [
      { label: "Current Value", value: 326410, format: "currency" },
      { label: "Returns (XIRR)", value: 14.2, format: "percent" },
    ],
    features: ["₹10,000 monthly SIP", "Auto-debit from savings", "Pause or stop anytime"],
  },
  {
    name: "Portfolio Management Service",
    category: "wealth",
    status: "available",
    description: "A professionally managed equity portfolio with a dedicated relationship manager.",
    accountRef: null,
    metrics: [
      { label: "Min. Investment", value: 5000000, format: "currency" },
      { label: "3Y Avg. Returns", value: 17.8, format: "percent" },
    ],
    features: ["Dedicated relationship manager", "Quarterly portfolio review", "Customised strategy"],
  },
  {
    name: "Gold Savings Fund",
    category: "wealth",
    status: "inactive",
    description: "A digital gold investment. This plan is paused and no new SIPs are being made.",
    accountRef: "FOLIO 40119",
    metrics: [
      { label: "Current Value", value: 58200, format: "currency" },
      { label: "Returns (XIRR)", value: 11.6, format: "percent" },
    ],
    features: ["Backed by 24K physical gold", "Start from ₹500", "Resume SIP anytime"],
  },

  // ---------- Deposits ----------
  {
    name: "Fixed Deposit",
    category: "deposit",
    status: "active",
    description: "A 2-year fixed deposit with interest paid out quarterly.",
    accountRef: "FD-772031",
    metrics: [
      { label: "Deposit Amount", value: 500000, format: "currency" },
      { label: "Maturity Date", value: "2027-08-14", format: "date" },
    ],
    features: ["7.25% p.a. interest", "Quarterly payout", "Loan against FD up to 90%"],
  },
  {
    name: "Recurring Deposit",
    category: "deposit",
    status: "available",
    description: "Build savings with a fixed monthly deposit, starting from just ₹1,000.",
    accountRef: null,
    metrics: [
      { label: "Interest Rate", value: 6.8, format: "percent" },
      { label: "Min. Monthly", value: 1000, format: "currency" },
    ],
    features: ["Tenure 6 months to 10 years", "Auto-debit from savings", "Premature withdrawal allowed"],
  },
  {
    name: "Tax Saver FD",
    category: "deposit",
    status: "pending",
    description: "A 5-year tax-saving fixed deposit eligible under Section 80C. Booking in progress.",
    accountRef: "REQ-11902",
    metrics: [
      { label: "Deposit Amount", value: 150000, format: "currency" },
      { label: "Interest Rate", value: 7.0, format: "percent" },
    ],
    features: ["Tax deduction under 80C", "5-year lock-in", "Guaranteed returns"],
  },
];
