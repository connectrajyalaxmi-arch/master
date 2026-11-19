export const services = [
  {
    id: 'iiot',
    title: 'Industrial IoT & Smart Factories',
    description: 'Connect intelligent devices, machines and systems to cloud platforms, operational tools and enterprise applications.',
    includes: ['Industrial IoT gateways', 'Smart sensors & devices', 'Smart factories', 'Production & warehouse management', 'Asset & quality management', 'Industry 4.0 to Industry 5.0'],
  },
  {
    id: 'automation',
    title: 'Automation, MEP & Process Control',
    description: 'Design and integrate automation and control systems for industrial, building and utility operations.',
    includes: ['Process & factory automation', 'Field instruments', 'SCADA & DCS', 'PCC, MCC, motor & drive panels', 'STP, ETP & IoT water management', 'Nurse calling, security & surveillance'],
  },
  {
    id: 'facilities',
    title: 'Smart Buildings & Facility Management',
    description: 'Bring building, facility, energy and utility systems into a connected monitoring and management environment.',
    includes: ['Integrated building management', 'Facility management', 'Energy management', 'Utility management', 'BMS & SCADA', 'Energy & utility billing'],
  },
  {
    id: 'digital',
    title: 'Cloud, Software & Data Analytics',
    description: 'Develop software and cloud-enabled solutions, data engineering and analytics from connected devices to applications.',
    includes: ['Cloud computing (PaaS & SaaS)', 'Embedded software & mobile apps', 'Data engineering', 'Stream analysis & machine learning', 'Predictive analytics & notifications', 'Power BI visualization', 'Engineering & testing'],
  },
] as const

export const sectors = [
  'Infrastructure',
  'Manufacturing',
  'Automotive',
  'Logistics & Transport',
  'Consumer Goods',
  'Energy & Utilities',
] as const

export const executionCapabilities = [
  'Solution design & engineering',
  'Project management & commercial coordination',
  'Supply, installation, testing & commissioning',
  'Industrial automation & process control',
  'Data center monitoring & energy management',
  'SCADA, DCS, PCC & MCC systems',
  'IoT & cloud-based monitoring',
  'Thermal monitoring & predictive maintenance',
  'Utility and energy billing automation',
  'End-to-end digital transformation',
] as const

export const projects = [
  { client: 'STT Global Data Centre', detail: 'Branch Circuit Monitoring and Billing System' },
  { client: 'Microsoft India', detail: 'Energy Monitoring and Branch Circuit Monitoring & Billing' },
  { client: 'Apple India', detail: 'Energy Monitoring System' },
  { client: 'Amazon', detail: 'Thermal Monitoring System' },
  { client: 'Maldives Airport', detail: 'DCS, SCADA, PCC and MCC Systems' },
  { client: 'Adani Ports', detail: 'DCS, SCADA, PCC and MCC Systems' },
  { client: 'Qualcomm', detail: 'Branch Circuit Monitoring and Billing System' },
  { client: 'HSBC', detail: 'IoT Energy Management System' },
  { client: 'Barclays', detail: 'IoT Energy Management System' },
  { client: 'Regenesis Industries', detail: 'DCS, SCADA, PCC and MCC Systems' },
] as const

export const strengths = [
  { title: 'Proven Delivery', detail: 'Project experience across data centers, airports, ports, manufacturing plants and commercial facilities.' },
  { title: 'OT + IT Integration', detail: 'Integration of operational technology and IT systems for real-time monitoring and control.' },
  { title: 'Domain Knowledge', detail: 'Energy management, facility management, industrial automation and Industry 4.0.' },
  { title: 'Dedicated Teams', detail: 'Engineering, commissioning and support teams with field execution experience.' },
  { title: 'End-to-End Capability', detail: 'Project delivery from concept, engineering and procurement through commissioning and handover.' },
  { title: 'Mission-Critical Trust', detail: 'The profile describes work with global technology leaders, infrastructure operators and enterprise customers.' },
] as const

export const partnersAndClients = [
  'ABB', 'Apple', 'AMD', 'Microsoft', 'Shree Cement', 'Regenesis Industries',
  'Informatica', 'Shilpa Biologicals', 'JSW', 'JPMorgan Chase', 'Maldives Airports',
  'Amazon', 'Adani', 'Qualcomm', 'HSBC', 'Barclays', 'Micron Electricals',
  'Vertiv', 'ITC Limited', 'TGV Group', 'Philips', 'STT Global Data Centres',
  'Honeywell', 'TEMBO',
] as const
