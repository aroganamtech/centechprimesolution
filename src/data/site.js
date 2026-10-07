// All content mirrors https://centechprimesolution.com/. Image URLs point at the original site's media library;
// copy them into /public/images when you want the site fully self-hosted.
const U = 'https://centechprimesolution.com/wp-content/uploads';

export const site = {
  name: 'CenTech Prime Solutions',
  email: 'info@centechprimesolution.com',
  mission: 'To be the leading provider of innovative technology solutions that empower businesses to reach their full potential.',
  logo: `${U}/2024/10/f4f61e92-3b28-4d5b-95e7-182350f7a9b5-1024x399.png`,
  logoWhite: `${U}/2024/10/centec-white-logo-1024x432.png`,
  offices: [
    { region: 'Europe', address: 'Chaussee des Gaulois 4/12, 1300 Wavre, Belgium.' },
    { region: 'India', address: '7/8 Burma Colony Gundur Trichy 620007' },
  ],
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/people/Centech-Prime-Solutions/61567112606919/' },
    { label: 'Instagram', href: 'https://www.instagram.com/centectprimesolutions/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/centech-prime-solutions/about/?viewAsMember=true' },
  ],
};

export const img = {
  hero: `${U}/2024/11/28ab990c-566f-4296-ab40-5b805353bc84-1024x803.jpg`,
  about: `${U}/2024/10/2150038851.jpg`,
  project4: `${U}/2024/03/project4.jpg`,
  project3: `${U}/2024/03/project3.jpg`,
  quote: `${U}/2024/03/quote.png`,
  user: `${U}/2024/10/user.png`,
  cyber: `${U}/2024/10/204.jpg`,
  cyber2: `${U}/2024/10/9217.jpg`,
};

