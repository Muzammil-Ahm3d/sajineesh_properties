import React from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { GlowCard } from '@/components/GlowCard';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';

import bgInfrastructure from '@/assets/bg-infrastructure.jpg';

const offices = [
  {
    type: 'Head Office',
    address: 'Tata Ariana, Kalinganagar, Tower 9, Bhubaneswar – 751029, Odisha',
    icon: Building2,
  },
  {
    type: 'Branch Office',
    address: 'Samskruti Nilayam, SF-2, Opp. Tadigadapa 100 ft Road, Opp. Kamineni Hospital, Vijayawada – 520007, Andhra Pradesh',
    icon: MapPin,
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <ParallaxBackground imageSrc={bgInfrastructure} overlayOpacity={0.85}>
        <section className="py-32 pt-40">
          <div className="container-wide section-padding">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-white/70 font-semibold">Get in Touch</span>
                <h1 className="heading-display text-white mt-2 mb-6">Contact Us</h1>
                <p className="text-xl text-white/80">
                  We'd love to hear from you. Reach out to discuss your project needs.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ParallaxBackground>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal>
              <div>
                <h2 className="heading-section mb-8">Our Offices</h2>

                <div className="space-y-6">
                  {offices.map((office) => (
                    <GlowCard
                      key={office.type}
                      className="bg-grey-lighter p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <office.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{office.type}</h3>
                          <p className="text-muted-foreground">{office.address}</p>
                        </div>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">sajineeshconstructions@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Hours</p>
                      <p className="font-semibold">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={200}>
              <GlowCard className="bg-grey-lighter p-8">
                <h2 className="heading-card mb-6">Send us a Message</h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-4"
                  >
                    Send Message
                  </button>
                </form>
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="section-padding bg-grey-lighter">
        <div className="container-wide">
          <ScrollReveal>
            <div className="bg-green-dark rounded-xl p-12 text-center">
              <h2 className="heading-section text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Contact us today to discuss your infrastructure needs. Our team is ready
                to help you with project planning, estimations, and execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:sajineeshconstructions@gmail.com"
                  className="btn-hero-secondary inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
