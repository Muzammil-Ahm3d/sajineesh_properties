import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Lock, LogOut, CheckCircle2, History, ExternalLink as ExternalLinkIcon, Trash2, PencilLine, AlertCircle, ShieldCheck } from 'lucide-react';
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

    // Diagnostic states
    const [diagInfo, setDiagInfo] = useState<string | null>(null);

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
        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');
            const response = await fetch(`${CMS_URL}/wp-json/wp/v2/users/me`, {
                headers: { 'Authorization': authHeader }
            });
            const data = await response.json();

            if (response.ok) {
                setDiagInfo(`Connected as: ${data.name}\nRoles: ${data.roles?.join(', ')}\nCapabilities: ${data.capabilities ? Object.keys(data.capabilities).filter(k => data.capabilities[k]).slice(0, 5).join(', ') + '...' : 'Unknown'}`);
            } else {
                setDiagInfo(`Error: ${data.message || 'Unknown response'}`);
            }
        } catch (e) {
            setDiagInfo('Connection failed. Check CMS_URL and Internet.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        setIsLoading(true);
        try {
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');

            // Try standard DELETE first
            const response = await fetch(`${CMS_URL}/wp-json/wp/v2/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': authHeader }
            });

            if (response.ok) {
                toast({ title: "Success", description: "Post removed." });
                refetch();
            } else {
                // Try override if standard fails
                const retry = await fetch(`${CMS_URL}/wp-json/wp/v2/posts/${id}?_method=DELETE`, {
                    method: 'POST',
                    headers: { 'Authorization': authHeader }
                });

                if (retry.ok) {
                    toast({ title: "Success", description: "Post removed via override." });
                    refetch();
                } else {
                    const error = await retry.json();
                    throw new Error(error.message || 'Server rejected deletion');
                }
            }
        } catch (error) {
            toast({ title: "Delete Failed", description: error instanceof Error ? error.message : "Error", variant: "destructive" });
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

            // Check if we use ?_method=PUT for updates
            const url = editId ? `${CMS_URL}/wp-json/wp/v2/posts/${editId}` : `${CMS_URL}/wp-json/wp/v2/posts`;
            const method = editId ? 'POST' : 'POST';
            const finalUrl = editId ? `${url}?_method=PUT` : url;

            const postResponse = await fetch(finalUrl, {
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
        setTitle('');
        setDescription('');
        setFile(null);
        setExistingMediaId(null);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-grey-lighter px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                        <CardTitle>Client Admin</CardTitle>
                        <CardDescription>Secure Dashboard Access</CardDescription>
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
        <div className="min-h-screen bg-grey-lighter py-12 px-4">
            <div className="container max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Portal</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={runDiagnostics}>
                            <ShieldCheck className="w-4 h-4 mr-1" /> Check Perms
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                            <LogOut className="w-4 h-4 mr-1" /> Logout
                        </Button>
                    </div>
                </div>

                {diagInfo && (
                    <Card className="mb-6 border-blue-200 bg-blue-50">
                        <CardContent className="pt-4 py-4">
                            <pre className="text-xs text-blue-800 whitespace-pre-wrap">{diagInfo}</pre>
                            <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-blue-600" onClick={() => setDiagInfo(null)}>Close Info</Button>
                        </CardContent>
                    </Card>
                )}

                <Card className="mb-12 shadow-xl border-none">
                    <CardHeader>
                        <CardTitle>{editId ? 'Editing Post' : 'New Update'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <select className="w-full border rounded-md h-10 px-2" value={postType} onChange={(e) => setPostType(e.target.value as any)}>
                                        <option value="gallery">Gallery Update</option>
                                        <option value="project">Full Project</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                            </div>

                            {postType === 'project' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                    <select className="border rounded-md px-2" value={status} onChange={(e) => setStatus(e.target.value as any)}>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            )}

                            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <div className="border-2 border-dashed p-8 text-center rounded-xl bg-grey-lighter/30" onClick={() => document.getElementById('file-upload')?.click()}>
                                <input type="file" id="file-upload" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                {file ? <p className="text-primary font-medium">{file.name}</p> : <div className="flex flex-col items-center"><Upload className="w-8 h-8 text-primary mb-2" /><p className="text-sm text-muted-foreground italic">Click to upload media</p></div>}
                            </div>

                            <Button type="submit" className="w-full text-lg font-bold h-12" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : (editId ? 'Update Post' : 'Publish Post')}
                            </Button>
                            {editId && <Button variant="ghost" className="w-full" onClick={cancelEdit}>Cancel Edit</Button>}
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center gap-2"><History className="text-primary" /><h2 className="font-bold text-xl">Recent Activity</h2></div>
                    {recentPosts?.map((post: any) => (
                        <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} className="w-12 h-12 object-cover rounded" />
                                <div>
                                    <p className="font-bold line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                    <span className="text-[10px] bg-grey-lighter px-2 py-0.5 rounded-full uppercase font-bold text-muted-foreground">Post ID: {post.id}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost" onClick={() => startEdit(post)}><PencilLine className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(post.id)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