// Services (slug = original WordPress slug under /service/)
export const services = [
  {
    slug: 'it-consultancy-services', title: 'IT Consultancy Services', nav: 'IT Consultancy Services', card: 'IT Consultancy', menu: 'solutions',
    sub: 'Aligning Technology with Business Goals',
    intro: 'Strategic consulting aligning technology with business goals, covering infrastructure, software solutions, and digital transformation.',
    offerings: ['IT Strategy Development and Planning', 'Technology Roadmap Creation', 'IT Infrastructure Consulting', 'Digital Transformation Advisory', 'Vendor Selection and Management'],
  },
  {
    slug: 'non-it-consultancy-services', title: 'Non-IT Consultancy Services', nav: 'Non-IT Consultancy', card: 'Non-IT Consultancy', menu: 'services',
    sub: 'Optimising the Business Around the Technology',
    intro: 'Consultancy across non-IT sectors including HR, finance, and operations to optimize processes.',
    offerings: ['Business Process Optimization', 'Financial and Operational Consulting', 'Human Resource Strategy Consulting', 'Compliance and Risk Management Advisory', 'Strategic Planning for Non-IT Projects'],
  },
  {
    slug: 'cloud-migration-and-management-services', title: 'Cloud Migration & Management Services', nav: 'Cloud Migration Services', card: 'Cloud Migration', menu: 'services',
    sub: 'Move to the Cloud with Confidence',
    intro: 'End-to-end cloud migration support from planning through post-migration management.',
    offerings: ['Cloud Strategy and Consulting', 'Cloud Architecture Design', 'Cloud Migration Planning and Execution (AWS, Azure, Google Cloud)', 'Multi-Cloud and Hybrid Cloud Solutions', 'Cloud Security and Compliance', 'Cloud Cost Optimization'],
  },
  {
    slug: 'software-development-and-integration-services', title: 'Software Development & Integration Services', nav: 'Software Development', card: 'Software Development', menu: 'services',
    sub: 'Software Built Around Your Business',
    intro: 'Custom software, mobile apps, and system integration for IT and non-IT businesses.',
    offerings: ['Custom Software Development', 'Web and Mobile App Development', 'Enterprise Resource Planning (ERP) Solutions', 'API and System Integration', 'Legacy System Modernization', 'Software Testing and QA'],
  },
  {
    slug: 'data-analytics-and-business-intelligence', title: 'Data Analytics and Business Intelligence', nav: 'Data Analytics Intelligence', card: 'Data Analytics', menu: 'solutions',
    sub: 'Transforming Data into Insights',
    intro: 'Data-driven insights enabling informed business decisions for performance improvement. Unlock the power of your data.',
    offerings: ['Data Warehousing and Management', 'Predictive and Prescriptive Analytics', 'Business Intelligence Dashboard Creation', 'Big Data Solutions', 'Data Visualization and Reporting'],
  },
  {
    slug: 'cybersecurity-services', title: 'Cybersecurity Services', nav: 'Cyber Security', card: 'Cyber & Data Security', menu: 'services',
    sub: 'Fortifying Your Digital Landscape',
    heroTitle: 'Fortifying Your Digital Landscape', heroSub: 'Cyber Security Services',
    intro: 'Protect your business from evolving cyber threats with our comprehensive cybersecurity solutions. At CenTech Prime, we ensure your organization remains secure, resilient, and prepared for any challenge.',
    offerings: ['Security Assessments and Audits', 'Vulnerability Management', 'Penetration Testing', 'Network Security Solutions', 'Incident Response and Disaster Recovery Planning'],
    image: img.cyber, image2: img.cyber2,
    importance: { title: 'The Importance of Cyber Security', text: 'Robust cyber security measures are no longer optional—they are essential.' },
    why: { title: 'Why CenTech Prime Is Your Best Defense', points: [['Proactive Defense', 'We anticipate threats before they become incidents.'], ['Customized Strategies', 'Security approaches tailored to your business and risk profile.'], ['Proven Success', 'Measurable reductions in incidents for the clients we protect.']], quote: 'At CenTech Prime, we transform cybersecurity from a burden into a strategic advantage.' },
    future: { title: "Preparing for Tomorrow's Threats", stats: ['60% of businesses that invest in cybersecurity experience fewer security incidents. (Ponemon Institute)', '70% of organizations with robust incident response plans report better resilience. (IBM Security)', '75% of companies that conduct regular security assessments have significantly reduced breach risk. (CISA)'] },
  },
  {
    slug: 'cloud-native-application-development', title: 'Cloud-Native Application Development', nav: 'Cloud-Native Application Development', card: 'Cloud-Native Development', menu: 'solutions',
    sub: 'Harness the Power of the Cloud',
    intro: 'Transform your business with cloud-native applications built on microservices, containerization, and DevOps methodologies.',
    offerings: ['Microservices Architecture Development', 'Containerization (Docker and Kubernetes)', 'Serverless Application Development', 'Continuous Integration/Continuous Deployment (CI/CD)', 'Cloud-Based Application Scaling and Management'],
  },
  {
    slug: 'it-infrastructure-and-support-services', title: 'IT Infrastructure and Support Services', nav: 'IT Infrastructure', card: 'IT Infrastructure Support', menu: 'services',
    sub: 'Establishing a Strong IT Backbone',
    intro: 'Ensure your business thrives with complete infrastructure setup, monitoring, and management for stable, secure environments.',
    offerings: ['IT Infrastructure Setup and Configuration', 'Network Design and Implementation', 'IT Support and Helpdesk Services', 'Disaster Recovery and Backup Solutions', 'Remote Infrastructure Management (RIM)'],
  },
  {
    slug: 'cloud-cost-management-and-optimization', title: 'Cloud Cost Management and Optimization', nav: 'Cloud Cost Management', card: 'Cloud Cost Management', menu: 'solutions',
    sub: 'Spend Smarter in the Cloud',
    intro: 'We analyze usage patterns and inefficiencies to reduce cloud spending while maintaining performance.',
    offerings: ['Cloud Cost Audits', 'Resource Optimization and Right-Sizing', 'Reserved Instances and Savings Plans', 'Usage Monitoring and Reporting', 'Billing Management and Automation'],
  },
  {
    slug: 'devops-and-automation-consulting', title: 'DevOps and Automation Consulting', nav: 'DevOps and Automation Consulting', card: 'DevOps and Automation', menu: 'solutions',
    sub: 'Accelerate Delivery, Automate Everything',
    intro: 'Accelerate development cycles and improve operational efficiency through continuous practices.',
    offerings: ['DevOps Strategy and Roadmap Development', 'CI/CD Pipeline Setup', 'Infrastructure as Code (IaC)', 'Automated Testing and Deployment', 'Monitoring and Performance Optimization'],
  },
  {
    slug: 'industry-integrated-ai-digital-transformation-training-program', title: 'AI & Digital Transformation Training', nav: 'AI & Digital Transformation Training', card: 'AI & Digital Transformation Training', menu: 'services',
    sub: 'Industry-Integrated Training Program',
    intro: 'An industry-integrated programme that equips professionals and teams with practical AI and digital transformation skills.',
    offerings: ['Applied AI and Automation Workshops', 'Digital Transformation Leadership', 'Hands-on, Industry-Integrated Projects', 'Custom Team Enablement'],
    placeholder: true,
  },
];

