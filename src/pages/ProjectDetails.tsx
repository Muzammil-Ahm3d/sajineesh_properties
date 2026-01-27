import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { projectsData } from '@/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { MapPin, ArrowLeft, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import bgInfrastructure from '@/assets/bg-infrastructure.jpg';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projectsData.find((p) => p.id === id);

    if (!project) {
        return <Navigate to="/gallery" replace />;
    }

    const hasGallery = (project.galleryImages && project.galleryImages.length > 0) || (project.galleryVideos && project.galleryVideos.length > 0);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <ParallaxBackground imageSrc={bgInfrastructure} overlayOpacity={0.85}>
                <section className="py-32 pt-40">
                    <div className="container-wide section-padding">
                        <ScrollReveal>
                            <div className="max-w-4xl mx-auto">
                                <Link to="/gallery" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Gallery
                                </Link>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={cn(
                                        "px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-sm border",
                                        project.status === 'Ongoing'
                                            ? "bg-orange-500/90 text-white border-orange-400"
                                            : "bg-green-600/90 text-white border-green-500"
                                    )}>
                                        {project.status}
                                    </span>
                                </div>
                                <h1 className="heading-display text-white mb-4">{project.title}</h1>
                                <div className="flex items-center gap-2 text-white/80 text-lg">
                                    <MapPin className="w-5 h-5" />
                                    {project.location}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </ParallaxBackground>

            {/* Content Section */}
            <section className="section-padding">
                <div className="container-wide">
                    {project.description && (
                        <ScrollReveal>
                            <div className="max-w-3xl mb-12">
                                <h2 className="text-2xl font-semibold mb-4 text-primary">Project Overview</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Gallery Grid */}
                    {hasGallery ? (
                        <div className="space-y-12">
                            {/* Videos */}
                            {project.galleryVideos && project.galleryVideos.length > 0 && (
                                <ScrollReveal>
                                    <h3 className="text-xl font-semibold mb-6">Site Videos</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {project.galleryVideos.map((video, idx) => (
                                            <div key={idx} className="rounded-xl overflow-hidden shadow-md bg-black">
                                                <video controls className="w-full h-full aspect-video">
                                                    <source src={video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            )}

                            {/* Images */}
                            {project.galleryImages && project.galleryImages.length > 0 && (
                                <ScrollReveal>
                                    <h3 className="text-xl font-semibold mb-6">Site Photos</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {project.galleryImages.map((img, idx) => (
                                            <div key={idx} className="group rounded-xl overflow-hidden shadow-md cursor-pointer relative aspect-[4/3]">
                                                <img
                                                    src={img}
                                                    alt={`${project.title} - ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>
                    ) : (
                        <ScrollReveal>
                            <div className="bg-muted/30 rounded-xl p-12 text-center">
                                <p className="text-muted-foreground">More detailed gallery images coming soon.</p>
                                <div className="mt-8 max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border border-border">
                                    <img src={project.thumbnail} alt={project.title} className="w-full h-auto" />
                                </div>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;
