"use client";
import WarpShaderHero from "@/components/ui/wrap-shader";

export default function ScpesPage() {
  return (
    <div className="container mx-auto p-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4">
        SCPES – Society of Computer Engineering Students
      </h1>

      {/* Meet our officers – animated hero */}
      <section className="mb-5">
        <h2 id="officers" className="text-xl font-semibold mt-8 mb-4">
          Meet our officers
        </h2>
        <div className="relative w-full h-[600px] mb-8">
          <WarpShaderHero />
        </div>
      </section>

      {/* Divider */}
      <div className="circuit-divider my-5" aria-hidden="true"></div>

      {/* SCPES at a glance */}
      <section className="mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <span className="eyebrow"><i className="bi bi-people"></i> Who we are</span>
            <h2>SCPES at a glance</h2>
            <p className="lead-muted">
              The Society of Computer Engineering Students (SCPES) is the official student organization representing BS Computer Engineering majors at the University of the East. We bridge students, faculty, and industry — building community, skills, and opportunities.
            </p>
            <div className="row g-3 mt-3">
              <div className="col-sm-6">
                <div className="stat-card p-3 text-center">
                  <div className="stat-num">1990s</div>
                  <div className="small">Founded (est.)</div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-card p-3 text-center">
                  <div className="stat-num">500+</div>
                  <div className="small">Active members</div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-card p-3 text-center">
                  <div className="stat-num">20+</div>
                  <div className="small">Events per year</div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-card p-3 text-center">
                  <div className="stat-num">15+</div>
                  <div className="small">Industry partners</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card cpe-card h-100">
              <div className="card-body">
                <h5><i className="bi bi-bullseye me-1"></i> Our objectives</h5>
                <ul className="list-group list-group-flush mt-3">
                  <li className="list-group-item bg-transparent px-0"><i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Academic excellence</strong> — peer tutoring, review sessions, and study groups for core CpE courses.</li>
                  <li className="list-group-item bg-transparent px-0"><i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Technical skill-building</strong> — workshops, hackathons, and certification prep beyond the curriculum.</li>
                  <li className="list-group-item bg-transparent px-0"><i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Industry readiness</strong> — tech talks, company visits, resume clinics, and internship matching.</li>
                  <li className="list-group-item bg-transparent px-0"><i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Community &amp; welfare</strong> — social events, mental health awareness, and student advocacy.</li>
                  <li className="list-group-item bg-transparent px-0"><i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Leadership development</strong> — officer training, project management, and public speaking opportunities.</li>
                  <li className="list-group-item bg-transparent px-0"><i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Alumni engagement</strong> — mentorship programs, career panels, and networking events.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="circuit-divider my-5" aria-hidden="true"></div>

      {/* Activities */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <span className="eyebrow"><i className="bi bi-calendar-event"></i> Activities</span>
            <h2>What we do — a typical year</h2>
          </div>
        </div>
        <div className="accordion accordion-flush mt-3" id="activitiesAcc">
          {/* Activity items – copy as needed */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#act1">
                <i className="bi bi-lightning me-1"></i> CpE Week (Annual)
              </button>
            </h2>
            <div id="act1" className="accordion-collapse collapse" data-bs-parent="#activitiesAcc">
              <div className="accordion-body">
                <p className="small mb-1">Week-long celebration with technical competitions, exhibit of student projects, alumni homecoming, and the CpE Night social.</p>
                <span className="badge badge-tech">February</span> <span className="badge badge-tech">Competition</span> <span className="badge badge-tech">Showcase</span>
              </div>
            </div>
          </div>
          {/* Additional activities omitted for brevity */}
        </div>
      </section>

      {/* Divider */}
      <div className="circuit-divider my-5" aria-hidden="true"></div>

      {/* Join SCPES */}
      <section className="mb-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <span className="eyebrow"><i className="bi bi-person-plus"></i> Get involved</span>
            <h2>Join SCPES</h2>
            <p className="lead-muted">Open to all BS Computer Engineering students at UE. No interview, no fee — just show up and contribute.</p>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <div className="p-3 border rounded-3 h-100">
                  <strong><i className="bi bi-check-circle me-1"></i> Attend a General Assembly</strong>
                  <p className="small text-muted mb-0">Held monthly. Announced on FB, LMS, and department boards.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded-3 h-100">
                  <strong><i className="bi bi-check-circle me-1"></i> Sign up for a committee</strong>
                  <p className="small text-muted mb-0">Tech, Events, Externals, Finance, Membership, Welfare, or create your own.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded-3 h-100">
                  <strong><i className="bi bi-check-circle me-1"></i> Volunteer at an event</strong>
                  <p className="small text-muted mb-0">Logistics, registration, documentation, livestream — every role counts.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded-3 h-100">
                  <strong><i className="bi bi-check-circle me-1"></i> Run for office</strong>
                  <p className="small text-muted mb-0">Elections every academic year. Campaign period, debates, student voting.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card cpe-card h-100">
              <div className="card-body">
                <h5><i className="bi bi-chat-dots me-1"></i> Stay connected</h5>
                <p className="small text-muted mb-3">Official SCPES channels:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item bg-transparent px-0">
                    <a href="https://www.facebook.com/uescpes/" target="_blank" rel="noopener" className="text-decoration-none d-flex align-items-center">
                      <i className="bi bi-facebook text-primary me-2 fs-5"></i>
                      <div><strong>Facebook Page</strong> — announcements, event pages, photos<br/><small className="text-muted">facebook.com/uescpes</small></div>
                    </a>
                  </li>
                  <li className="list-group-item bg-transparent px-0">
                    <a href="https://www.instagram.com/uescpes_official" target="_blank" rel="noopener" className="text-decoration-none d-flex align-items-center">
                      <i className="bi bi-instagram text-danger me-2 fs-5"></i>
                      <div><strong>Instagram</strong> — stories, reels, officer takeovers<br/><small className="text-muted">@uescpes_official</small></div>
                    </a>
                  </li>
                  <li className="list-group-item bg-transparent px-0">
                    <a href="mailto:scpesofficial@gmail.com" className="text-decoration-none d-flex align-items-center">
                      <i className="bi bi-envelope text-success me-2 fs-5"></i>
                      <div><strong>Email</strong> — formal inquiries, partnership proposals<br/><small className="text-muted">scpesofficial@gmail.com</small></div>
                    </a>
                  </li>
                </ul>
                <a href="contact.html" className="btn btn-ue">Message us directly</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action buttons */}
      <div className="d-flex gap-2 mt-4 justify-content-center">
        <a href="projects.html" className="btn btn-ue">See SCPES-backed projects <i className="bi bi-arrow-right"></i></a>
        <a href="faculty.html" className="btn btn-outline-secondary">Meet faculty advisers</a>
      </div>
    </div>
  );
}
