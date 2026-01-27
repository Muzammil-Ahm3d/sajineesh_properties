import React from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImageCard } from '@/components/ImageCard';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { GlowCard } from '@/components/GlowCard';
import { FloatingImage } from '@/components/FloatingImage';
import { CheckCircle, Award, Clock, Users, Target, Briefcase } from 'lucide-react';

import serviceBridge from '@/assets/service-bridge.jpg';
import serviceRoad from '@/assets/service-road.jpg';
import serviceBuilding from '@/assets/service-building.jpg';
import founderPortrait from '@/assets/founder-portrait.jpg';
import bgInfrastructure from '@/assets/bg-infrastructure.jpg';
import logo from '@/assets/logo.png';

const achievements = [
  { icon: Award, label: 'A-Class Contractor', value: 'Licensed' },
  { icon: Briefcase, label: 'Projects Executed', value: '₹100+ Cr' },
  { icon: Clock, label: 'Years Experience', value: '13+' },
  { icon: Users, label: 'Districts Covered', value: '10+' },
];

const whyChooseUs = [
  {
    title: 'A-Class Government Contractor',
    description: 'Licensed for highest-value government infrastructure projects.',
  },
  {
    title: '₹100+ Crores of Executed Works',
    description: 'Proven track record of delivering large-scale infrastructure.',
  },
  {
    title: 'Strong Experience in Bridge Projects',
    description: 'Specialized expertise in complex bridge engineering.',
  },
  {
    title: 'Timely and Quality Execution',
    description: 'Commitment to deadlines without compromising on quality.',
  },
  {
    title: 'Trusted by Government Departments',
    description: 'Long-standing relationships with R&B and Rural Works divisions.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <ParallaxBackground imageSrc={bgInfrastructure} overlayOpacity={0.85}>
        <section className="py-32 pt-40">
          <div className="container-wide section-padding">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-white/70 font-semibold">About Us</span>
                <h1 className="heading-display text-white mt-2 mb-6">
                  Building India's Infrastructure
                </h1>
                <p className="text-xl text-white/80">
                  13+ years of excellence in government infrastructure projects
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ParallaxBackground>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container-wide section-padding py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 100}>
                <div className="text-center">
                  <item.icon className="w-10 h-10 text-white/80 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">{item.value}</p>
                  <p className="text-white/70 text-sm mt-1">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="text-primary font-semibold">Our Story</span>
                <h2 className="heading-section mt-2 mb-6">
                  Sajineesh Construction Pvt. Ltd.
                </h2>
                <p className="text-muted-foreground mb-4">
                  Sajineesh Bikkina entered the construction industry in 2011 at a young age. He began his career as a site supervisor, gaining hands-on experience in project execution and site management.
                </p>
                <p className="text-muted-foreground mb-4">
                  Over the years, he progressed to working as a subcontractor and later established himself as an independent contractor.
                </p>
                <p className="text-muted-foreground">
                  He is currently an A-Class licensed contractor, undertaking government and infrastructure works in Odisha, Bhubaneswar.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <FloatingImage
                  src={serviceBridge}
                  alt="Bridge Project"
                  className="rounded-xl aspect-video"
                />
                <FloatingImage
                  src={serviceRoad}
                  alt="Road Project"
                  className="rounded-xl mt-8 aspect-video"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* Founder Section */}
      <section className="section-padding bg-grey-lighter">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <GlowCard className="w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={logo}
                    alt="Sajineesh Construction"
                    className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
                  />
                </GlowCard>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <span className="text-primary font-semibold">Who We Are</span>
                <h2 className="heading-section mt-2 mb-6">Building the Future</h2>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Sajineesh Construction Pvt Ltd is a premier infrastructure development company
                    dedicated to building the foundations of modern India. With a legacy of
                    excellence and a future-focused approach, we specialize in constructing
                    bridges, roads, and complex engineered structures that stand the test of time.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Our commitment goes beyond concrete and steel; it is about connecting people,
                    powering economies, and delivering precision in every structure we build.
                    We pride ourselves on our technical expertise, adherence to safety standards,
                    and ability to deliver challenging projects on schedule.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div >
      </section >

      {/* Vision & Mission */}
      < section className="section-padding" >
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal>
              <GlowCard className="p-8 h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To deliver durable, safe, and sustainable infrastructure that supports regional
                  and national development. We aim to be recognized as the most trusted infrastructure
                  partner for government projects.
                </p>
              </GlowCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlowCard className="p-8 h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To execute government infrastructure projects with integrity, quality, and timely
                  delivery. We are committed to building infrastructure that improves lives, connects
                  communities, and contributes to India's development.
                </p>
              </GlowCard>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <GlowCard className="p-8 h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card mb-4">Our Values</h3>
                <p className="text-muted-foreground">
                  <strong>Quality:</strong> Precision in every structure.<br />
                  <strong>Integrity:</strong> Honest and transparent dealings.<br />
                  <strong>Safety:</strong> Zero compromise on safety standards.<br />
                  <strong>Innovation:</strong> Adopting modern construction techniques.
                </p>
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section >

      {/* Departments Worked With */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-section">Departments Worked With</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                'Roads & Buildings (R&B) Department, Odisha',
                'Rural Works Department',
                'Irrigation & Water Resources Department'
              ].map((dept, index) => (
                <div key={index} className="bg-white px-6 py-4 rounded-lg shadow-sm border border-border flex items-center gap-3 hover:border-primary hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="font-medium">{dept}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      < section className="section-padding bg-grey-lighter" >
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold">Our Strengths</span>
              <h2 className="heading-section mt-2">Why Choose Us</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <GlowCard className="bg-white p-6 h-full shadow-sm">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="section-padding" >
        <div className="container-wide">
          <ScrollReveal>
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
              <h2 className="heading-section text-white mb-4">
                Partner With Us
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Looking for a trusted A-Class contractor for your next infrastructure project?
              </p>
              <a
                href="/contact"
                className="btn-hero-primary inline-block"
              >
                Contact Us Today
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section >
    </div >
  );
};

export default About;
