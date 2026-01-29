import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Lock, LogOut, CheckCircle2, History, ExternalLink as ExternalLinkIcon, Trash2, PencilLine, X as CloseIcon } from 'lucide-react';
import { CMS_URL, API_URL } from '@/config';
import { useQuery } from '@tanstack/react-query';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postType, setPostType] = useState<'gallery' | 'project'>('gallery');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState<'Ongoing' | 'Completed'>('Ongoing');
    const [projectCategory, setProjectCategory] = useState('Bridges');
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [editId, setEditId] = useState<number | null>(null);
    const [existingMediaId, setExistingMediaId] = useState<number | null>(null);

    // Fetch latest posts to display in admin
    const { data: recentPosts, refetch } = useQuery({
        queryKey: ['adminRecentPosts'],
        queryFn: async () => {
            const response = await fetch(`${CMS_URL}/wp-json/wp/v2/posts?_embed&per_page=5`);
            return response.json();
        }
    });

    // Simple local login for the client
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Suggested default, can be changed
            setIsLoggedIn(true);
            toast({
                title: "Welcome back!",
                description: "You can now post your weekly updates.",
            });
        } else {
            toast({
                title: "Access Denied",
                description: "Incorrect password. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        setIsLoading(true);
        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');
            // Adding force=true is often required to bypass trash and permanently remove
            const response = await fetch(`${CMS_URL}/wp-json/wp/v2/posts/${id}?force=true`, {
                method: 'DELETE',
                headers: { 'Authorization': authHeader }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Delete failed');
            }

            toast({ title: "Deleted", description: "Post removed successfully." });
            refetch();
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete post.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const startEdit = (post: any) => {
        setEditId(post.id);
        setTitle(post.title.rendered);
        setExistingMediaId(post.featured_media);

        // Parse meta
        const metaMatch = post.content.rendered.match(/<!-- PROJECT_META: (.*) -->/);
        if (metaMatch) {
            try {
                const meta = JSON.parse(metaMatch[1]);
                setDescription(post.content.rendered.replace(/<!-- PROJECT_META: .* -->\s*/, '').trim());
                setPostType(meta.type || 'gallery');
                setLocation(meta.location || '');
                setStatus(meta.status || 'Ongoing');
                setProjectCategory(meta.category || 'Bridges');
            } catch (e) { }
        } else {
            setDescription('');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditId(null);
        setExistingMediaId(null);
        setTitle('');
        setDescription('');
        setLocation('');
        setFile(null);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || (!file && !editId)) return;

        setIsLoading(true);
        setUploadProgress(10);

        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');
            let mediaId = existingMediaId;

            // 1. Upload Media (only if a new file is selected)
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('title', title);
                formData.append('status', 'publish');

                const mediaResponse = await fetch(`${CMS_URL}/wp-json/wp/v2/media`, {
                    method: 'POST',
                    headers: { 'Authorization': authHeader },
                    body: formData,
                });

                if (!mediaResponse.ok) {
                    const errorData = await mediaResponse.json();
                    throw new Error(errorData.message || 'Media upload failed');
                }

                const mediaData = await mediaResponse.json();
                mediaId = mediaData.id;
                setUploadProgress(60);
            }

            // 2. Create or Update Post
            const meta = { location, status, type: postType, category: projectCategory };
            const metaContent = `<!-- PROJECT_META: ${JSON.stringify(meta)} -->\n${description}`;

            const url = editId ? `${CMS_URL}/wp-json/wp/v2/posts/${editId}` : `${CMS_URL}/wp-json/wp/v2/posts`;
            const method = editId ? 'PUT' : 'POST';

            const postResponse = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
                body: JSON.stringify({
                    title: title,
                    content: metaContent,
                    status: 'publish',
                    featured_media: mediaId,
                }),
            });

            if (!postResponse.ok) {
                const errorData = await postResponse.json();
                throw new Error(errorData.message || 'Saving failed');
            }

            setUploadProgress(100);
            setIsLoading(false);
            toast({
                title: editId ? "Updated! ✨" : "Success! 🎉",
                description: editId ? "Your changes have been saved." : "Your update has been published.",
            });

            cancelEdit();
            refetch();
        } catch (error) {
            console.error(error);
            toast({
                title: "Operation Failed",
                description: error instanceof Error ? error.message : "Possible connection error.",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-grey-lighter px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-primary w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Client Admin</CardTitle>
                        <CardDescription>Enter your password to manage updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full btn-primary h-11">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grey-lighter py-12 px-4">
            <div className="container max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Weekly Updates</h1>
                        <p className="text-muted-foreground mt-1">Post new images or videos to your gallery</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setIsLoggedIn(false)}
                        className="flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>

                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div className="h-2 bg-primary w-full" />
                    <CardHeader>
                        <CardTitle>Create New Update</CardTitle>
                        <CardDescription>Fill out the fields below to publish a new post</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Post Type</Label>
                                    <div className="flex bg-grey-lighter p-1 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setPostType('gallery')}
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${postType === 'gallery' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}
                                        >
                                            Gallery Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPostType('project')}
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${postType === 'project' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}
                                        >
                                            Full Project
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground/80 mt-1 pl-1 italic">
                                        {postType === 'gallery'
                                            ? "★ Appears in 'Gallery' page as a weekly construction update."
                                            : "★ Appears in 'Projects' page as a permanent portfolio item."}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Update Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Bridge Construction Progress"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {postType === 'project' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Project Location</Label>
                                            <Input
                                                id="location"
                                                placeholder="e.g., Balasore, Odisha"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="item-status">Project Status</Label>
                                            <select
                                                id="item-status"
                                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm cursor-pointer"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value as 'Ongoing' | 'Completed')}
                                            >
                                                <option value="Ongoing">Ongoing</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="project-category">Project Category</Label>
                                        <select
                                            id="project-category"
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm cursor-pointer"
                                            value={projectCategory}
                                            onChange={(e) => setProjectCategory(e.target.value)}
                                        >
                                            <option value="Bridges">Bridges</option>
                                            <option value="Roads">Roads</option>
                                            <option value="Buildings">Buildings</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="desc">Description</Label>
                                <Textarea
                                    id="desc"
                                    placeholder="Tell your clients what happened this week..."
                                    className="min-h-[120px]"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Upload Media (Image or Video)</Label>
                                <div
                                    className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-grey-lighter/50"
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        accept="image/*,video/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                    {file ? (
                                        <div className="flex flex-col items-center">
                                            <CheckCircle2 className="w-10 h-10 text-primary mb-2" />
                                            <p className="font-medium text-foreground">{file.name}</p>
                                            <Button variant="ghost" size="sm" className="mt-2" onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                            }}>Change File</Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                                <Upload className="text-primary w-6 h-6" />
                                            </div>
                                            <p className="text-muted-foreground">
                                                <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground/60 mt-2">
                                                Max file size: 50MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full btn-primary h-12 text-base font-bold"
                                disabled={isLoading || !file || !title}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {editId ? 'Saving Changes...' : 'Publishing...'}
                                    </>
                                ) : (
                                    editId ? 'Save Changes' : 'Publish Update'
                                )}
                            </Button>

                            {editId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-12 mt-2"
                                    onClick={cancelEdit}
                                    disabled={isLoading}
                                >
                                    Cancel & Go Back
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Recent Activity Section */}
                <div className="mt-12">
                    <div className="flex items-center gap-2 mb-4">
                        <History className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">Recent Activity</h2>
                    </div>
                    <div className="space-y-3">
                        {recentPosts?.map((post: any) => {
                            const metaMatch = post.content.rendered.match(/<!-- PROJECT_META: (.*) -->/);
                            let metaType = 'gallery';
                            if (metaMatch) {
                                try { metaType = JSON.parse(metaMatch[1]).type; } catch (e) { }
                            }

                            return (
                                <div key={post.id} className="bg-white p-4 rounded-xl border border-border flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-grey-lighter">
                                            <img
                                                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${metaType === 'project' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                                {metaType === 'project' ? 'Project' : 'Gallery Update'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => startEdit(post)}
                                            className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-colors text-muted-foreground"
                                            title="Edit Post"
                                        >
                                            <PencilLine className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors text-muted-foreground"
                                            title="Delete Post"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={metaType === 'project' ? '/projects' : '/gallery'}
                                            target="_blank"
                                            className="p-2 hover:bg-grey-lighter rounded-full transition-colors"
                                        >
                                            <ExternalLinkIcon className="w-4 h-4 text-muted-foreground" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Connected to {CMS_URL}
                </div>
            </div>
        </div>
    );
};

export default Admin;