export const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
export const menuServices = ['software-development-and-integration-services', 'cybersecurity-services', 'it-infrastructure-and-support-services', 'cloud-migration-and-management-services', 'non-it-consultancy-services', 'industry-integrated-ai-digital-transformation-training-program'].map((s) => bySlug[s]);
export const menuSolutions = ['it-consultancy-services', 'cloud-native-application-development', 'cloud-cost-management-and-optimization', 'devops-and-automation-consulting', 'data-analytics-and-business-intelligence'].map((s) => bySlug[s]);
export const homeCards = ['it-consultancy-services', 'non-it-consultancy-services', 'software-development-and-integration-services', 'cybersecurity-services', 'it-infrastructure-and-support-services', 'devops-and-automation-consulting'].map((s) => bySlug[s]);
export const offeringCards = [
  { n: '01', slug: 'it-infrastructure-and-support-services', title: 'IT Infrastructure and Support Services', sub: 'Establishing a Strong IT Backbone', text: 'Ensure your business thrives with reliable, secure and well-supported infrastructure.' },
  { n: '02', slug: 'cloud-native-application-development', title: 'Cloud-Native Application Development', sub: 'Harness the Power of the Cloud', text: 'Transform your business with cloud-native applications.' },
  { n: '03', slug: 'cybersecurity-services', title: 'Cyber & Information Security Services', sub: 'Fortifying Your Digital Landscape', text: 'Protect your business from evolving cyber threats.' },
  { n: '04', slug: 'data-analytics-and-business-intelligence', title: 'Data Analytics and Business Intelligence', sub: 'Transforming Data into Insights', text: 'Unlock the power of your data.' },
];

export const solutionsPage = ['cloud-migration-and-management-services', 'data-analytics-and-business-intelligence', 'cloud-native-application-development', 'cloud-cost-management-and-optimization'].map((s) => bySlug[s]);

export const stats = [
  { value: 0, suffix: 'K+', label: 'Project Completed' },
  { value: 0, suffix: '+', label: 'Industry Experience' },
  { value: 0, suffix: 'K+', label: 'Happy Clients' },
  { value: 0, suffix: '+', label: 'Awards Winner' },
];

export const projects = [
  { slug: 'consulting-project-2', title: 'Consulting Project', cat: 'Development / Idea', image: img.project4 },
  { slug: 'consulting-project', title: 'Consulting Project', cat: 'Development / Idea', image: img.project4 },
  { slug: 'product-design-2', title: 'Product Design', cat: 'Product / Idea', image: img.project3 },
  { slug: 'product-design', title: 'Product Design', cat: 'Product / Idea', image: img.project3 },
];

export const testimonials = [
  { title: 'A Game Changer for Our Cloud Operations', text: "CenTech Prime's cloud migration strategy transformed our infrastructure, improving efficiency by 45%. Their hands-on approach and deep expertise in cloud architecture gave us the scalability we needed to grow seamlessly." },
  { title: 'Unmatched Support and Expertise', text: 'From IT consulting to infrastructure support, CenTech Prime has been our go-to partner. Their proactive support and strategic advice have been crucial in streamlining our operations and improving our ROI.' },
  { title: 'Turning Vision into Reality', text: "Our transition to a digital-first approach was made possible by CenTech Prime's innovative software solutions. Their team took our business requirements and built a system that enhanced customer engagement by 60%." },
  { title: 'A Partner in Every Step', text: "CenTech Prime's non-IT consultancy has optimized our logistics operations, cutting costs by 30%. Their collaborative and transparent approach ensured every strategy aligned perfectly with our business goals." },
  { title: 'Securing Our Digital Future', text: "CenTech Prime's cybersecurity solutions have fortified our systems against potential threats. Their in-depth audits and continuous monitoring have kept our operations secure and compliant, giving us peace of mind." },
];

