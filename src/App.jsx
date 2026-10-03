import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white transition-all duration-300">
        
        {/* Top Professional Info Bar */}
        <div className="bg-[#003366] text-white text-xs px-4 md:px-8 py-2.5 hidden md:flex justify-between items-center shadow-inner">
          <div className="flex items-center gap-6">
            <a href="mailto:info@alkhidmat.org" className="hover:text-amber-300 transition duration-200 flex items-center gap-2">
              <span>✉️</span> info@alkhidmat.org
            </a>
            <span className="text-blue-400">|</span>
            <span className="flex items-center gap-2">
              <span>📞</span> <strong className="tracking-wider">0800 44448</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm">
              <a href="https://www.facebook.com/alkhidmat.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition transform hover:scale-110" title="Facebook">f</a>
              <a href="https://twitter.com/AlkhidmatOrg" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition transform hover:scale-110" title="Twitter / X">𝕏</a>
              <a href="https://www.youtube.com/@AlkhidmatFoundationPakistan" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition transform hover:scale-110" title="YouTube">▶</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition transform hover:scale-110" title="LinkedIn">in</a>
            </div>
            <Link to="/donate" className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded transition duration-200 shadow transform hover:-translate-y-0.5">Give Zakat</Link>
            <span className="bg-blue-800/80 text-blue-200 px-2.5 py-1 rounded text-xs font-semibold">International Partners</span>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white text-slate-800 shadow-md px-4 md:px-8 py-3.5 sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md bg-opacity-95">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            
            {/* Alkhidmat Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-[#003366] text-white p-2.5 rounded-xl shadow-md flex items-center justify-center font-black text-sm tracking-widest border border-blue-900 group-hover:bg-blue-900 transition duration-300">
                AL-KHIDMAT
              </div>
              <div>
                <span className="text-[#003366] font-extrabold block text-xs md:text-sm tracking-tight">الخدمت فاؤنڈیشن پاکستان</span>
                <span className="text-slate-500 font-bold block text-[9px] md:text-[10px] tracking-wider uppercase">ALKHIDMAT FOUNDATION PAKISTAN</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-x-7 font-semibold text-sm text-slate-700">
              <Link to="/" className="hover:text-[#003366] transition-colors duration-200 py-1">Home</Link>
              <Link to="/about" className="hover:text-[#003366] transition-colors duration-200 py-1">About Us</Link>
              <Link to="/programs" className="hover:text-[#003366] transition-colors duration-200 py-1">Our Programs</Link>
              <Link to="/ways-to-give" className="hover:text-[#003366] transition-colors duration-200 py-1">Ways to Give</Link>
              <Link to="/volunteer" className="hover:text-[#003366] transition-colors duration-200 py-1">Volunteer</Link>
              <Link to="/contact" className="hover:text-[#003366] transition-colors duration-200 py-1">Contact</Link>
            </div>

            {/* Actions & Donate Now */}
            <div className="hidden lg:flex items-center gap-3">
              {user?.role === 'admin' && (
                <Link to="/admin" className="bg-amber-500 text-slate-950 px-3 py-2 rounded-xl font-bold shadow hover:bg-amber-400 transition transform hover:-translate-y-0.5 duration-200 text-xs">Admin Panel</Link>
              )}
              {user ? (
                <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl transition transform hover:-translate-y-0.5 duration-200 text-xs font-bold shadow">Logout</button>
              ) : (
                <Link to="/login" className="px-3.5 py-2 rounded-xl hover:bg-slate-100 transition font-bold text-xs text-slate-700">
                  Login
                </Link>
              )}
              <Link to="/donate" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-lg font-bold text-xs tracking-wide transition transform hover:-translate-y-1 hover:shadow-xl duration-300 flex items-center gap-1.5">
                Donate Now <span>→</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden text-slate-800 focus:outline-none bg-slate-100 p-2.5 rounded-xl border border-slate-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col space-y-2.5 font-medium text-sm pb-2 animate-fadeIn">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 py-1 px-2 rounded hover:bg-slate-50 transition">Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 py-1 px-2 rounded hover:bg-slate-50 transition">About Us</Link>
              <Link to="/programs" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 py-1 px-2 rounded hover:bg-slate-50 transition">Our Programs</Link>
              <Link to="/ways-to-give" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 py-1 px-2 rounded hover:bg-slate-50 transition">Ways to Give</Link>
              <Link to="/volunteer" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 py-1 px-2 rounded hover:bg-slate-50 transition">Volunteer</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 py-1 px-2 rounded hover:bg-slate-50 transition">Contact</Link>
              {user?.role === 'admin' && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="bg-amber-500 text-slate-950 px-3 py-2 rounded-xl font-bold text-center">Admin Panel</Link>}
              <div className="pt-2 flex flex-col gap-2">
                {user ? (
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="bg-red-600 text-white py-2.5 rounded-xl text-center font-bold shadow">Logout</button>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="bg-slate-100 border border-slate-300 py-2.5 rounded-xl text-center font-bold shadow">Login</Link>
                )}
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)} className="bg-red-600 text-white py-2.5 rounded-xl text-center font-bold shadow">Donate Now</Link>
              </div>
            </div>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<OurPrograms />} />
          <Route path="/ways-to-give" element={<WaysToGive />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/volunteer" element={<VolunteerPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/story/:id" element={<StoryDetailPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 px-4 md:px-8 mt-20 border-t border-slate-900 text-xs md:text-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-black text-base mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Alkhidmat Foundation
              </h4>
              <p className="leading-relaxed text-slate-400">Serving humanity across Pakistan with absolute transparency, disaster relief, orphan care, and clean water initiatives for over 30 years.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                <li><Link to="/programs" className="hover:text-blue-400 transition">Our Programs</Link></li>
                <li><Link to="/ways-to-give" className="hover:text-blue-400 transition">Ways to Give</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Core Causes</h4>
              <ul className="space-y-2">
                <li className="hover:text-white transition cursor-pointer">Orphan Care Program</li>
                <li className="hover:text-white transition cursor-pointer">Clean Water Supply</li>
                <li className="hover:text-white transition cursor-pointer">Disaster Management</li>
                <li className="hover:text-white transition cursor-pointer">Healthcare & Hospitals</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Helpline & Support</h4>
              <p className="text-amber-400 font-bold text-lg mb-1 tracking-wide">0800 44448</p>
              <p className="text-slate-300">Email: info@alkhidmat.org</p>
              <p className="mt-3 text-slate-500">Head Office: Alkhidmat Complex, Khayaban-e-Jinnah, Lahore, Pakistan</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 text-center text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Alkhidmat Foundation Pakistan. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer transition">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer transition">Financial Audits</span>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

function Home() {
  const [emergencies, setEmergencies] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/emergencies')
      .then(res => setEmergencies(res.data))
      .catch(() => setEmergencies([
        { title: 'Flood Relief Camp - Sindh', location: 'District Badin', urgency: 'Critical' },
        { title: 'Clean Water Project', location: 'Thar Desert', urgency: 'High' }
      ]));
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn space-y-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#003366] via-blue-900 to-slate-900 text-white p-6 md:p-16 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden border border-blue-800">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 inline-block shadow-sm">Verified Philanthropy Platform</span>
          <h1 className="text-3xl md:text-5xl font-black mb-5 tracking-tight leading-tight">Serving Humanity <br />with Absolute Integrity</h1>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed opacity-95 mb-8">Experience fully traceable donations, live ground zero emergency tracking, and transparent community support systems across Pakistan.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/donate" className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-7 py-3.5 rounded-xl shadow-xl transition transform hover:-translate-y-1 duration-300 text-sm flex items-center gap-2">Donate Now <span>❤️</span></Link>
            <Link to="/programs" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition transform hover:-translate-y-1 duration-300 text-sm">Explore Programs</Link>
          </div>
        </div>
        <div className="bg-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/15 text-center shadow-2xl w-full md:w-72 transform hover:scale-105 transition duration-300">
          <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">System Trust Index</p>
          <h3 className="text-4xl md:text-5xl font-black text-amber-400 my-2">99.9%</h3>
          <span className="text-xs text-blue-300 font-medium bg-blue-950/50 px-3 py-1 rounded-full border border-blue-800/50 inline-block">Audited Securely</span>
        </div>
      </div>

      {/* Impact Statistics Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-1 transition duration-300">
          <span className="text-3xl">👨‍👩‍👧‍👦</span>
          <h4 className="text-2xl md:text-3xl font-black text-[#003366] mt-2">12,400+</h4>
          <p className="text-xs text-slate-500 font-bold mt-1">Orphans Supported</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-1 transition duration-300">
          <span className="text-3xl">💧</span>
          <h4 className="text-2xl md:text-3xl font-black text-[#003366] mt-2">3,200+</h4>
          <p className="text-xs text-slate-500 font-bold mt-1">Water Plants Installed</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-1 transition duration-300">
          <span className="text-3xl">🏥</span>
          <h4 className="text-2xl md:text-3xl font-black text-[#003366] mt-2">45+</h4>
          <p className="text-xs text-slate-500 font-bold mt-1">Hospitals & Clinics</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-1 transition duration-300">
          <span className="text-3xl">🤝</span>
          <h4 className="text-2xl md:text-3xl font-black text-[#003366] mt-2">50,000+</h4>
          <p className="text-xs text-slate-500 font-bold mt-1">Active Volunteers</p>
        </div>
      </div>

      {/* Live Emergencies Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-black mb-6 text-slate-900 flex items-center gap-2">
          <span>🚨 Live Ground Zero Emergencies</span>
        </h2>
        <div className="grid gap-4">
          {emergencies.map((e, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition transform hover:-translate-x-1 duration-300 border border-slate-200 border-l-4 border-l-red-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-bold text-base md:text-lg text-slate-900">{e.title}</h4>
                <p className="text-xs md:text-sm text-slate-500 mt-1 flex items-center gap-1">📍 Location: <span className="font-semibold text-slate-700">{e.location}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-red-50 text-red-600 border border-red-200 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide shadow-sm">{e.urgency}</span>
                <Link to="/donate" className="bg-[#003366] hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow">Support Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Alkhidmat Platform */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">Trusted Nationwide</span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-3">Transparency & Accountability at Every Step</h3>
          <p className="text-slate-500 text-sm mt-2">Hum har donation ko secure tracking code aur digital reporting ke zariye transparent banate hain.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-3xl mb-3">🔍</div>
            <h4 className="font-bold text-base text-[#003366] mb-2">End-to-End Tracking</h4>
            <p className="text-slate-600 text-xs leading-relaxed">Aapka har ek rupee kahan spend hua, iski digital receipt aur tracking hash code aapko milta hai.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-base text-[#003366] mb-2">Rapid Field Response</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Natural disasters ya emergencies ke waqt hamari volunteer teams sabse pehle ground zero par pahonchti hain.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-bold text-base text-[#003366] mb-2">100% Zakat Policy</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Aapka Zakat fund bina kisi administrative deduction ke seedha mustahiq gharanon tak pohchaya jata hai.</p>
          </div>
        </div>
      </div>

      {/* Stories of Hope & Transformation (Clickable Cards) */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest">Real Impact</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">Stories of Hope & Transformation</h2>
          </div>
          <Link to="/programs" className="text-xs font-bold text-[#003366] hover:underline">View All Programs →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <Link to="/story/ahmad-journey" className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition transform hover:-translate-y-1.5 duration-300 group flex flex-col justify-between">
            <div>
              <div className="bg-blue-900 h-40 flex items-center justify-center text-white text-5xl group-hover:bg-blue-950 transition">🎓</div>
              <div className="p-6">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">Orphan Care</span>
                <h4 className="font-bold text-base text-slate-900 mt-2 mb-2 group-hover:text-blue-700 transition">Ahmad’s Journey to University</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Alkhidmat’s Orphan Care Program supported Ahmad since childhood. Today, he is studying computer science at a top university.</p>
              </div>
            </div>
            <div className="px-6 pb-6 text-xs font-bold text-blue-700 flex items-center gap-1">Read Full Story →</div>
          </Link>

          {/* Card 2 */}
          <Link to="/story/thar-water" className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition transform hover:-translate-y-1.5 duration-300 group flex flex-col justify-between">
            <div>
              <div className="bg-cyan-800 h-40 flex items-center justify-center text-white text-5xl group-hover:bg-cyan-900 transition">💧</div>
              <div className="p-6">
                <span className="bg-cyan-100 text-cyan-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">Clean Water</span>
                <h4 className="font-bold text-base text-slate-900 mt-2 mb-2 group-hover:text-cyan-700 transition">Thar Desert Clean Water Plant</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Installation of a solar-powered filtration plant has brought clean drinking water directly to over 500 families in remote desert villages.</p>
              </div>
            </div>
            <div className="px-6 pb-6 text-xs font-bold text-cyan-700 flex items-center gap-1">Read Full Story →</div>
          </Link>

          {/* Card 3 */}
          <Link to="/story/sindh-flood" className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition transform hover:-translate-y-1.5 duration-300 group flex flex-col justify-between">
            <div>
              <div className="bg-rose-900 h-40 flex items-center justify-center text-white text-5xl group-hover:bg-rose-950 transition">⛺</div>
              <div className="p-6">
                <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">Emergency Relief</span>
                <h4 className="font-bold text-base text-slate-900 mt-2 mb-2 group-hover:text-rose-700 transition">Flood Rehabilitation in Sindh</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Providing weather-proof shelters, ration bags, and medical camps to families affected by seasonal flooding in district Badin.</p>
              </div>
            </div>
            <div className="px-6 pb-6 text-xs font-bold text-rose-700 flex items-center gap-1">Read Full Story →</div>
          </Link>

        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-[#003366] to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-2xl font-black mb-2">Chhota Sa Contribution, Bara Badlaav</h3>
          <p className="text-blue-200 text-sm max-w-xl">Aapka ek secure donation kisi zarooratmand ki zindagi badal sakta hai. Aaj hi apna hissa dalein.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/donate" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition">Donate Now</Link>
          <Link to="/volunteer" className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3 rounded-xl font-bold text-sm transition">Join as Volunteer</Link>
        </div>
      </div>
    </div>
  );
}

// Story Detail Page Component
function StoryDetailPage() {
  const { id } = useParams();

  const storyData = {
    'ahmad-journey': {
      title: "Ahmad’s Journey to University",
      category: "Orphan Care Program",
      icon: "🎓",
      badgeColor: "bg-amber-100 text-amber-800",
      date: "September 15, 2026",
      location: "Lahore, Punjab",
      content: `Ahmad lost his father at a very tender age of seven. Growing up in a modest household with three younger siblings, higher education seemed like an impossible dream. Financial constraints meant that schooling was a constant struggle.

      In 2015, Ahmad was enrolled in Alkhidmat Foundation’s Aghosh / Orphan Care Program. Through this comprehensive sponsorship, Alkhidmat took care of his tuition fees, school books, uniform, and regular health checkups. Beyond financial assistance, mentoring sessions provided him with emotional and academic guidance.

      With consistent support and his own relentless hard work, Ahmad scored top grades in his intermediate exams. Today, he has secured admission into a prestigious university studying Computer Science. "Alkhidmat ne na sirf meri taleem ka khayal rakha, balkay mujhe aik behtareen mustaqbil diya," Ahmad shares with a grateful smile. Your donations make stories like Ahmad's possible every day.`
    },
    'thar-water': {
      title: "Thar Desert Clean Water Plant Initiative",
      category: "Clean Water Program",
      icon: "💧",
      badgeColor: "bg-cyan-100 text-cyan-800",
      date: "August 22, 2026",
      location: "Thar Desert, Sindh",
      content: `For generations, women and children in the remote villages of Thar had to walk miles every day under the scorching sun just to fetch brackish, contaminated water from deep wells. Water-borne illnesses were rampant, affecting the health and livelihood of entire communities.

      Alkhidmat Foundation identified these critical clusters and initiated the Solar-Powered Clean Water Filtration Plant project. Utilizing sustainable solar energy, these plants pump underground water, filter it thoroughly, and make it fit for human consumption right in the heart of the village.

      Over 500 local families now have immediate access to clean, safe drinking water steps away from their homes. Child mortality due to water-borne diseases has dropped significantly, and local women now save hours daily, which they utilize for household productivity and children's education.`
    },
    'sindh-flood': {
      title: "Flood Rehabilitation & Relief in Sindh",
      category: "Emergency Disaster Management",
      icon: "⛺",
      badgeColor: "bg-rose-100 text-rose-800",
      date: "September 02, 2026",
      location: "District Badin, Sindh",
      content: `When sudden torrential monsoon rains and flash floods submerged vast areas of District Badin, thousands of families were displaced overnight, losing their homes, livestock, and stored food supplies.

      Within hours of the calamity, Alkhidmat’s Rapid Response volunteer units reached ground zero with rescue boats, emergency food packs, mineral water, and life-saving medicines. Mobile health clinics were established immediately to treat water-borne infections and injuries.

      In the rehabilitation phase, weather-proof tents and essential ration bags were distributed to help families regain stability. Thanks to our donors and tireless field workers, communities are now rebuilding their lives with dignity and renewed hope.`
    }
  };

  const story = storyData[id] || {
    title: "Story Not Found",
    category: "General",
    icon: "❓",
    badgeColor: "bg-slate-100 text-slate-800",
    date: "N/A",
    location: "Pakistan",
    content: "The requested story could not be found. Please go back to the homepage."
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto animate-fadeIn">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#003366] mb-6 hover:underline">
        <span>←</span> Back to Home
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-br from-[#003366] to-blue-900 p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="text-6xl bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
            {story.icon}
          </div>
          <div>
            <span className={`${story.badgeColor} text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3`}>
              {story.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black leading-tight mb-2">{story.title}</h1>
            <div className="flex items-center gap-4 text-xs text-blue-200 mt-2 font-medium">
              <span>📅 {story.date}</span>
              <span>📍 {story.location}</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold text-[#003366] text-base mb-1">Want to support more lives like this?</h4>
              <p className="text-xs text-slate-600">Your contribution goes directly into funding these essential programs.</p>
            </div>
            <Link to="/donate" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition whitespace-nowrap">
              Support This Cause Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-r from-[#003366] to-blue-900 text-white p-8 md:p-14 rounded-3xl mb-12 shadow-xl">
        <span className="bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow">Who We Are</span>
        <h1 className="text-3xl md:text-5xl font-black mt-4 mb-4 leading-tight">Dedicated to Public Service Since Decades</h1>
        <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-3xl opacity-95">Alkhidmat Foundation Pakistan is one of the leading, non-profit, independent volunteer-based organizations fully committed to humanitarian services across the country. Operating nationwide with absolute transparency and devotion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transform hover:scale-[1.01] transition duration-300">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-4 font-bold">🎯</div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">To serve humanity without any discrimination of caste, creed, or color, focusing on education, health, clean water, orphan care, and disaster management through dedicated community action.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transform hover:scale-[1.01] transition duration-300">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-4 font-bold">👁️</div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed">A prosperous, self-reliant, and healthy society where every needy person receives timely assistance and dignified support through a robust network of volunteers and donors.</p>
        </div>
      </div>
    </div>
  );
}

function OurPrograms() {
  const programs = [
    { title: 'Orphan Care Program', count: '12,400+ Children Supported', desc: 'Comprehensive sponsorship covering education, health, boarding, and family support for orphans across Pakistan, ensuring they grow up with equal opportunities.' },
    { title: 'Clean Water Projects', count: 'Water Wells & Filtration Plants', desc: 'Installing solar-powered water filtration plants and deep wells in desert and drought-hit regions like Thar, providing life-saving clean drinking water to millions.' },
    { title: 'Healthcare Services', count: 'Hospitals & Mobile Dispensaries', desc: 'Providing free medical camps, mother & child health centers, and emergency ambulance fleets operating round-the-clock nationwide.' },
    { title: 'Disaster Management', count: 'Rapid Response Units', desc: 'First responders during earthquakes, floods, and natural calamities equipped with emergency ration packs, weather-proof tents, and immediate medical supplies.' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-br from-[#003366] to-blue-950 text-white p-8 md:p-14 rounded-3xl mb-12 shadow-xl">
        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">Our Work</span>
        <h1 className="text-3xl md:text-5xl font-black mt-4 mb-4">Programs that change lives every day</h1>
        <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-2xl">Each programme is run by trained field teams, monitored locally and reported transparently to ensure maximum social impact.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {programs.map((p, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transform hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">{p.count}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{p.desc}</p>
            </div>
            <Link to="/donate" className="inline-block bg-[#003366] hover:bg-blue-900 text-white text-center py-2.5 rounded-xl text-xs font-bold transition shadow">Support This Cause</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaysToGive() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-r from-[#003366] to-blue-900 text-white p-8 md:p-14 rounded-3xl mb-12 shadow-xl text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-3">Ways You Can Contribute</h1>
        <p className="text-blue-100 text-sm max-w-xl mx-auto leading-relaxed">Your support transforms lives. Choose your preferred secure method to donate and empower communities across Pakistan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
          <div>
            <div className="text-5xl mb-4">💳</div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Online Gateway</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">Secure credit/debit card and direct bank transfers instantly processed with end-to-end tracking code.</p>
          </div>
          <Link to="/donate" className="w-full bg-[#003366] hover:bg-blue-900 text-white py-3 rounded-xl text-xs font-bold transition shadow">Donate Online</Link>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
          <div>
            <div className="text-5xl mb-4">📱</div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Mobile Wallets</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">Easypaisa, JazzCash, and direct mobile account peer contributions with instant automated invoice generation.</p>
          </div>
          <Link to="/donate" className="w-full bg-[#003366] hover:bg-blue-900 text-white py-3 rounded-xl text-xs font-bold transition shadow">View Details</Link>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center transform hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
          <div>
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Zakat & Sadaqah</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">100% Zakat policy strictly applied directly to eligible deserving families, widows, and orphans.</p>
          </div>
          <Link to="/donate" className="w-full bg-[#003366] hover:bg-blue-900 text-white py-3 rounded-xl text-xs font-bold transition shadow">Give Zakat</Link>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-200">
          <h2 className="text-2xl font-black mb-2 text-slate-900">Get in Touch</h2>
          <p className="text-slate-500 text-xs mb-6 leading-relaxed">Have questions or need assistance regarding donations or volunteering? Reach out to our central team.</p>
          
          {sent ? (
            <div className="bg-blue-50 text-blue-900 p-6 rounded-2xl text-center font-bold text-sm border border-blue-200">Thank you! Your message has been sent successfully. Our support team will contact you soon.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Your Name</label>
                <input type="text" placeholder="Full Name" className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                <input type="email" placeholder="name@example.com" className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Message</label>
                <textarea placeholder="Type your message here..." rows="4" className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition" required></textarea>
              </div>
              <button type="submit" className="w-full bg-[#003366] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition shadow-md">Send Message</button>
            </form>
          )}
        </div>

        <div className="bg-[#003366] text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col justify-between">
          <div>
            <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">Head Office</span>
            <h3 className="text-2xl font-black mt-4 mb-6">Alkhidmat Complex Pakistan</h3>
            <div className="space-y-4 text-sm text-blue-100">
              <p className="flex items-start gap-3"><span>📍</span> <span>Khayaban-e-Jinnah, Johar Town, Lahore, Pakistan</span></p>
              <p className="flex items-center gap-3"><span>📞</span> <span>Helpline: 0800 44448</span></p>
              <p className="flex items-center gap-3"><span>✉️</span> <span>Email: info@alkhidmat.org</span></p>
              <p className="flex items-center gap-3"><span>⏰</span> <span>Working Hours: Mon - Sat (9:00 AM - 6:00 PM)</span></p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-800 text-xs text-blue-200">
            Registered under Societies Registration Act XXI of 1860, Pakistan.
          </div>
        </div>
      </div>
    </div>
  );
}

function DonatePage() {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    amount: '',
    category: 'Orphan Sponsorship',
    paymentMethod: 'Bank Transfer'
  });
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/donations', formData);
      setInvoiceData(res.data.donation);
      setFormData({
        donorName: '',
        email: '',
        amount: '',
        category: 'Orphan Sponsorship',
        paymentMethod: 'Bank Transfer'
      });
    } catch { 
      setError('Transaction Failed. Please check inputs.'); 
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 md:my-12 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200 relative animate-fadeIn">
      <h2 className="text-xl md:text-2xl font-black mb-6 text-center text-slate-900 tracking-tight">Secure Guest Fund Gateway</h2>
      {error && <div className="bg-red-50 text-red-600 border border-red-200 p-3.5 rounded-xl mb-4 text-center font-bold text-sm shadow-sm">{error}</div>}
      
      <form onSubmit={handleDonate} className="space-y-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Full Name (Optional)</label>
          <input type="text" name="donorName" placeholder="Anonymous / Your Name" value={formData.donorName} onChange={handleChange} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition" />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Email Address (Optional)</label>
          <input type="email" name="email" placeholder="guest@example.com" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition" />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Select Cause</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition">
            <option>Orphan Sponsorship</option>
            <option>Clean Water Wells</option>
            <option>Emergency Flood Relief</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Amount (PKR)</label>
          <input type="number" name="amount" placeholder="e.g. 5000" value={formData.amount} onChange={handleChange} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition" required />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition">
            <option>Bank Transfer</option>
            <option>Easypaisa / JazzCash</option>
            <option>Cash</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-[#003366] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition shadow-xl tracking-wide text-sm transform hover:-translate-y-0.5">Confirm Contribution</button>
      </form>

      {invoiceData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-t-4 border-[#003366]">
            <div className="text-center mb-4">
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">Donation Successful!</h3>
              <p className="text-xs text-gray-500">Thank you for supporting Al-Khidmat Foundation.</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl space-y-2 text-sm text-gray-700 mb-6 border border-blue-100">
              <div className="flex justify-between">
                <span className="font-semibold">Tracking Hash:</span>
                <span className="text-blue-900 font-mono font-bold">{invoiceData.trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Donor Name:</span>
                <span>{invoiceData.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Category:</span>
                <span>{invoiceData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Payment via:</span>
                <span>{invoiceData.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2 font-bold text-blue-950 text-base">
                <span>Amount Donated:</span>
                <span>PKR {invoiceData.amount}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button onClick={() => window.print()} className="flex-1 bg-slate-800 text-white py-2.5 rounded-xl hover:bg-slate-900 transition text-xs font-bold shadow-md">
                Print Invoice
              </button>
              <button onClick={() => setInvoiceData(null)} className="flex-1 bg-[#003366] text-white py-2.5 rounded-xl hover:bg-blue-900 transition text-xs font-bold shadow-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VolunteerPortal() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('Critical');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/emergencies', { title, location, urgency }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Emergency Broadcast Published!');
      setTitle(''); setLocation('');
    } catch { alert('Unauthorized action'); }
  };

  return (
    <div className="max-w-md mx-auto my-10 md:my-16 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200 animate-fadeIn">
      <h2 className="text-xl md:text-2xl font-black mb-6 text-center text-slate-900 tracking-tight">Field Volunteer Portal</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Issue Title</label>
          <input type="text" placeholder="e.g. Food shortage in camp" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-medium text-sm transition" required />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Location</label>
          <input type="text" placeholder="City or Region" value={location} onChange={e => setLocation(e.target.value)} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-medium text-sm transition" required />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Urgency Level</label>
          <select value={urgency} onChange={e => setUrgency(e.target.value)} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-medium text-sm transition">
            <option>Critical</option>
            <option>High</option>
            <option>Moderate</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition shadow-xl tracking-wide text-sm transform hover:-translate-y-0.5">Broadcast SOS</button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data)).catch(() => setStats({ totalFunds: 1250000, donationCount: 340, emergencyCount: 5 }));
  }, []);

  if (!stats) return <div className="text-center mt-20 font-bold text-lg text-slate-600">Loading Secure Telemetry...</div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 tracking-tight">Admin Management Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 md:p-7 rounded-3xl shadow-lg border border-slate-200 border-t-4 border-t-[#003366] transform hover:-translate-y-1 transition duration-300">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Funds Raised</p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">PKR {stats.totalFunds.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 md:p-7 rounded-3xl shadow-lg border border-slate-200 border-t-4 border-t-blue-600 transform hover:-translate-y-1 transition duration-300">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Transactions</p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{stats.donationCount}</h3>
        </div>
        <div className="bg-white p-6 md:p-7 rounded-3xl shadow-lg border border-slate-200 border-t-4 border-t-red-600 transform hover:-translate-y-1 transition duration-300">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Active Emergencies</p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{stats.emergencyCount}</h3>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      window.location.href = res.data.user.role === 'admin' ? '/admin' : '/';
    } catch { 
      setError('Invalid email or password. Please try again.'); 
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 md:my-20 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200 animate-fadeIn">
      <h2 className="text-xl md:text-2xl font-black mb-6 text-center text-slate-900 tracking-tight">System Portal Login</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 p-3.5 rounded-xl mb-4 text-center font-bold text-xs shadow-sm flex items-center justify-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
          <input type="email" placeholder="admin@alkhidmat.org" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition" required />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm transition" required />
        </div>
        <button type="submit" className="w-full bg-[#003366] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition shadow-xl tracking-wide text-sm transform hover:-translate-y-0.5">Sign In</button>
      </form>
    </div>
  );
}