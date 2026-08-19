import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nsfi.org.in";
const DEFAULT_TITLE =
  "National Skill Forge Institute | Industry-Ready Skills & Training";
const DEFAULT_DESCRIPTION =
  "Build industry-ready skills with NSFI programs, expert mentors, practical projects, certifications and career-focused guidance.";

const publicPages: Record<string, { title: string; description: string }> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: "About NSFI | National Skill Forge Institute",
    description:
      "Learn how NSFI connects education and industry through practical training, recognized certifications and career-focused learning.",
  },
  "/programs": {
    title: "Training Programs | National Skill Forge Institute",
    description:
      "Explore NSFI technical, professional, creative and career-development programs designed for students, colleges and organizations.",
  },
  "/students": {
    title: "Career-Focused Programs for Students | NSFI",
    description:
      "Develop practical skills, complete industry-focused projects and prepare for career opportunities with NSFI student programs.",
  },
  "/colleges": {
    title: "Training and Placement Solutions for Colleges | NSFI",
    description:
      "Partner with NSFI for workshops, certifications, internships, faculty development and placement-focused college training.",
  },
  "/organizations": {
    title: "Corporate Training Solutions for Organizations | NSFI",
    description:
      "Build workforce capability with customized technical, professional and leadership training solutions from NSFI.",
  },
  "/learn": {
    title: "Free Learning Resources | NSFI",
    description:
      "Access free NSFI learning resources across technology, engineering, professional skills, business and creative tools.",
  },
  "/faqs": {
    title: "Frequently Asked Questions | NSFI",
    description:
      "Find answers about NSFI programs, certifications, enrollment, college partnerships, organizational training and career support.",
  },
  "/contact": {
    title: "Contact NSFI | Training and Partnership Enquiries",
    description:
      "Contact National Skill Forge Institute for program enrollment, college partnerships, corporate training and learning guidance.",
  },
};

const privateRoutes = new Set(["/admin", "/login", "/signup", "/profile"]);

const setMeta = (selector: string, attribute: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    const [name, property] = selector.includes("property=")
      ? [null, selector.match(/property="([^"]+)"/)?.[1]]
      : [selector.match(/name="([^"]+)"/)?.[1], null];

    if (name) element.setAttribute("name", name);
    if (property) element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = publicPages[pathname];
    const isPrivate = privateRoutes.has(pathname);
    const title = page?.title ?? DEFAULT_TITLE;
    const description = page?.description ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta(
      'meta[name="robots"]',
      "content",
      isPrivate || !page ? "noindex, nofollow" : "index, follow",
    );
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", "NSFI");
    setMeta('meta[name="twitter:card"]', "content", "summary");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname]);

  return null;
};

export default SeoManager;
