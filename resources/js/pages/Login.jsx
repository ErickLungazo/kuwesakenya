import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await login(email, password);
            toast({ description: "Welcome back!" });
            navigate("/");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else if (error.response?.status === 401) {
                setErrors({ email: ["Invalid credentials."] });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <Card className="max-w-md w-full shadow-lg border border-gray-200">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your email below to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            Sign in
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="font-medium text-green-600 hover:text-green-500"
                        >
                            Sign up
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
