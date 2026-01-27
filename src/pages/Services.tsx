import React from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImageCard } from '@/components/ImageCard';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { GlowCard } from '@/components/GlowCard';

import serviceBridge from '@/assets/service-bridge.jpg';
import serviceRoad from '@/assets/service-road.jpg';
import serviceBuilding from '@/assets/service-building.jpg';
import serviceIrrigation from '@/assets/service-irrigation.jpg';
import bgInfrastructure from '@/assets/bg-infrastructure.jpg';

const services = [
  {
    title: 'Bridge Construction',
    description: 'Execution of High-Level bridges, river bridges, major and minor bridges for government infrastructure projects. Our expertise spans across complex river crossings, urban flyovers, and rural connectivity bridges under various government schemes including Biju Setu Yojana and PMGSY.',
    features: [
      'High-Level (H.L) Bridge Construction',
      'River Bridge Engineering',
      'PMGSY & Biju Setu Yojana Projects',
      'Approach Road Development',
    ],
    image: serviceBridge,
  },
  {
    title: 'Road Infrastructure',
    description: 'Construction and improvement of state highways, district roads, and rural road networks. We specialize in building durable road infrastructure that enhances connectivity and supports economic development across urban and rural areas.',
    features: [
      'State Highway Construction',
      'District & Rural Road Networks',
      'Road Strengthening & Widening',
      'Urban Road Development',
    ],
    image: serviceRoad,
  },
  {
    title: 'Building Construction',
    description: 'Construction of government, institutional, and public utility buildings. From hospitals to educational institutions, we deliver quality structures that serve communities and meet government specifications.',
    features: [
      'Government Building Construction',
      'Hospital & Healthcare Facilities',
      'Educational Institutions',
      'Public Utility Structures',
    ],
    image: serviceBuilding,
  },
  {
    title: 'Irrigation & Water Works',
    description: 'Water resource infrastructure including canals, irrigation structures, and allied works. Our irrigation projects support agricultural development and water management across the region.',
    features: [
      'Canal Construction & Lining',
      'Irrigation Structures',
      'Water Resource Management',
      'Drainage Infrastructure',
    ],
    image: serviceIrrigation,
  },
  {
    title: 'Machinery & Equipment',
    description: 'Machinery Model: Mixed (Owned + Hired) - ensuring cost efficiency, flexibility, and uninterrupted execution for Government works.',
    features: [
      'Concrete Mixers & Road Rollers',
      'Cranes, JCBs & Excavators',
      'Tippers & Dumpers',
      'Water Tankers & Compactors',
    ],
    image: bgInfrastructure,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <ParallaxBackground imageSrc={bgInfrastructure} overlayOpacity={0.85}>
        <section className="py-32 pt-40">
          <div className="container-wide section-padding">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-white/70 font-semibold">What We Do</span>
                <h1 className="heading-display text-white mt-2 mb-6">Our Services</h1>
                <p className="text-xl text-white/80">
                  Comprehensive infrastructure solutions delivered with expertise and commitment to quality
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ParallaxBackground>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-20">
            {services.map((service, index) => (
              <ScrollReveal key={service.title}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <GlowCard className="overflow-hidden">
                      <ImageCard
                        src={service.image}
                        alt={service.title}
                        className="rounded-xl shadow-lg"
                      />
                    </GlowCard>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="heading-section mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-grey-lighter">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="heading-section mb-4">Need Infrastructure Solutions?</h2>
              <p className="text-muted-foreground mb-8">
                Get in touch with us to discuss your project requirements
              </p>
              <a
                href="/contact"
                className="btn-primary inline-block"
              >
                Contact Us Today
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
