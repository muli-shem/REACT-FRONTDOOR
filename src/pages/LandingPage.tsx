import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Lightbulb, 
  DollarSign, 
  BookOpen, 
  Target,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const pillars: {
    icon: React.FC<any>;
    title: string;
    description: string;
    books?: string[];
    features?: string[];
  }[] = [
    {
      icon: BookOpen,
      title: 'Personal Growth & Mindset',
      description: 'Cultivating millionaire-thinking through books, mentorship, and leadership training.',
      books: ['Secrets of a Millionaire Mind', 'The Richest Man in Babylon', 'The Quantum Leap Strategy']
    },
    {
      icon: TrendingUp,
      title: 'Entrepreneurship & Innovation',
      description: 'Build businesses, create solutions, write proposals, and pitch to investors.',
      features: ['Business Building', 'Solution Creation', 'Investor Pitching']
    },
    {
      icon: DollarSign,
      title: 'Financial Empowerment',
      description: 'Structured Money Market Fund (MMF) system with clear policies and transparency.',
      features: ['Joint Account', 'Monthly Top-ups', 'Quarterly Audits']
    },
    {
      icon: Lightbulb,
      title: 'Blessed Mind Sessions',
      description: 'Think-tank environment for brainstorming problems and developing real-world solutions.',
      features: ['Idea Generation', 'Proposal Development', 'Collaboration']
    }
  ];

  const values: string[] = [
    'Integrity', 'Accountability', 'Stewardship', 'Innovation',
    'Excellence', 'Teamwork', 'Honesty', 'Commitment'
  ];

  const benefits: string[] = [
    'Financial literacy training',
    'Leadership mentorship',
    'Proposal writing training',
    'Access to funded projects',
    'Startup collaboration',
    'Supportive community'
  ];

  const stats: { number: string; label: string; subtext: string }[] = [
    { number: '83B', label: 'KES lost yearly to betting', subtext: 'among Kenyan youth' },
    { number: '76%', label: 'Of youths without savings plan', subtext: 'lack financial discipline' },
    { number: '17%', label: 'Under 30 invest long-term', subtext: 'G-NET changes this' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">G-NET</h1>
            <p className="text-xs text-gray-600">Generational Entreprenuers Network</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/join"
              className="bg-secondary hover:bg-secondary-dark text-primary px-6 py-2 rounded-lg font-semibold transition"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Transformational Network</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Empowering Minds,<br />
              <span className="text-secondary">Transforming Generations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              A transformational network of young entrepreneurs, innovators, and vision-driven 
              leaders committed to personal growth, financial excellence, and generational impact.
            </p>

            {/* FIXED BLOCK — the ONLY error-prone part */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/join"
                className="bg-secondary hover:bg-secondary-dark text-primary px-8 py-4 rounded-lg font-bold text-lg transition inline-flex items-center gap-2 shadow-lg"
              >
                Join the Movement
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#about"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition border border-white/20"
              >
                Explore Our Impact
              </a>
            </div>
            {/* END FIX */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Who We Are</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              G-NET (Generational Network of Entrepreneurial Thinkers) is a faith-aligned, 
              values-driven community empowering young people to think boldly, build confidently, 
              and create meaningful generational impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower and unite young entrepreneurs, nurture talents and creative skills 
                across Kenya, Africa, and beyond through mentorship, funding, and faith-driven 
                collaboration—transforming ideas into thriving businesses and impactful media 
                while upholding integrity and innovation.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We exist to build a supportive ecosystem of young business leaders by providing:
              </p>
              <ul className="space-y-2">
                {['Strategic investments', 'High-level mentorship', 'Entrepreneurial education', 
                  'Access to funding', 'Networking opportunities', 'Faith-based inspiration'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Core Values</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-12"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <p className="font-bold text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Pillars</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">
              Four foundational pillars guiding our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{pillar.title}</h3>
                  <p className="text-gray-700 mb-4">{pillar.description}</p>
                  
                  {pillar.books && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-600">Books we study:</p>
                      {pillar.books.map((book, bookIdx) => (
                        <p key={bookIdx} className="text-sm text-gray-600 pl-4 border-l-2 border-secondary">
                          {book}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {pillar.features && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {pillar.features.map((feature, featureIdx) => (
                        <span
                          key={featureIdx}
                          className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Problem We're Solving</h2>
            <p className="text-xl text-gray-200">
              Kenya's youth face a financial crisis. G-NET offers a solution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center"
              >
                <p className="text-5xl font-bold text-secondary mb-2">{stat.number}</p>
                <p className="text-xl font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-gray-300">{stat.subtext}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl font-semibold mb-4">
              G-NET offers a structured alternative: discipline, accountability, and real wealth-building.
            </p>
          </div>
        </div>
      </section>

      {/* MMF Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Money Market Fund (MMF)</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">
              A structured financial system built on transparency and accountability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Joint Account', desc: 'Collectively managed fund with full transparency' },
              { title: 'Monthly Top-ups', desc: 'Regular contributions for compound growth' },
              { title: 'Quarterly Audits', desc: 'Financial transparency for all members' },
              { title: 'Same-day Contributions', desc: 'Maximize compounding benefits' },
              { title: 'Withdrawal Policies', desc: 'Requiring multiple signatories for security' },
              { title: 'Financial Discipline', desc: 'Breaking cycles of impulsive spending' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-secondary transition"
              >
                <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blessed Mind Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
            <Lightbulb className="w-5 h-5 text-secondary" />
            <span className="font-semibold text-primary">Innovation Lab</span>
          </div>
          
          <h2 className="text-4xl font-bold text-primary mb-6">Blessed Mind Sessions</h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            A think-tank environment where members brainstorm problems, generate ideas, 
            and develop formal proposals for real-world solutions.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Identify community challenges',
              'Brainstorm innovative solutions',
              'Develop business ideas',
              'Write professional proposals',
              'Pitch to mentors and investors',
              'Build strategic collaborations'
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {idx + 1}
                </div>
                <p className="font-semibold text-gray-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Membership Benefits</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">What You'll Gain</h3>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who Can Join */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Who Can Join?</h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <ul className="space-y-3">
                  {['Entrepreneurs', 'Students', 'Creatives', 'Tech innovators', 'Investors', 
                    'Anyone committed to personal transformation'].map((type, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">What Makes G-NET Different</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "We don't just talk — we execute.",
              "We don't compete — we collaborate.",
              "We don't just plan — we build.",
              "We don't wait for opportunities — we create them."
            ].map((statement, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-secondary"
              >
                <p className="text-lg font-semibold text-gray-800">{statement}</p>
              </div>
            ))}
          </div>

          <p className="text-xl text-gray-700 mt-12 font-semibold">
            G-NET is a brotherhood and sisterhood of growth-minded entrepreneurs shaping the future.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join a community of ambitious young leaders committed to excellence, 
            innovation, and generational impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/join"
              className="bg-secondary hover:bg-secondary-dark text-primary px-10 py-4 rounded-lg font-bold text-lg transition inline-flex items-center gap-2 shadow-xl"
            >
              Become a Member
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-lg font-bold text-lg transition border border-white/20"
            >
              Member Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">G-NET</h3>
          <p className="text-gray-300 mb-6">Empowering Minds, Transforming Generations</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} G-NET. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
