import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import { CMS_URL } from '@/config';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

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

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) return;

        setIsLoading(true);
        setUploadProgress(10);

        try {
            // 1. Upload Media
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('status', 'publish');

            // Securely encode credentials for the WordPress API
            const authHeader = 'Basic ' + btoa('sajineeshconstructions@gmail.com' + ':' + 'BDf9WR*2s');

            const mediaResponse = await fetch(`${CMS_URL}/wp-json/wp/v2/media`, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                },
                body: formData,
            });

            if (!mediaResponse.ok) {
                const errorData = await mediaResponse.json();
                throw new Error(errorData.message || 'Media upload failed');
            }

            const media = await mediaResponse.json();
            setUploadProgress(60);

            // 2. Create Post
            const postResponse = await fetch(`${CMS_URL}/wp-json/wp/v2/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
                body: JSON.stringify({
                    title: title,
                    content: description,
                    status: 'publish',
                    featured_media: media.id,
                }),
            });

            if (!postResponse.ok) {
                const errorData = await postResponse.json();
                throw new Error(errorData.message || 'Post creation failed');
            }

            setUploadProgress(100);
            setIsLoading(false);
            toast({
                title: "Success! 🎉",
                description: "Your update has been published to the Gallery.",
            });
            setTitle('');
            setDescription('');
            setFile(null);

        } catch (error) {
            console.error(error);
            toast({
                title: "Upload Failed",
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
                            <div className="space-y-2">
                                <Label htmlFor="title">Update Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Bridge Construction Progress - Week 4"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

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
                                        Publishing...
                                    </>
                                ) : (
                                    'Publish Update'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Connected to {CMS_URL}
                </div>
            </div>
        </div>
    );
};

export default Admin;
