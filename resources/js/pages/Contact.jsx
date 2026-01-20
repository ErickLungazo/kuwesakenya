import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

export default function Contact() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send email to Kuwesa
            await base44.integrations.Core.SendEmail({
                from_name: "Kuwesa Website Contact Form",
                to: "kuwesakenya@gmail.com",
                subject: `Website Contact: ${formData.subject}`,
                body: `
New contact form submission from Kuwesa website:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent via Kuwesa Website Contact Form
                `,
            });

            // Send confirmation to user
            await base44.integrations.Core.SendEmail({
                from_name: "Kuwesa",
                to: formData.email,
                subject: "Thank You for Contacting Kuwesa",
                body: `
Dear ${formData.name},

Thank you for reaching out to Kuwesa! We have received your message and will respond as soon as possible.

Here's a copy of your message:
"${formData.message}"

We typically respond within 24-48 hours. For urgent matters, you can also reach us directly at 011-254-727 640 569.

Best regards,
The Kuwesa Team

---
P.O BOX 5, KAIMOSI, KENYA
Phone: 011-254-727 640 569
Email: kuwesakenya@gmail.com
Website: www.kuwesakenya.com
                `,
            });

            toast({
                title: "Message sent successfully!",
                description: "We've sent a confirmation email to your inbox.",
                variant: "success",
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Contact form error:", error);
            toast({
                title: "Error sending message",
                description:
                    "Please try again or contact us directly via email or phone.",
                variant: "destructive",
            });
        }

        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            title: "Kenya Office",
            gradient: "from-green-600 to-green-700",
            iconColor: "text-green-600",
            items: [
                {
                    icon: MapPin,
                    title: "Primary Business Address",
                    content: ["P.O BOX 5, - (50309)", "KAIMOSI, KENYA"],
                },
                {
                    icon: Phone,
                    title: "Phone",
                    content: ["011-254-727 640 569"],
                },
                {
                    icon: Mail,
                    title: "Email",
                    content: ["kuwesakenya@gmail.com"],
                    isLink: true,
                    href: "mailto:kuwesakenya@gmail.com",
                },
                {
                    icon: Globe,
                    title: "Website",
                    content: ["www.kuwesakenya.com"],
                    isLink: true,
                    href: "http://www.kuwesakenya.com",
                    target: "_blank",
                },
            ],
        },
        {
            title: "USA Office",
            gradient: "from-yellow-500 to-yellow-600",
            textColor: "text-gray-900",
            iconColor: "text-yellow-600",
            items: [
                {
                    icon: MapPin,
                    title: "Mailing Address",
                    content: [
                        "Kuwesa",
                        "17 Palm Court",
                        "Brooklyn, New York 11225",
                    ],
                },
            ],
            note: {
                content:
                    "Kuwesa is a United States 501(c)(3) Organization and a Kenyan Community Based Organization",
                style: "bg-blue-50 border-blue-200 text-blue-900",
            },
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 px-4 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-green-100 opacity-90">
                        Have questions about our mission, products, or
                        donations? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 px-4 -mt-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {contactInfo.map((office, index) => (
                            <Card
                                key={index}
                                className="shadow-lg border-0 overflow-hidden"
                            >
                                <CardHeader
                                    className={`bg-gradient-to-r ${office.gradient} ${office.textColor || "text-white"} p-6`}
                                >
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <MapPin className="w-6 h-6" />
                                        {office.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    {office.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="flex items-start gap-4"
                                        >
                                            <item.icon
                                                className={`w-5 h-5 ${office.iconColor} mt-1 flex-shrink-0`}
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 mb-1">
                                                    {item.title}
                                                </p>
                                                {item.content.map(
                                                    (line, lineIndex) => (
                                                        <p
                                                            key={lineIndex}
                                                            className="text-gray-600"
                                                        >
                                                            {item.isLink ? (
                                                                <a
                                                                    href={
                                                                        item.href
                                                                    }
                                                                    target={
                                                                        item.target
                                                                    }
                                                                    rel={
                                                                        item.target
                                                                            ? "noopener noreferrer"
                                                                            : ""
                                                                    }
                                                                    className="hover:underline transition-colors"
                                                                >
                                                                    {line}
                                                                </a>
                                                            ) : (
                                                                line
                                                            )}
                                                        </p>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {office.note && (
                                        <div
                                            className={`border rounded-lg p-4 mt-4 ${office.note.style}`}
                                        >
                                            <p className="text-sm font-medium">
                                                {office.note.content}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <Card className="shadow-xl border-0 max-w-3xl mx-auto">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl md:text-3xl text-gray-900">
                                Send Us a Message
                            </CardTitle>
                            <p className="text-gray-600 mt-2">
                                Fill out the form below and we'll get back to
                                you within 24 hours.
                            </p>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-gray-700"
                                        >
                                            Your Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="John Doe"
                                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-gray-700"
                                        >
                                            Your Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="john@example.com"
                                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="subject"
                                        className="text-gray-700"
                                    >
                                        Subject *
                                    </Label>
                                    <Input
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "subject",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="How can we help you?"
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="message"
                                        className="text-gray-700"
                                    >
                                        Message *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        required
                                        value={formData.message}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "message",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Tell us more about your inquiry..."
                                        rows={6}
                                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-vertical"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-6 text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending Message...
                                        </div>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>

                                <p className="text-sm text-gray-500 text-center">
                                    We respect your privacy and will never share
                                    your information with third parties.
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Quick Contact Banner */}
            <section className="bg-green-600 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Prefer to Call Us?
                    </h2>
                    <p className="text-lg text-green-100 mb-6">
                        We're available to answer your questions directly
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="tel:+254727640569"
                            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                        >
                            Call Kenya: +254 727 640 569
                        </a>
                        <a
                            href="mailto:kuwesakenya@gmail.com"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
