import founderSignature from "../assets/founder-signature.png";
import nsfiLogo from "../assets/nsfi-logo.png";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const assetToDataUrl = async (assetUrl: string) => {
  const response = await fetch(assetUrl);
  if (!response.ok) throw new Error("Unable to load certificate artwork.");

  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Unable to prepare certificate artwork."));
    reader.readAsDataURL(blob);
  });
};

export const getCertificateReference = (enrollmentId: number, createdAt: string) => {
  const parsedDate = new Date(createdAt);
  const year = Number.isNaN(parsedDate.getTime())
    ? new Date().getFullYear()
    : parsedDate.getFullYear();
  const recordCode = Math.abs(Math.trunc(enrollmentId)).toString(36).toUpperCase();

  return `NSFI-${year}-${recordCode}`;
};

export const downloadCertificate = async (
  studentName: string,
  programName: string,
  enrollmentId: number,
  enrollmentCreatedAt: string,
) => {
  const name = studentName.trim().replace(/\s+/g, " ") || "Learner";
  const program = programName.trim().replace(/\s+/g, " ") || "NSFI Program";
  const referenceNumber = getCertificateReference(enrollmentId, enrollmentCreatedAt);
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [logoDataUrl, signatureDataUrl] = await Promise.all([
    assetToDataUrl(nsfiLogo),
    assetToDataUrl(founderSignature),
  ]);

  const certificate = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fffdf8"/>
          <stop offset="1" stop-color="#f7f5ff"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="900" fill="url(#paper)"/>
      <path d="M0 0h360L0 360z" fill="#0b1f55"/>
      <path d="M0 0h300L0 300z" fill="#241a8b" opacity=".9"/>
      <path d="M0 0h235L0 235z" fill="#d5ad3f" opacity=".95"/>
      <path d="M1400 900h-360l360-360z" fill="#0b1f55"/>
      <path d="M1400 900h-290l290-290z" fill="#241a8b" opacity=".9"/>
      <path d="M1400 900h-220l220-220z" fill="#d5ad3f" opacity=".95"/>
      <rect x="38" y="38" width="1324" height="824" fill="none" stroke="#d5ad3f" stroke-width="3"/>
      <rect x="55" y="55" width="1290" height="790" fill="none" stroke="#241a8b" stroke-width="1" opacity=".45"/>

      <image href="${escapeXml(logoDataUrl)}" x="1150" y="68" width="135" height="135" preserveAspectRatio="xMidYMid meet"/>
      <text x="1285" y="224" text-anchor="end" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="1" fill="#526078">REFERENCE NUMBER</text>
      <text x="1285" y="250" text-anchor="end" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#0b2a68">${escapeXml(referenceNumber)}</text>
      <text x="700" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="5" fill="#0b2a68">CERTIFICATE</text>
      <rect x="435" y="215" width="530" height="70" rx="35" fill="#0b2a68"/>
      <text x="700" y="264" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" letter-spacing="8" fill="#fff">OF COMPLETION</text>
      <text x="700" y="355" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#3f4657">This certificate is proudly presented to</text>
      <text x="700" y="455" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#241a8b">${escapeXml(name)}</text>
      <line x1="335" y1="480" x2="1065" y2="480" stroke="#d5ad3f" stroke-width="3"/>
      <text x="700" y="545" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" fill="#3f4657">for successfully completing</text>
      <text x="700" y="595" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#0b2a68">${escapeXml(program)}</text>

      <text x="330" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#28324a">DATE OF ISSUE</text>
      <text x="330" y="745" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#28324a">${escapeXml(issueDate)}</text>
      <line x1="190" y1="765" x2="470" y2="765" stroke="#28324a" stroke-width="2"/>

      <text x="1060" y="675" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#28324a">FOUNDER</text>
      <image href="${escapeXml(signatureDataUrl)}" x="955" y="685" width="210" height="105" preserveAspectRatio="xMidYMid meet"/>
      <line x1="915" y1="792" x2="1205" y2="792" stroke="#28324a" stroke-width="2"/>
      <text x="1060" y="830" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#0b2a68">Puneet Singh</text>
    </svg>`;

  const blob = new Blob([certificate], { type: "image/svg+xml;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = name.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-");
  link.href = downloadUrl;
  link.download = `NSFI-Certificate-${safeName || "Learner"}-${referenceNumber}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
};
