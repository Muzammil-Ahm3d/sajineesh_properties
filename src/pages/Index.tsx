import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImageCard } from '@/components/ImageCard';
import { TypingAnimation } from '@/components/TypingAnimation';
import { PulsingBadge } from '@/components/PulsingBadge';
import { FloatingImage } from '@/components/FloatingImage';
import { GlowCard } from '@/components/GlowCard';

// Import images
import heroBridge from '@/assets/hero-bridge.jpg';
import serviceBridge from '@/assets/service-bridge.jpg';
import serviceRoad from '@/assets/service-road.jpg';
import serviceBuilding from '@/assets/service-building.jpg';
import serviceIrrigation from '@/assets/service-irrigation.jpg';

// Featured project images
import bridgeKansabansa from '@/assets/projects/bridge-kansabansa.jpg';
import roadTalcher from '@/assets/projects/road-talcher.jpg';
import bridgeBudhabalanga from '@/assets/projects/bridge-budhabalanga.jpg';
import buildingDhh from '@/assets/projects/building-dhh-angul.jpg';

const services = [
  {
    title: 'Bridge Construction',
    description: 'Execution of High-Level bridges, river bridges, major and minor bridges for government infrastructure projects.',
    image: serviceBridge,
  },
  {
    title: 'Road Infrastructure',
    description: 'Construction and improvement of state highways, district roads, and rural road networks.',
    image: serviceRoad,
  },
  {
    title: 'Building Construction',
    description: 'Construction of government, institutional, and public utility buildings.',
    image: serviceBuilding,
  },
];

const featuredProjects = [
  {
    title: 'H.L Bridge over River Kansabansa',
    location: 'Balasore, Odisha',
    category: 'Bridge',
    image: bridgeKansabansa,
  },
  {
    title: 'New Road Construction – Talcher',
    location: 'Angul, Odisha',
    category: 'Road',
    image: roadTalcher,
  },
  {
    title: 'H.L Bridge over Budhabalanga River',
    location: 'Mayurbhanj, Odisha',
    category: 'Bridge',
    image: bridgeBudhabalanga,
  },
  {
    title: 'Attendance Rest Shed – DHH Angul',
    location: 'Angul, Odisha',
    category: 'Building',
    image: buildingDhh,
  },
];

const stats = [
  { number: '13+', label: 'Years Experience' },
  { number: '₹100+', label: 'Crores Executed' },
  { number: '50+', label: 'Projects Delivered' },
  { number: '4', label: 'Core Domains' },
];

const whyChooseUs = [
  'A-Class Government Contractor',
  '₹100+ Crores of Executed Works',
  'Strong Experience in Bridge Projects',
  'Timely and Quality Execution',
  'Trusted by Government Departments',
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroBridge}
            alt="Bridge Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>

        <div className="relative z-10 container-wide section-padding pt-32">
          <div className="max-w-4xl">
            <ScrollReveal>
              <PulsingBadge className="mb-6">
                A-Class Government Contractor
              </PulsingBadge>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="heading-display text-white mb-6">
                <TypingAnimation
                  text="Delivering Reliable Infrastructure for Government Development Projects"
                  speed="medium"
                  delay={300}
                />
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
                Bridges, Roads, Buildings & Irrigation Works | ₹100+ Crores Executed
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projects" className="btn-hero-primary inline-flex items-center justify-center gap-2">
                  View Projects
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/services" className="btn-hero-secondary inline-flex items-center justify-center gap-2">
                  Our Services
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse-slow" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12">
        <div className="container-wide section-padding py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white">{stat.number}</p>
                  <p className="text-white/80 mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-grey-lighter">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold">What We Do</span>
              <h2 className="heading-section mt-2">Our Services</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Specialized in delivering government infrastructure projects with precision and quality
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 100}>
                <div className="card-service h-full">
                  <ImageCard src={service.image} alt={service.title} />
                  <div className="p-6">
                    <h3 className="heading-card mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="btn-primary inline-flex items-center gap-2"
              >
                View All Services
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold">Our Work</span>
              <h2 className="heading-section mt-2">Featured Projects</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                A selection of our completed infrastructure projects across Odisha
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 100}>
                <div className="card-project group">
                  <ImageCard src={project.image} alt={project.title} />
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="btn-primary inline-flex items-center gap-2"
              >
                View All Projects
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-green-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="text-white/70 font-semibold">Why Choose Us</span>
                <h2 className="heading-section text-white mt-2 mb-6">
                  Trusted by Government Departments Across India
                </h2>
                <ul className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 text-white/90">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/about"
                  className="btn-hero-primary mt-8 inline-flex items-center gap-2"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FloatingImage
                  src={serviceBridge}
                  alt="Bridge Construction"
                  className="rounded-xl aspect-video"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FloatingImage
                  src={serviceRoad}
                  alt="Road Construction"
                  className="rounded-xl mt-8 aspect-video"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FloatingImage
                  src={serviceBuilding}
                  alt="Building Construction"
                  className="rounded-xl aspect-video"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FloatingImage
                  src={serviceIrrigation}
                  alt="Irrigation Works"
                  className="rounded-xl mt-8 aspect-video"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <GlowCard className="bg-grey-lighter p-8 h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="heading-card mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To deliver durable, safe, and sustainable infrastructure that supports regional and national development,
                  setting new standards in government construction projects.
                </p>
              </GlowCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlowCard className="bg-grey-lighter p-8 h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="heading-card mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To execute government infrastructure projects with integrity, quality, and timely delivery,
                  ensuring every project contributes to the development of communities we serve.
                </p>
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-grey-lighter">
        <div className="container-wide">
          <ScrollReveal>
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
              <h2 className="heading-section text-white mb-4">
                Ready to Build Together?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Partner with a trusted A-Class government contractor for your next infrastructure project
              </p>
              <Link
                to="/contact"
                className="btn-hero-primary inline-flex items-center gap-2"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
