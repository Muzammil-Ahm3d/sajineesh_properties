import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '@/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { GlowCard } from '@/components/GlowCard';
import { MapPin, Play, Image as ImageIcon, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/config';
import bgInfrastructure from '@/assets/bg-infrastructure.jpg';

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

const categories = ['All', 'Ongoing', 'Completed', 'Videos'];

const Gallery = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const { data: wpPosts, isLoading, isError, error } = useQuery({
        queryKey: ['wpPosts'],
        queryFn: async () => {
            try {
                // Reduced from 20 to 12 for speed
                const response = await fetch(`${API_URL}/posts?_embed&per_page=12`, {
                    signal: AbortSignal.timeout(8000) // 8 second timeout
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('UNAUTHORIZED_API');
                    }
                    const errBody = await response.text();
                    console.error("WP API ERROR:", response.status, errBody);
                    throw new Error(`Server returned ${response.status}`);
                }
                return response.json() as Promise<WordPressPost[]>;
            } catch (err: any) {
                console.error("FETCH FAILED:", err.message);
                throw err;
            }
        },
        retry: 2,
        staleTime: 1000 * 60 * 5, // Cache for 5 mins
    });

    const dynamicItems = (wpPosts || []).map((post) => {
        const content = post.content.rendered;
        const metaMatch = content.match(/<!-- PROJECT_META: (.*) -->/);
        let meta = { location: 'Site Update', status: 'Completed', type: 'gallery' };

        if (metaMatch && metaMatch[1]) {
            try {
                meta = JSON.parse(metaMatch[1]);
            } catch (e) {
                console.error("Failed to parse meta", e);
            }
        }

        return {
            id: `wp-${post.id}`,
            title: post.title.rendered,
            location: meta.location || 'Site Update',
            status: meta.status as any || 'Completed',
            type: (meta.type === 'video' ? 'video' : 'image') as any, // Simple mapping
            thumbnail: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg',
            description: content.replace(/<[^>]*>?/gm, '').split('-->').pop()?.substring(0, 150).trim() + '...',
            isDynamic: true,
            metaType: meta.type // Keep track if it's a gallery or project type
        };
    }).filter(item => item.metaType !== 'project'); // In Gallery, show only updates. Projects go to Projects page.

    const allItems = [...dynamicItems, ...projectsData];

    const filteredItems = allItems.filter((item) => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Videos') return item.type === 'video' || (item as any).galleryVideos?.length > 0;
        return (item as any).status === activeFilter;
    });

    return (
        <div className="min-h-screen">
            {/* Hero Section with Parallax */}
            <ParallaxBackground imageSrc={bgInfrastructure} overlayOpacity={0.85}>
                <section className="py-32 pt-40">
                    <div className="container-wide section-padding">
                        <ScrollReveal>
                            <div className="text-center max-w-3xl mx-auto">
                                <span className="text-white/70 font-semibold">Project Showcase</span>
                                <h1 className="heading-display text-white mt-2 mb-6">Our Gallery</h1>
                                <p className="text-xl text-white/80">
                                    Visual highlights of our infrastructure milestones across Odisha
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </ParallaxBackground>

            {/* Gallery Section */}
            <section className="section-padding">
                <div className="container-wide">
                    {/* Filters */}
                    <ScrollReveal>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={cn(
                                        'px-6 py-2.5 rounded-full font-medium transition-all duration-200',
                                        activeFilter === category
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
                            <p className="text-lg font-medium">Fetching latest updates...</p>
                        </div>
                    )}

                    {isError && (
                        <div className="container-wide mb-8">
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-center">
                                <p className="font-semibold">
                                    {error instanceof Error && error.message === 'UNAUTHORIZED_API'
                                        ? "Action Required: WordPress API is protected. Please uncheck 'wp/v2/posts' in miniOrange settings."
                                        : "Could not load the latest updates. Showing archived projects."
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                    {/* Grid */}
                    {!isLoading && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map((item, index) => (
                                <ScrollReveal key={item.id} delay={index * 50}>
                                    <Link to={(item as any).isDynamic ? '#' : `/gallery/${item.id}`} className={cn("block h-full group", (item as any).isDynamic && "cursor-default")}>
                                        <GlowCard className="h-full flex flex-col overflow-hidden bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                                            <div className="relative aspect-video overflow-hidden">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                                                {/* Status Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className={cn(
                                                        "px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-sm border",
                                                        (item as any).isDynamic
                                                            ? "bg-primary/90 text-white border-primary-foreground/20"
                                                            : item.status === 'Ongoing'
                                                                ? "bg-orange-500/90 text-white border-orange-400"
                                                                : "bg-green-600/90 text-white border-green-500"
                                                    )}>
                                                        {(item as any).isDynamic ? 'Latest Update' : item.status}
                                                    </span>
                                                </div>

                                                {/* Type Icon */}
                                                <div className="absolute top-4 left-4 bg-black/40 p-1.5 rounded-full backdrop-blur-sm text-white/90">
                                                    {item.type === 'video' ? <Play className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                                </div>

                                                {/* Click Indicator */}
                                                {!(item as any).isDynamic && (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/20">
                                                        <span className="bg-white/90 text-primary px-4 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                            View Gallery <ExternalLink className="w-4 h-4" />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3
                                                    className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                                                    title={item.title}
                                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                                />
                                                <div className="mt-auto flex items-start gap-2 text-muted-foreground text-sm">
                                                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                    <span className="line-clamp-2">{item.location}</span>
                                                </div>
                                                {(item as any).isDynamic && (
                                                    <p className="mt-3 text-sm text-foreground/70 line-clamp-3 italic">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </GlowCard>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p>No items found for this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Gallery;
