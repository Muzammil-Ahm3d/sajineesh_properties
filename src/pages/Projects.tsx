import React, { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImageCard } from '@/components/ImageCard';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { MapPin, Building2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/config';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

// Import background
import bgInfrastructure from '@/assets/bg-infrastructure.jpg';

// Import unique project images
import bridgeKansabansa from '@/assets/projects/bridge-kansabansa.jpg';
import bridgeBudhabalanga from '@/assets/projects/bridge-budhabalanga.jpg';
import bridgeGuria from '@/assets/projects/bridge-guria.jpg';
import bridgeRatrichara from '@/assets/projects/bridge-ratrichara.jpg';
import bridgeKatraBelbaria from '@/assets/projects/bridge-katra-belbaria.jpg';
import bridgeKharasrotaJajpur from '@/assets/projects/bridge-kharasrota-jajpur.jpg';
import bridgeKharasrotaSakha from '@/assets/projects/bridge-kharasrota-sakha.jpg';
import bridgeKatraUpperbeda from '@/assets/projects/bridge-katra-upperbeda.jpg';
import bridgeGondipani from '@/assets/projects/bridge-gondipani.jpg';
import bridgeKochila from '@/assets/projects/bridge-kochila.jpg';
import roadTalcher from '@/assets/projects/road-talcher.jpg';
import roadAngulPr from '@/assets/projects/road-angul-pr.jpg';
import roadMaidharpur from '@/assets/projects/road-maidharpur.jpg';
import buildingDhhAngul from '@/assets/projects/building-dhh-angul.jpg';

const categories = ['All', 'Bridges', 'Roads', 'Buildings'];

const projects = [
  {
    title: 'New Road Construction – Talcher Autonomous College',
    description: 'Construction of new road from Talcher Bus Stand to Talcher Autonomous College to improve institutional access.',
    category: 'Roads',
    department: 'R&B Division',
    location: 'Angul, Angul District, Central Odisha',
    status: 'Completed',
    image: roadTalcher,
  },
  {
    title: 'PR Road Improvement – Angul',
    description: 'Improvement of PR Road from Raj Hotel to Hulursingha Chhak for smooth urban traffic flow.',
    category: 'Roads',
    department: 'R&B Division',
    location: 'Angul, Angul District, Central Odisha',
    status: 'Completed',
    image: roadAngulPr,
  },
  {
    title: 'Angul–Maidharpur Road Strengthening',
    description: 'Road improvement and strengthening work to enhance rural connectivity.',
    category: 'Roads',
    department: 'R&B Division',
    location: 'Angul, Angul District, Central Odisha',
    status: 'Completed',
    image: roadMaidharpur,
  },
  {
    title: 'Attendance Rest Shed – DHH Angul',
    description: 'Construction of attendance rest shed at District Headquarters Hospital under Mo Sarkar scheme.',
    category: 'Buildings',
    department: 'R&B Division',
    location: 'Angul, Angul District, Central Odisha',
    status: 'Completed',
    image: buildingDhhAngul,
  },
  {
    title: 'H.L Bridge over River Kansabansa',
    description: 'Construction of High-Level bridge on Anantapur–Bankeswarpura Road under Biju Setu Yojana.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Balasore, Balasore District, Northern Odisha',
    status: 'Work in Progress',
    image: bridgeKansabansa,
  },
  {
    title: 'H.L Bridge over Budhabalanga River',
    description: 'High-Level bridge construction at Domuhanighat for rural connectivity.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Mayurbhanj District, Northern Odisha',
    status: 'Completed',
    image: bridgeBudhabalanga,
  },
  {
    title: 'H.L Bridge over Guria Nallah',
    description: 'Bridge construction on Anandapur–Gunduriga Road under Biju Setu Yojana.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Rairangpur, Mayurbhanj District, Northern Odisha',
    status: 'Completed',
    image: bridgeGuria,
  },
  {
    title: 'H.L Bridge over River Ratrichara',
    description: 'Bridge construction near Chasapada on Narasinghpur–Siruli Road.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Puri, Puri District, Eastern Odisha',
    status: 'Work in Progress',
    image: bridgeRatrichara,
  },
  {
    title: 'H.L Bridge over River Katra – Belbaria',
    description: 'High-Level bridge construction under PMGSY scheme.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Baripada, Mayurbhanj District, Northern Odisha',
    status: 'Completed',
    image: bridgeKatraBelbaria,
  },
  {
    title: 'H.L Bridge over River Kharasrota – Jajpur',
    description: 'Bridge construction near Argalcut on MDR-13 to Balishai road.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Jajpur, Jajpur District, Eastern Odisha',
    status: 'Completed',
    image: bridgeKharasrotaJajpur,
  },
  {
    title: 'H.L Bridge over Kharasrota Sakha Nallah',
    description: 'Bridge construction at Habalagadapatana–Baliadigidia road.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Kendrapada, Kendrapara District, Eastern Odisha',
    status: 'Completed',
    image: bridgeKharasrotaSakha,
  },
  {
    title: 'H.L Bridge over River Katra – Upperbeda',
    description: 'Bridge construction on Upperbeda–Ambadia road.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Baripada, Mayurbhanj District, Northern Odisha',
    status: 'Completed',
    image: bridgeKatraUpperbeda,
  },
  {
    title: 'Bridge over Local Nallah – Gondipani',
    description: 'Construction of bridge on Gondipani–Nabinmundhakata road.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Baripada, Mayurbhanj District, Northern Odisha',
    status: 'Completed',
    image: bridgeGondipani,
  },
  {
    title: 'Bridge over Kochila Nallah',
    description: 'Bridge construction on Jharpokharia–Sankhabhanga road.',
    category: 'Bridges',
    department: 'Rural Works Division',
    location: 'Baripada, Mayurbhanj District, Northern Odisha',
    status: 'Completed',
    image: bridgeKochila,
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: wpPosts, isLoading, isError } = useQuery({
    queryKey: ['wpProjects'],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/posts?_embed&per_page=50`, {
          signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) {
          const errBody = await response.text();
          console.error("WP PROJECT API ERROR:", response.status, errBody);
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json() as Promise<WordPressPost[]>;
      } catch (err: any) {
        console.error("PROJECT FETCH FAILED:", err.message);
        throw err;
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 10, // Projects change less often, cache for 10 mins
  });

  const dynamicProjects = (wpPosts || []).map((post) => {
    const content = post.content.rendered;
    const metaMatch = content.match(/<!-- PROJECT_META: (.*) -->/);
    let meta = { location: 'Odisha', status: 'Completed', type: 'gallery', category: 'Bridges' };

    if (metaMatch && metaMatch[1]) {
      try {
        meta = JSON.parse(metaMatch[1]);
      } catch (e) {
        console.error("Failed to parse meta", e);
      }
    }

    return {
      title: post.title.rendered,
      description: content.replace(/<[^>]*>?/gm, '').split('-->').pop()?.substring(0, 150).trim() + '...',
      category: meta.category || 'Bridges',
      department: 'Infrastructure Update',
      location: meta.location || 'Odisha',
      status: meta.status || 'Completed',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg',
      metaType: meta.type
    };
  }).filter(item => item.metaType === 'project');

  const allProjects = [...dynamicProjects, ...projects];

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <ParallaxBackground imageSrc={bgInfrastructure} overlayOpacity={0.85}>
        <section className="py-32 pt-40">
          <div className="container-wide section-padding">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-white/70 font-semibold">Our Portfolio</span>
                <h1 className="heading-display text-white mt-2 mb-6">Completed Projects</h1>
                <p className="text-xl text-white/80">
                  A showcase of our infrastructure projects delivered across Odisha
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ParallaxBackground>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Category Filter */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-6 py-2.5 rounded-full font-medium transition-all duration-200',
                    activeCategory === category
                      ? 'bg-primary text-white scale-105'
                      : 'bg-grey-lighter text-foreground hover:bg-primary/10 hover:scale-105'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-primary">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-lg font-medium">Loading portfolio...</p>
            </div>
          )}

          {/* Stats Bar */}
          <ScrollReveal>
            <div className="bg-grey-lighter rounded-xl p-6 mb-12 card-glow">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">{filteredProjects.length}</p>
                  <p className="text-muted-foreground text-sm">Projects Shown</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {projects.filter(p => p.category === 'Bridges').length}
                  </p>
                  <p className="text-muted-foreground text-sm">Bridge Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {projects.filter(p => p.category === 'Roads').length}
                  </p>
                  <p className="text-muted-foreground text-sm">Road Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {projects.filter(p => p.category === 'Buildings').length}
                  </p>
                  <p className="text-muted-foreground text-sm">Building Projects</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 50}>
                <div className="card-project h-full flex flex-col">
                  <ImageCard src={project.image} alt={project.title} />

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full",
                        project.status === 'Completed'
                          ? "bg-green-light/10 text-green-light"
                          : "bg-orange-500/10 text-orange-600"
                      )}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        {project.department}
                      </div>
                    </div>
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
              <h2 className="heading-section mb-4">Have a Project in Mind?</h2>
              <p className="text-muted-foreground mb-8">
                Partner with us for your next infrastructure project
              </p>
              <a
                href="/contact"
                className="btn-primary inline-block"
              >
                Get in Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Projects;
