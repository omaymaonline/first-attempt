type EmailLayoutProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  footerNote: string;
};

export function emailLayout({
  title,
  description,
  buttonText,
  buttonUrl,
  footerNote,
}: EmailLayoutProps) {
  return `
    <div style="
      font-family: Inter, sans-serif;
      max-width:480px;
      margin:auto;
      padding:24px;
      border:1px solid #eee;
      border-radius:8px;
      background:#fff;
    ">

      <div style="text-align:center;margin-bottom:24px;">
        <img
          src="${process.env.WEBSITE_URL}/logo.svg"
          alt="Omayma Online"
          width="64"
          height="64"
          style="object-fit:contain;"
        />
      </div>

      <h2 style="text-align:center;color:#333;margin-bottom:16px;">
        ${title}
      </h2>

      <p style="
        color:#555;
        line-height:1.6;
        text-align:center;
        margin-bottom:24px;
      ">
        ${description}
      </p>

      <div style="text-align:center;margin-bottom:24px;">
        <a
          href="${buttonUrl}"
          style="
            display:inline-block;
            padding:12px 24px;
            background:#f472b6;
            color:#fff;
            text-decoration:none;
            border-radius:9999px;
            font-weight:bold;
          "
        >
          ${buttonText}
        </a>
      </div>

      <p style="
        color:#999;
        font-size:12px;
        text-align:center;
        line-height:1.4;
        margin-bottom:48px;
      ">
        ${footerNote}
      </p>

      <div style="
        margin-top:64px;
        padding-top:16px;
        border-top:1px solid #eee;
        text-align:center;
        font-size:11px;
        color:#aaa;
        line-height:1.4;
      ">
        Omayma Online · Annaba, Algeria
        <br/>
        <a
          href="mailto:omayma.online@gmail.com"
          style="color:#aaa;text-decoration:underline;"
        >
          omayma.online@gmail.com
        </a>
        <br/>
        This is an automated message, please do not reply.
      </div>

    </div>
    `;
}