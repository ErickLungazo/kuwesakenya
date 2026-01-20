import React, { useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Droplets, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Donate() {
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        donor_name: "",
        donor_email: "",
        amount: "",
        customAmount: "",
        message: "",
        donation_type: "general",
        anonymous: false,
    });

    const suggestedAmounts = [25, 50, 100, 250, 500];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const finalAmount =
                formData.amount === "custom"
                    ? parseFloat(formData.customAmount)
                    : parseFloat(formData.amount);

            if (!finalAmount || finalAmount <= 0) {
                toast({
                    title: "Invalid amount",
                    description: "Please enter a valid donation amount.",
                    variant: "destructive",
                });
                setIsProcessing(false);
                return;
            }

            const donationData = {
                donor_name: formData.donor_name,
                donor_email: formData.donor_email,
                amount: finalAmount,
                message: formData.message,
                donation_type: formData.donation_type,
                anonymous: formData.anonymous,
            };

            await axios.post("/api/donations", donationData);

            toast({
                title: "Thank you for your donation!",
                description: "We have received your donation.",
            });

            // Reset form
            setFormData({
                donor_name: "",
                donor_email: "",
                amount: "",
                customAmount: "",
                message: "",
                donation_type: "general",
                anonymous: false,
            });
        } catch (error) {
            toast({
                title: "Error processing donation",
                description: "Please try again or contact us directly.",
                variant: "destructive",
            });
        }

        setIsProcessing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section
                className="relative py-20 px-4"
                style={{
                    background:
                        "linear-gradient(135deg, #2d8659 0%, #f4b932 100%)",
                }}
            >
                <div className="max-w-4xl mx-auto text-center text-white">
                    <Heart className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-5xl font-bold mb-6">
                        Support Our Mission
                    </h1>
                    <p className="text-xl text-white/90">
                        Your contribution provides clean water and empowers
                        communities in Kenya
                    </p>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-12 px-4 -mt-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6 text-center">
                                <Droplets className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    $100
                                </h3>
                                <p className="text-gray-600">
                                    Provides one bio-sand filter for a family
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6 text-center">
                                <Filter className="w-12 h-12 mx-auto mb-4 text-green-600" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    $500
                                </h3>
                                <p className="text-gray-600">
                                    Supports spring protection construction
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6 text-center">
                                <Heart className="w-12 h-12 mx-auto mb-4 text-red-600" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Any Amount
                                </h3>
                                <p className="text-gray-600">
                                    Makes a meaningful difference
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Donation Form */}
            <section className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Make Your Donation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Donor Information */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">
                                        Your Information
                                    </h3>
                                    <div>
                                        <Label htmlFor="donor_name">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="donor_name"
                                            required
                                            value={formData.donor_name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "donor_name",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="donor_email">
                                            Email *
                                        </Label>
                                        <Input
                                            id="donor_email"
                                            type="email"
                                            required
                                            value={formData.donor_email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "donor_email",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Donation Type */}
                                <div className="space-y-3">
                                    <Label>Donation Type</Label>
                                    <RadioGroup
                                        value={formData.donation_type}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "donation_type",
                                                value,
                                            )
                                        }
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="general"
                                                id="general"
                                            />
                                            <Label
                                                htmlFor="general"
                                                className="font-normal cursor-pointer"
                                            >
                                                General Support
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="water_project"
                                                id="water"
                                            />
                                            <Label
                                                htmlFor="water"
                                                className="font-normal cursor-pointer"
                                            >
                                                Water Purification Project
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="bio_sand_filter"
                                                id="filter"
                                            />
                                            <Label
                                                htmlFor="filter"
                                                className="font-normal cursor-pointer"
                                            >
                                                Bio-Sand Filters
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="spring_protection"
                                                id="spring"
                                            />
                                            <Label
                                                htmlFor="spring"
                                                className="font-normal cursor-pointer"
                                            >
                                                Spring Protection
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Amount Selection */}
                                <div className="space-y-3">
                                    <Label>Donation Amount *</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {suggestedAmounts.map((amount) => (
                                            <Button
                                                key={amount}
                                                type="button"
                                                variant={
                                                    formData.amount ===
                                                    amount.toString()
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className={
                                                    formData.amount ===
                                                    amount.toString()
                                                        ? "bg-green-600"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleInputChange(
                                                        "amount",
                                                        amount.toString(),
                                                    )
                                                }
                                            >
                                                ${amount}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant={
                                                formData.amount === "custom"
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className={
                                                formData.amount === "custom"
                                                    ? "bg-green-600"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handleInputChange(
                                                    "amount",
                                                    "custom",
                                                )
                                            }
                                        >
                                            Custom
                                        </Button>
                                        {formData.amount === "custom" && (
                                            <Input
                                                type="number"
                                                min="1"
                                                step="0.01"
                                                placeholder="Enter amount"
                                                value={formData.customAmount}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "customAmount",
                                                        e.target.value,
                                                    )
                                                }
                                                className="flex-1"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <Label htmlFor="message">
                                        Message (Optional)
                                    </Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "message",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Share why you're supporting Kuwesa..."
                                        rows={4}
                                    />
                                </div>

                                {/* Anonymous */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="anonymous"
                                        checked={formData.anonymous}
                                        onCheckedChange={(checked) =>
                                            handleInputChange(
                                                "anonymous",
                                                checked,
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="anonymous"
                                        className="font-normal cursor-pointer"
                                    >
                                        Make this donation anonymous
                                    </Label>
                                </div>

                                {/* Tax Info */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-900">
                                        <strong>Tax Deductible:</strong> Kuwesa
                                        is a US 501(c)(3) tax-exempt
                                        organization. Your donation may be
                                        tax-deductible to the extent allowed by
                                        law.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                                    disabled={isProcessing}
                                >
                                    <Heart className="w-5 h-5 mr-2" />
                                    {isProcessing
                                        ? "Processing..."
                                        : "Submit Donation"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Alternative Payment */}
                    <Card className="mt-6">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">
                                Mail Your Donation
                            </h3>
                            <p className="text-gray-700 mb-4">
                                You can also send checks in US dollars to:
                            </p>
                            <div className="bg-gray-50 border rounded-lg p-4">
                                <p className="font-medium">Kuwesa</p>
                                <p className="text-gray-700">17 Palm Court</p>
                                <p className="text-gray-700">
                                    Brooklyn, New York 11225
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
