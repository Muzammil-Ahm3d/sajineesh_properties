import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Lock, LogOut, CheckCircle2, History, ExternalLink as ExternalLinkIcon, Trash2, PencilLine, ShieldCheck, AlertTriangle } from 'lucide-react';
import { CMS_URL } from '@/config';
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

    // Diagnostic states
    const [diagInfo, setDiagInfo] = useState<any>(null);

    // Fetch latest posts
    const { data: recentPosts, refetch } = useQuery({
        queryKey: ['adminRecentPosts'],
        queryFn: async () => {
            const response = await fetch(`${CMS_URL}/wp-json/wp/v2/posts?_embed&per_page=10`);
            return response.json();
        }
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsLoggedIn(true);
            toast({ title: "Welcome back!", description: "Professional dashboard active." });
        } else {
            toast({ title: "Access Denied", description: "Incorrect password.", variant: "destructive" });
        }
    };

    const runDiagnostics = async () => {
        setIsLoading(true);
        setDiagInfo("Running checks...");
        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');

            // 1. Check User Identity
            const userRes = await fetch(`${CMS_URL}/wp-json/wp/v2/users/me?context=edit`, {
                headers: { 'Authorization': authHeader }
            });
            const userData = await userRes.json();

            // 2. Test specific capabilities by looking at the user object
            const isUserAdmin = userData.roles?.includes('administrator');
            const roleListing = userData.roles?.join(', ') || "No roles found (Restricted View)";

            // 3. Check for specific API settings
            const apiRes = await fetch(`${CMS_URL}/wp-json/`);
            const apiData = await apiRes.json();

            let message = `USER INFO:\n- Account: ${userData.name}\n- Roles: ${roleListing}\n\n`;

            if (!isUserAdmin) {
                message += `⚠️ WARNING: This account is NOT an Administrator.\nIt might lack 'edit_others_posts' or 'delete_posts' capabilities.\n\n`;
            } else {
                message += `✅ SUCCESS: Account is an Administrator.\n\n`;
            }

            message += `SERVER INFO:\n- Site: ${apiData.name}\n- API Level: ${apiData.namespaces?.includes('wp/v2') ? 'v2 Ready' : 'v2 Missing'}\n\n`;
            message += `ACTION REQUIRED:\nIf you see 'undefined' or 'No roles found', please ask your IT/WordPress manager to ensure this specific email is set to the 'Administrator' role.`;

            setDiagInfo(message);
        } catch (e) {
            setDiagInfo('Connection failed. This usually means a firewall (CORS) or an incorrect CMS URL is blocking the request.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        setIsLoading(true);
        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');

            // Most compatible way: POST with _method override
            const response = await fetch(`${CMS_URL}/wp-json/wp/v2/posts/${id}?_method=DELETE`, {
                method: 'POST',
                headers: { 'Authorization': authHeader }
            });

            if (response.ok) {
                toast({ title: "Success", description: "Post removed from site." });
                refetch();
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Server rejected deletion');
            }
        } catch (error) {
            toast({
                title: "Delete Failed",
                description: error instanceof Error ? error.message : "Error",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || (!file && !editId)) return;

        setIsLoading(true);
        setUploadProgress(10);

        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');
            let mediaId = existingMediaId;

            // Media upload
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
                if (!mediaResponse.ok) throw new Error('Media upload failed');
                const mediaData = await mediaResponse.json();
                mediaId = mediaData.id;
                setUploadProgress(60);
            }

            const meta = { location, status, type: postType, category: projectCategory };
            const metaContent = `<!-- PROJECT_META: ${JSON.stringify(meta)} -->\n${description}`;

            // Official WP API: POST to the ID url is the correct way to Update!
            const url = editId ? `${CMS_URL}/wp-json/wp/v2/posts/${editId}` : `${CMS_URL}/wp-json/wp/v2/posts`;

            const postResponse = await fetch(url, {
                method: 'POST',
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
                throw new Error(errorData.message || 'Failed to save post');
            }

            setUploadProgress(100);
            toast({ title: editId ? "Updated!" : "Published!", description: "Changes are live." });
            cancelEdit();
            refetch();
        } catch (error) {
            toast({ title: "Error", description: error instanceof Error ? error.message : "Failed", variant: "destructive" });
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
        }
    };

    const startEdit = (post: any) => {
        setEditId(post.id);
        setTitle(post.title.rendered);
        setExistingMediaId(post.featured_media);
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
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditId(null);
        setExistingMediaId(null);
        setTitle('');
        setDescription('');
        setFile(null);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-grey-lighter px-4 pt-32">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                        <CardTitle>Client Admin</CardTitle>
                        <CardDescription>Enter password to manage updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grey-lighter pt-40 pb-12 px-4 transition-all duration-300">
            <div className="container max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Portal</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={runDiagnostics} disabled={isLoading}>
                            <ShieldCheck className="w-4 h-4 mr-1" /> Check Perms
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                            <LogOut className="w-4 h-4 mr-1" /> Logout
                        </Button>
                    </div>
                </div>

                {diagInfo && (
                    <Card className="mb-6 border-blue-200 bg-blue-50/80 backdrop-blur shadow-sm animate-in fade-in slide-in-from-top-4">
                        <CardContent className="pt-4 py-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div className="space-y-2 flex-grow">
                                    <pre className="text-xs text-blue-800 whitespace-pre-wrap font-mono leading-relaxed">{diagInfo}</pre>
                                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 underline" onClick={() => setDiagInfo(null)}>Close Diagnostic Result</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="mb-12 shadow-xl border-none ring-1 ring-black/5 overflow-hidden">
                    <div className="h-2 bg-primary" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {editId ? <PencilLine className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                            {editId ? 'Editing Post' : 'New Update'}
                        </CardTitle>
                        <CardDescription>
                            {editId ? `Updating Post ID: ${editId}` : 'Publish images or projects to the live site'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Post Location</Label>
                                    <select
                                        className="w-full border rounded-md h-10 px-2 bg-white"
                                        value={postType}
                                        onChange={(e) => setPostType(e.target.value as any)}
                                    >
                                        <option value="gallery">Gallery Update (Weekly)</option>
                                        <option value="project">Full Project (Permanent)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        placeholder="e.g. Bridge Progress"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {postType === 'project' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="space-y-2">
                                        <Label>Project Location</Label>
                                        <Input placeholder="City, State" value={location} onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <select
                                            className="w-full border rounded-md h-10 px-2 bg-white"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value as any)}
                                        >
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="Write a short update..."
                                    className="min-h-[120px]"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div
                                className="border-2 border-dashed p-8 text-center rounded-xl bg-grey-lighter/50 hover:bg-grey-lighter transition-colors cursor-pointer"
                                onClick={() => document.getElementById('file-upload')?.click()}
                            >
                                <input type="file" id="file-upload" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                                        <p className="text-primary font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                        <p className="text-sm font-medium">Select Image or Video</p>
                                        <p className="text-xs text-muted-foreground mt-1 italic">Necessary for new posts</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button type="submit" className="w-full text-lg font-bold h-12" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin w-5 h-5" />
                                            {uploadProgress > 0 ? `Syncing (${uploadProgress}%)` : 'Processing...'}
                                        </div>
                                    ) : (
                                        editId ? 'Save All Changes' : 'Publish Post Now'
                                    )}
                                </Button>
                                {editId && (
                                    <Button variant="outline" className="w-full" onClick={cancelEdit}>
                                        Cancel & Go Back
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <History className="text-primary w-5 h-5" />
                        <h2 className="font-bold text-xl">Recent Activity</h2>
                    </div>
                    {recentPosts?.map((post: any) => (
                        <Card key={post.id} className="shadow-sm border-grey-lighter hover:border-primary/20 transition-all overflow-hidden">
                            <CardContent className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="w-14 h-14 bg-grey-lighter rounded flex-shrink-0 overflow-hidden">
                                        <img
                                            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p
                                            className="font-bold text-foreground line-clamp-1 h-6"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-bold">ID: {post.id}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary rounded-full transition-all" onClick={() => startEdit(post)}>
                                        <PencilLine className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="hover:bg-red-50 hover:text-red-500 rounded-full transition-all" onClick={() => handleDelete(post.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <a href={`${CMS_URL}/?p=${post.id}`} target="_blank" rel="noreferrer">
                                        <Button size="icon" variant="ghost" className="hover:bg-grey-lighter rounded-full transition-all">
                                            <ExternalLinkIcon className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {recentPosts?.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed rounded-xl">
                            <p className="text-muted-foreground">No posts found on server.</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                    Connected to {CMS_URL.replace('https://', '')}
                </div>
            </div>
        </div>
    );
};

export default Admin;
