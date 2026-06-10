'use client';

import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { useState, useEffect } from 'react';
const WHATSAPP_NUMBER = '962797348978'; // No "+", no spaces
const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// ============================================
// ICONS
// ============================================
const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94
1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.131.164-.173199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.24.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065
2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085
1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0
01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884
2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815
11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0
005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const StarIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    />
  </svg>
);

const CheckIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PlusIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ============================================
// ANIMATION VARIANTS
// ============================================
import { Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// ============================================
// REUSABLE WHATSAPP BUTTON COMPONENTS
// ============================================
function WhatsButton({
  productName,
  price,
  className = '',
  children,
  message,
  variant = 'primary',
}: {
  productName?: string;
  price?: number;
  className?: string;
  children?: React.ReactNode;
  message?: string;
  variant?: 'primary' | 'outline' | 'dark';
}) {
  const defaultMessage =
    productName && price
      ? `Hi! I'd like to order:\n\n📦 ${productName}\n💰 ${price}JDs\n\nPlease confirm availability and shipping. Thank
you!`
      : `Hi! I'm interested in BETTERBEATHE nasal strips. Can you help me with my order?`;

  const href = buildWhatsAppLink(message || defaultMessage);

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all cursor-pointer whitespace - nowrap';
  const variantStyles = {
    primary:
      'bg-[#25D366] text-white hover:bg-[#1ebd5a] shadow-xl shadow-[#25D366]/30',
    dark:
      'bg-[#0A0F1C] text-white hover:bg-[#1a2540] shadow-xl shadow-neutral-900/20',
    outline:
      'bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
      {children || (productName ? 'Order on WhatsApp' : 'Chat on WhatsApp')}
    </a>
  );
}

// ============================================
// FLOATING WHATSAPP BUTTON (Always visible)
// ============================================
function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const href = buildWhatsAppLink("Hi! I have a question about BETTERBEATHE nasal strips.");

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 max-w-xs flex items-start gap-3
cursor-pointer hover:shadow-3xl transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#0A0F1C]">Chat with BETTERBEATHE</div>
              <div className="text-xs text-neutral-600 mt-0.5">
                Hi there! 👋 Click here to order via WhatsApp. We typically reply in minutes.
              </div>
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 flex items-center
justify-center relative"
        aria-label="Open WhatsApp chat"
      >
        <WhatsAppIcon className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center
text-[10px] font-bold text-white animate-pulse">
          1
        </span>
      </motion.button>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function HomePage() {
  return (
    <main className="bg-[#FAFAF7] text-[#0A0F1C] overflow-x-hidden">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <SocialProofBar />
      <BenefitsSection />
      <ProductShowcase />
      <BeforeAfterSection />
      <HowItWorksSection />
      <ScienceSection />
      <ReviewsSection />
      <FAQSection />
      <SubscriptionSection />
      <FinalCTASection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

// ============================================
// SECTIONS
// ============================================
function AnnouncementBar() {
  return (
    <div className="bg-[#0A0F1C] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-medium tracking-wide">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full animate-pulse" />
          Free Delivery on Orders 35JDs+
        </span>
        <span className="opacity-50 hidden sm:inline">•</span>
        <span>60-Night Money-Back Guarantee</span>
        <span className="opacity-50 hidden sm:inline">•</span>
        <span className="text-[#00C896] font-semibold">Use CODE BREATHE20 for 20% Off</span>
      </div>
    </div>
  );
}

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#FAFAF7]/80 backdrop-blur-xl border-b border-neutral-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0A0F1C] to-[#1a2540] rounded-lg flex items-center
justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-[#00C896]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">BETTERBEATHE</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Shop', 'Science', 'Reviews', 'How It Works', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium
text-neutral-700 hover:text-[#0A0F1C] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C896] group-hover:w-full transition-all
duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <WhatsButton
              variant="primary"
              className="hidden sm:inline-flex text-sm px-4 py-2"
            >
              Order Now
            </WhatsButton>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-neutral-200"
            >
              <div className="py-4 space-y-3">
                {['Shop', 'Science', 'Reviews', 'How It Works', 'FAQ'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium py-2 text-neutral-700">
                    {item}
                  </a>
                ))}
                <WhatsButton className="w-full mt-2 px-4 py-3 text-sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00C896]/10 rounded-full
blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid lg:grid-cols-2 gap-8
lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border
border-neutral-200 rounded-full text-xs font-semibold mb-6 shadow-sm">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 text-[#00C896]" />
                ))}
              </span>
              <span className="text-neutral-700">47,000+ 5-Star Reviews</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Breathe Better.
              <br />
              <span className="bg-gradient-to-r from-[#0A0F1C] via-[#00C896] to-[#0A0F1C] bg-clip-text
text-transparent">
                Sleep Deeper.
              </span>
              <br />
              Perform Stronger.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0
leading-relaxed">
              Clinically proven nasal strips that open your airways by <span className="font-bold
text-[#0A0F1C]">38%</span>. Wake up energized, train harder, and sleep quieter — starting tonight.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-8 justify-center
lg:justify-start">
              <WhatsButton
                variant="primary"
                className="px-8 py-4 text-base"
                message="Hi! I'd like to order BETTERBEATHE nasal strips. Please share available packs and prices."
              >
                Order on WhatsApp — From 10JDs
              </WhatsButton>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white
border border-neutral-300 text-[#0A0F1C] text-base font-semibold rounded-full hover:border-[#0A0F1C] transition-all">
                See The Science
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start
gap-x-6 gap-y-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-[#00C896]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-[#00C896]" />
                <span>60-Night Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-[#00C896]" />
                <span>FDA-Cleared</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={scaleIn} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C896]/20 via-blue-400/10 to-transparent
rounded-full blur-2xl" />

              <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-100
to-neutral-200 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop"
                  alt="Athlete breathing deeply"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/40 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 sm:-left-12 bg-white p-4 rounded-2xl shadow-2xl border
border-neutral-200 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C896] to-[#009d77] rounded-xl flex items-center
justify-center">
                    <span className="text-white text-xl font-bold">+</span>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 font-medium">Airflow Increase</div>
                    <div className="text-xl font-bold text-[#0A0F1C]">+38%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-4 sm:-right-8 bg-white p-3 pr-4 rounded-2xl shadow-2xl border
border-neutral-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
                  <div>
                    <div className="text-xs font-bold">Sarah K.</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-2.5 h-2.5 text-[#00C896]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600">"Best sleep in years!"</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofBar() {
  const stats = [
    { value: '2M+', label: 'Strips Sold' },
    { value: '4.9/5', label: 'Customer Rating' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '12', label: 'Clinical Studies' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#0A0F1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className="text-center">
              <div className="text-3xl sm:text-5xl font-bold tracking-tight mb-2">{stat.value}</div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
          <p className="text-sm text-neutral-400 mb-4">As featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {['FORBES', "MEN'S HEALTH", 'WIRED', 'RUNNERS WORLD', 'SLEEP FOUNDATION'].map((brand) => (
              <span key={brand} className="text-base sm:text-lg font-bold tracking-widest">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: 'Better Sleep',
      description: 'Fall asleep 23% faster and stay asleep longer with optimized breathing.',
      metric: '23% Faster',
      metricLabel: 'Sleep Onset',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=600&fit=crop'
    },
    {
      title: 'Improved Breathing',
      description: 'Instantly opens nasal passages by 38% for deeper, easier breaths.',
      metric: '+38%',
      metricLabel: 'Airflow',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop'
    },
    {
      title: 'Reduced Snoring',
      description: 'Up to 73% less snoring. Your partner will thank you.',
      metric: '-73%',
      metricLabel: 'Snoring',
      image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=600&h=600&fit=crop'
    },
    {
      title: 'Athletic Performance',
      description: 'Train harder, recover faster. Trusted by Olympic athletes.',
      metric: '+12%',
      metricLabel: 'VO2 Max',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop'
    }
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full" />
            The Benefits
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            One strip. <span className="text-neutral-400">Four transformations.</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600">Engineered with medical-grade adhesive and flexible
            spring technology to deliver results you can feel from the first night.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-200
hover:shadow-2xl transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={benefit.image} alt={benefit.title} fill className="object-cover group-hover:scale-110
transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-3xl font-bold">{benefit.metric}</div>
                  <div className="text-xs uppercase tracking-wider opacity-80">{benefit.metricLabel}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const products = [
    {
      name: 'The Starter',
      strips: 30,
      price: 10,
      perStrip: 0.33,
      popular: false,
      features: ['30 premium strips', 'Original size', 'Standard adhesive', 'Free Delivery']
    },
    {
      name: 'The Pro',
      strips: 100,
      price: 25,
      perStrip: 0.25,
      popular: true,
      features: ['100 premium strips', 'All sizes included', 'Pro-grade adhesive', 'Free Delivery']
    },
    {
      name: 'The Bundle',
      strips: 50,
      price: 15,
      perStrip: 0.3,
      popular: false,
      features: ['50 premium strips', 'All sizes included', 'Pro-grade adhesive', 'Free express shipping']
    }
  ];

  return (
    <section id="shop" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAFAF7] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full" />
            Choose Your Pack
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Sleep better. <span className="text-[#00C896]">Save more.</span>
          </h2>
          <p className="text-lg text-neutral-600">The more you buy, the more you save. Every order is backed by our
            60-night money-back guarantee.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 transition-all ${product.popular
                ? 'bg-[#0A0F1C] text-white shadow-2xl ring-2 ring-[#00C896] scale-105'
                : 'bg-white text-[#0A0F1C] border border-neutral-200'
                }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#00C896] text-[#0A0F1C]
text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="aspect-square mb-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200
relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-12 bg-gradient-to-r from-[#00C896] to-emerald-600 rounded-md shadow-lg
transform -rotate-12" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs
font-bold">
                  {product.strips} strips
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">{product.price}JDs</span>
                <span className={`text-sm ${product.popular ? 'text-neutral-400' :
                  'text-neutral-500'}`}>${product.perStrip}/strip</span>
              </div>
              {product.popular && <p className="text-sm text-[#00C896] mb-4 font-semibold">Best value per strip</p>}

              <ul className="space-y-3 my-6">
                {product.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="w-4 h-4 flex-shrink-0 text-[#00C896]" />
                    <span className={product.popular ? 'text-neutral-300' : 'text-neutral-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <WhatsButton
                productName={product.name}
                price={product.price}
                variant={product.popular ? 'primary' : 'dark'}
                className="w-full py-4"
              />

              <p className={`text-xs text-center mt-4 ${product.popular ? 'text-neutral-400' :
                'text-neutral-500'}`}>Free Delivery • 60-night guarantee</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const items = [
    { metric: 'Sleep Quality', before: 52, after: 89, unit: '/100' },
    { metric: 'Nasal Airflow', before: 38, after: 76, unit: '% open' },
    { metric: 'Daytime Energy', before: 45, after: 91, unit: '/100' }
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F1C] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            The difference? <span className="text-[#00C896]">Night and day.</span>
          </h2>
          <p className="text-lg text-neutral-400">See the measurable impact BETTERBREATHE has on your sleep, breathing, and
            energy.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800
rounded-3xl p-8">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-6 font-semibold">{item.metric}</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">Before</span>
                    <span className="text-lg font-bold text-neutral-500">
                      {item.before}
                      {item.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-neutral-600 rounded-full" style={{ width: `${item.before}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs text-[#00C896] uppercase tracking-wider font-bold">After BETTERBREATHE</span>
                    <span className="text-2xl font-bold text-[#00C896]">
                      {item.after}
                      {item.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00C896] to-emerald-400 rounded-full" style={{
                      width: `${item.after}%`
                    }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center gap-2">
                <div className="text-2xl font-bold text-[#00C896]">+{Math.round(((item.after - item.before) /
                  item.before) * 100)}%</div>
                <span className="text-xs text-neutral-400">improvement</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: '01', title: 'Peel', description: 'Remove the protective backing from the medical-grade adhesive strip.',
      visual: '🎯'
    },
    {
      step: '02', title: 'Apply', description: 'Position across the bridge of your nose. Press gently for 10 seconds.', visual: '✨'
    },
    {
      step: '03', title: 'Breathe', description: 'Feel instant airflow. Sleep, train, and live better immediately.',
      visual: '💨'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full" />
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Three steps. <span className="text-neutral-400">Ten seconds.</span>
          </h2>
          <p className="text-lg text-neutral-600">No drugs. No side effects. No doctor visits. Just instant,
            science-backed relief.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r
from-transparent via-neutral-300 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6 rounded-full
bg-gradient-to-br from-white to-neutral-100 border border-neutral-200 shadow-xl">
                <div className="text-5xl">{step.visual}</div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#0A0F1C] rounded-full flex items-center
justify-center text-white text-sm font-bold shadow-lg">
                  {step.step}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-neutral-600 max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  const stats = [
    { stat: '38%', label: 'Increase in nasal airflow within 60 seconds' },
    { stat: '73%', label: 'Reduction in snoring volume reported by partners' },
    { stat: '23%', label: 'Faster sleep onset measured via EEG' },
    { stat: '12%', label: 'Improvement in athletic VO2 max performance' }
  ];

  return (
    <section id="science" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full" />
              Backed By Science
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">The data doesn't lie.</h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">12 peer-reviewed studies. 3,000+ test
              subjects. The most rigorously tested nasal strips on the market. Our flexible spring technology has been proven
              to:</p>

            <div className="space-y-4">
              {stats.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-200">
                  <div className="text-3xl sm:text-4xl font-bold text-[#00C896] min-w-[80px]">{item.stat}</div>
                  <div className="text-sm text-neutral-700">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-200
to-neutral-300 shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=800&fit=crop"
                alt="Medical research" fill className="object-cover" />
            </div>

            <div className="absolute -bottom-6 -left-4 sm:-left-8 right-4 sm:right-8 bg-white p-6 rounded-2xl
shadow-2xl border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0
flex items-center justify-center text-white font-bold text-lg">DR</div>
                <div>
                  <p className="text-sm text-neutral-700 italic mb-2">"BETTERBREATHE represents the gold standard in
                    non-invasive respiratory support. I recommend it to my patients."</p>
                  <p className="text-sm font-bold">Dr. Rebecca Chen, MD</p>
                  <p className="text-xs text-neutral-500">Sleep Medicine, Stanford Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    {
      name: 'Sarah Mitchell', role: 'Marathon Runner', rating: 5, text: 'I noticed a difference in my breathing on the very first run.My pace improved by 15 seconds per mile.These are now part of my training kit, period.', image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    {
      name: 'Marcus Johnson', role: 'Software Engineer', rating: 5, text: 'My wife bought these for my snoring. Within 2 nights, she was sleeping through the night.Within a week, I had more energy than I have had in years.', image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    {
      name: 'Emma Rodriguez', role: 'Yoga Instructor', rating: 5, text: 'I teach 6 classes a week. BETTERBEATHE has completely transformed my breathing practice.Deeper inhales, longer exhales, better focus.Obsessed.', image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
    },
    {
      name: 'David Kim', role: 'CrossFit Athlete', rating: 5, text: 'Tried 5 different brands. None compare. The adhesive actually stays on through intense workouts and the lift is noticeably stronger.', image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
      name: 'Olivia Patel', role: 'New Mom', rating: 5, text: 'Sleep deprivation is brutal with a newborn. BETTERBEATHE gives me the deepest sleep possible in those precious few hours.Lifesaver.', image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
    },
    {
      name: 'James Thompson', role: 'Triathlete', rating: 5, text: 'Used these during Ironman training. Race day performance was 8% better than my predicted time.Coincidence ? I think not.', image:
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop'
    }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const goToSlide = (index: number) => setActiveIndex(index);
  const prev = () => setActiveIndex((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setActiveIndex((p) => (p + 1) % reviews.length);
  return (

    <section id="reviews" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-3 h-3 text-[#00C896]" />
              ))}
            </span>
            <span className="text-neutral-700">47,000+ verified reviews</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Real people. <span className="text-[#00C896]">Real results.</span>
          </h2>
          <p className="text-lg text-neutral-600">
            4.9/5 average rating from customers who have made AEROFLOW part of their daily routine.
          </p>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200
shadow-sm">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, j) => (
                        <StarIcon key={j} className="w-4 h-4 text-[#00C896]" />
                      ))}
                    </div>
                    <p className="text-neutral-700 mb-6 leading-relaxed text-base sm:text-lg">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{review.name}</div>
                        <div className="text-xs text-neutral-500">{review.role}</div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs
font-semibold rounded-full">
                        <CheckIcon className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous / Next Arrows */}
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full
bg-white border border-neutral-200 shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors
z-10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next review"
            className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full
bg-white border border-neutral-200 shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors
z-10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`transition-all rounded-full ${activeIndex === i
                  ? 'w-8 h-2 bg-[#00C896]'
                  : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <WhatsButton
            variant="primary"
            className="px-8 py-4 text-base"
            message="Hi! I've seen the great reviews. I'd like to try AEROFLOW. Can you help me place an order?"
          >
            Join 50,000+ Happy Customers
          </WhatsButton>
        </div>
      </div>
    </section>
  );
}


function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      q: 'Do BETTERBEATHE strips really work?', a: 'Yes. Our strips use medical-grade flexible spring technology trusted by 50,000+ customers. 12 clinical studies show a 38% average increase in nasal airflow within 60 seconds.We also back every order with a 60-night money- back guarantee.'
    },
    {
      q: 'Are they comfortable to wear overnight?', a: 'Absolutely. Our strips are designed with hypoallergenic, medical - grade adhesive and ultra - flexible materials.Most customers forget they are wearing them.They stay securely in place all night without pulling or causing irritation.'
    },
    {
      q: 'Will they help with my snoring?', a: 'In clinical studies, 73% of users reported significantly reduced snoring volume.By gently opening your nasal passages, BETTERBEATHE reduces the airway resistance that causes snoring.'
    },
    {
      q: 'How is this different from drugstore brands?', a: 'BETTERBEATHE uses a stronger spring band (our patented FlexLift technology) that provides 38 % more lift than leading competitors.Our adhesive is medical - grade and hypoallergenic, designed to stay on through sweat and movement.'
    },
    {
      q: 'Can I use them during exercise?', a: 'Yes. Our Pro-grade adhesive is specifically designed to stay on during intense physical activity.Olympic athletes, marathon runners, and CrossFit competitors all use BETTERBEATHE.'
    },
    {
      q: 'What if they do not work for me?', a: 'We offer a 60-night money-back guarantee. If you are not completely satisfied, contact our support team within 60 days for a full refund — no questions asked.'
    },
    {
      q: 'How long does shipping take?', a: 'All US orders ship free and arrive within 2-5 business days. Express shipping(1 - 2 days) is available at checkout.International shipping to 47 countries.'
    },
    {
      q: 'How do subscriptions work?', a: 'Subscribe and save 20% on every order. Choose your delivery frequency (every 30, 60, or 90 days).Pause, skip, or cancel anytime from your account dashboard — no commitments, no fees.'
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full" />
            Frequently Asked
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Got questions?</h2>
          <p className="text-lg text-neutral-600">Everything you need to know. Still curious? Our team replies in
            under 2 hours.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? 1 : i)} className="w-full px-6 py-5 flex
items-center justify-between text-left hover:bg-neutral-50 transition-colors">
                <span className="font-semibold text-base pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${openIndex ===
                  i ? 'bg-[#00C896] text-white rotate-180' : 'bg-neutral-100'}`}>
                  {openIndex === i ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                </span>
              </button>
              {openIndex === i && <div className="px-6 pb-5 text-neutral-600 leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-neutral-50 rounded-2xl">
          <p className="text-sm text-neutral-700 mb-4">Still have questions? Chat with us directly.</p>
          <WhatsButton variant="primary" className="px-6 py-3 text-sm" message="Hi! I have a question about BETTERBEATHE
nasal strips.">
            Ask Us on WhatsApp
          </WhatsButton>
        </div>
      </div>
    </section>
  );
}

function SubscriptionSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0A0F1C] via-[#1a2540] to-[#0A0F1C] rounded-[2.5rem] p-8
sm:p-12 lg:p-16 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C896]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border
border-white/20 rounded-full text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full animate-pulse" />
                The BETTERBEATHE Membership
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Breathe better, <span className="text-[#00C896]">forever.</span>
              </h2>
              <p className="text-lg text-neutral-300 mb-8">Join 15,000+ members who never have to think about
                restocking. Save 20% on every order, get free express shipping, and unlock member-only perks.</p>

              <ul className="space-y-4 mb-8">
                {['Save 20% on every delivery, automatically', 'Free express shipping on all orders', 'Skip, pause, or cancel anytime — no fees', 'Member-only early access to new products', 'Priority customer support, 24/7'].map((text,
                  i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-[#00C896] flex-shrink-0" />
                    <span className="text-neutral-200">{text}</span>
                  </li>
                ))}
              </ul>

              <WhatsButton
                variant="primary"
                className="px-8 py-4 text-base"
                message="Hi! I'd like to start the BETTERBEATHE Membership subscription. Please share the details."
              >
                Start Your Membership
              </WhatsButton>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="text-sm text-neutral-400 uppercase tracking-wider mb-2">The Pro Subscription</div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-bold">31JDs</span>
                  <span className="text-neutral-400">/month</span>
                </div>
                <div className="text-sm text-[#00C896] font-semibold mt-1">Save 8JDs vs one-time purchase</div>
              </div>

              <div className="space-y-3 mb-6">
                {['120 premium strips delivered monthly', 'Free express shipping', 'Flexible delivery schedule',
                  'Cancel anytime', 'Member-only perks'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-200">
                      <CheckIcon className="w-4 h-4 text-[#00C896] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#00C896]">2M+</div>
                  <div className="text-xs text-neutral-400">Sold</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#00C896]">4.9★</div>
                  <div className="text-xs text-neutral-400">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#00C896]">60</div>
                  <div className="text-xs text-neutral-400">Day Trial</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full
text-xs font-semibold mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full animate-pulse" />
          Limited Time: 20% Off Your First Order
        </div>

        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Your best sleep starts <span className="bg-gradient-to-r from-[#00C896] to-emerald-600 bg-clip-text
text-transparent">tonight.</span>
        </h2>

        <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">Join 50,000+ people breathing better, sleeping
          deeper, and performing stronger. Try BETTERBEATHE completely risk-free for 60 nights.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <WhatsButton
            variant="primary"
            className="px-10 py-5 text-lg"
            message="Hi! I'd like to claim the 20% discount on my first BETTERBEATHE order. Please help me place it!"
          >
            Claim Your 20% Discount
          </WhatsButton>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#00C896]" />
            <span>Free Delivery 35JDs+</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#00C896]" />
            <span>60-Night Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#00C896]" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#00C896]" />
            <span>Ships in 24 Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Shop: ['The Starter', 'The Pro', 'The Bundle', 'Subscribe & Save', 'Gift Cards'],
    Science: ['Clinical Studies', 'How It Works', 'Ingredients', 'Safety'],
    Company: ['About Us', 'Our Story', 'Press', 'Careers', 'Contact'],
    Support: ['Help Center', 'Shipping', 'Returns', 'Track Order', 'FAQs']
  };

  return (
    <footer className="bg-[#0A0F1C] text-white pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pb-12 mb-12 border-b border-neutral-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Get 15% off your first order</h3>
              <p className="text-neutral-400">Plus, sleep tips, early access, and member-only deals.</p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-4 bg-white/5 border
border-white/10 rounded-full text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00C896]" />
              <button className="px-6 py-4 bg-[#00C896] text-[#0A0F1C] font-bold rounded-full hover:bg-[#00e0a8] whitespace-nowrap cursor-pointer">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00C896] to-emerald-600 rounded-lg flex items-center
justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                </svg>
              </div>
              <span className="text-xl font-bold">BETTERBEATHE</span>
            </a>
            <p className="text-neutral-400 text-sm mb-6 max-w-xs">Science-backed nasal strips for better breathing,
              deeper sleep, and stronger performance.</p>
            <div className="flex items-center gap-3">
              {['Instagram', 'TikTok', 'Twitter', 'YouTube'].map((social) => (
                <a key={social} href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00C896] flex
items-center justify-center" aria-label={social}>
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>

            <div className="mt-6">
              <WhatsButton variant="primary" className="px-4 py-2 text-sm" message="Hi! I'd like to know more about
BETTERBEATHE nasal strips.">
                Chat with Us
              </WhatsButton>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-400 hover:text-[#00C896]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between
gap-4">
          <p className="text-sm text-neutral-500">© 2024 BETTERBEATHE Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}