// Post titles, images, URLs and dates are from the live site. The live posts currently contain unrelated
// placeholder text (Italian dining); the bodies below are relevant replacements written for review.
export const posts = [
  { slug: 'the-future-of-cloud-computing-trends-and-innovations-for-2025', title: 'The Future of Cloud Computing: Trends and Innovations for 2025', date: '2024-10-13', image: `${U}/2024/10/2149399281.jpg`,
    excerpt: 'Multi-cloud, sovereign regions, FinOps and AI-ready infrastructure are reshaping how enterprises plan their cloud estate.',
    body: ['Cloud computing has moved from a migration project to a permanent operating model. The question leaders ask has shifted from "should we move?" to "how do we run this well, safely and affordably?"', 'Multi-cloud and hybrid architectures are now the norm. Organisations spread workloads across providers to improve resilience, meet regional data requirements and avoid dependence on a single vendor. The trade-off is operational complexity, which makes consistent tooling, identity and governance essential.', 'Data sovereignty is a second major force. Regulation is pushing sensitive workloads into region-bound environments, so architecture decisions that once looked purely technical now carry legal weight.', 'Cost discipline has matured into a practice known as FinOps: right-sizing, commitment planning and automated reporting turn cloud spend from a surprise into a managed variable.', 'Finally, infrastructure itself is adapting to AI. Accelerated compute, vector data stores and event-driven pipelines are becoming first-class design considerations.'] },
  { slug: 'how-data-analytics-transforms-business-decision-making', title: 'How Data Analytics Transforms Business Decision-Making', date: '2024-10-13', image: `${U}/2024/10/2149369110-1024x683.jpg`,
    excerpt: 'Analytics works only when it is wired into the decisions people actually make.',
    body: ['Most organisations already collect more data than they use. The gap is rarely volume; it is trust, accessibility and relevance to a real decision.', 'Effective analytics starts with the decision, not the dataset. Which choice will this inform, who makes it, and how often? The answer shapes the metrics, refresh rate and interface.', 'A governed data warehouse gives teams one version of the truth. Business intelligence dashboards make it visible, and predictive models move the conversation from what happened to what is likely to happen next.', 'The final step is adoption: embedding insight into weekly routines so that evidence, not instinct alone, drives the call.'] },
  { slug: 'key-cybersecurity-strategies-to-protect-your-business-in-the-digital-age', title: 'Key Cybersecurity Strategies to Protect Your Business in the Digital Age', date: '2024-10-13', image: `${U}/2024/10/204-1024x797.jpg`,
    excerpt: 'A layered, tested approach to security: assess, harden, monitor and rehearse your response.',
    body: ['Threats evolve faster than any single control. Resilient organisations treat security as a layered, continuously tested system rather than a one-off project.', 'Begin with an honest assessment of your assets, exposure and regulatory obligations. Regular vulnerability management and penetration testing reveal weaknesses before attackers do.', 'Adopt zero-trust principles, verifying every user, device and request, and invest in monitoring so anomalies are detected in minutes, not months.', 'Finally, rehearse. An incident response and disaster recovery plan that has never been exercised is a hypothesis, not a plan.'] },
  { slug: 'indulge-in-the-essence-of-italy-with-our-alfresco-dining', title: 'Indulge in the Essence of Italy with Our Alfresco Dining', date: '2024-10-13', image: `${U}/2024/10/image-1728805035-1024x683.jpg`, legacy: true,
    excerpt: 'Discover Our Selection of Italian Wines and Appetizers…', body: ['This post is leftover template content on the live site and is unrelated to CenTech Prime. It is cloned for completeness; consider deleting it.'] },
  { slug: 'savor-the-flavors-of-italy-with-our-outdoor-dining-experience', title: 'Savor the Flavors of Italy with Our Outdoor Dining Experience', date: '2024-10-13', image: `${U}/2024/10/image-1728805010-1-1024x683.jpg`, legacy: true,
    excerpt: 'Indulge in Exquisite Italian Wines and Appetizers…', body: ['This post is leftover template content on the live site and is unrelated to CenTech Prime. It is cloned for completeness; consider deleting it.'] },
  { slug: 'experience-authentic-italian-cuisine-on-our-terrace', title: 'Experience Authentic Italian Cuisine on Our Terrace', date: '2024-10-13', image: `${U}/2024/10/image-1728804985-1024x683.jpg`, legacy: true,
    excerpt: 'The Allure of Italian Wines and Appetizers…', body: ['This post is leftover template content on the live site and is unrelated to CenTech Prime. It is cloned for completeness; consider deleting it.'] },
];

export const sidebar = {
  recent: [
    { title: '15 Secrets Of Digital Transformation', date: '2024-03-25' },
    { title: 'Plan Your Project with Your Software', date: '2024-03-25' },
    { title: 'Tech Conference Events 2023/2024', date: '2024-03-25' },
  ],
  categories: ['Business', 'Consulting', 'Design', 'Development', 'Management', 'Software', 'Uncategorized'],
  tags: ['Business', 'Consulting', 'Course', 'Design', 'Development', 'Education', 'Learning', 'Online', 'Technology'],
};

export const consultOptions = ['IT Consultancy Services', 'Non-IT Consultancy', 'Software Development', 'Cybersecurity', 'IT Infrastructure', 'Cloud Migration and Management Services', 'Data Analytics and Business Intelligence', 'Cloud-Native Application Development', 'Cloud Cost Management and Optimization', 'DevOps and Automation Consulting'];

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
