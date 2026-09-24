'use client';
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string>("light");

  // Load persisted theme on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cpe-theme");
      if (saved) setTheme(saved);
    } catch {}
  }, []);

  // Apply theme to <html> and persist changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("cpe-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <title>BS Computer Engineering – UE</title>
        {/* Bootstrap CSS – kept for existing markup */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground">
        {/* Navbar – simple placeholder, can be replaced with shadcn components later */}
        <nav className="navbar navbar-expand-lg sticky-top bg-dark navbar-dark py-1">
          <div className="container">
            <a className="navbar-brand" href="/">
              UE Computer Engineering
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav ms-auto align-items-lg-center">
                <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/scpes">SCPES</a></li>
                {/* Add more nav links as needed */}
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
                    {theme === "dark" ? "☀ Light" : "🌙 Dark"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Footer – simple placeholder */}
        <footer className="site-footer py-5 text-center bg-gray-800 text-gray-200">
          <div className="container">
            <p>© {new Date().getFullYear()} CpE Information Portal – Built with Next.js, React, Tailwind, and shadcn/ui.</p>
          </div>
        </footer>

        {/* Bootstrap JS bundle – needed for dropdowns, collapses, etc. */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
