import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
    Droplets,
    Heart,
    ShoppingBag,
    Users,
    Award,
    TrendingDown,
    Shield,
    Leaf,
    Baby,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const stats = [
        {
            icon: Droplets,
            label: "Clean Water Access",
            value: "600+",
            desc: "Villagers served",
        },
        {
            icon: TrendingDown,
            label: "Toddler Deaths",
            value: "0",
            desc: "Since 2017",
        },
        {
            icon: Users,
            label: "Widows Supported",
            value: "50+",
            desc: "HIV-positive artisans",
        },
        {
            icon: Award,
            label: "Years Impact",
            value: "10+",
            desc: "Of life-saving work",
        },
    ];

    const features = [
        {
            icon: Shield,
            title: "Chemical-Free Purification",
            description:
                "Our bio-sand filters eliminate pathogens without chemicals or fuel, using natural processes of abrasion, darkness, and lack of oxygen.",
        },
        {
            icon: Leaf,
            title: "Environmentally Friendly",
            description:
                "100% gravity-powered systems that protect both people and the planet with zero carbon footprint.",
        },
        {
            icon: Baby,
            title: "Saving Toddlers' Lives",
            description:
                "Dramatic reduction in waterborne diseases has eliminated toddler mortality in our pilot village since 2017.",
        },
    ];

    const impactTimeline = [
        {
            year: "2015",
            event: "Started bio-sand filter distribution to HIV-positive women",
        },
        {
            year: "2016",
            event: "Began pilot program in Maganda village (population 600)",
        },
        {
            year: "2017",
            event: "Achieved zero toddler deaths from malaria for the first time",
        },
        { year: "2025", event: "Celebrating 9 years without toddler deaths" },
        {
            year: "2026",
            event: "Anticipating 10-year milestone of zero toddler mortality",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-[600px] flex items-center justify-center overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, #2d8659 0%, #1f5d3f 100%)",
                }}
            >
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1541960071727-c531398e7494?w=1600)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Safe Water Saves Lives
                        </h1>
                        <p className="text-xl md:text-2xl text-green-100 mb-8">
                            Empowering communities in Western Kenya through
                            clean water and economic opportunity
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={createPageUrl("Donate")}>
                                <Button
                                    size="lg"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-6 text-lg"
                                >
                                    <Heart className="w-5 h-5 mr-2" />
                                    Support Our Mission
                                </Button>
                            </Link>
                            <Link to={createPageUrl("Shop")}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-white/10 border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
                                >
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Shop Handcrafted Items
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative circles */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full opacity-20 blur-3xl" />
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-white -mt-16 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6">
                                        <div
                                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #2d8659, #f4b932)",
                                            }}
                                        >
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-green-700 mb-2">
                                            {stat.value}
                                        </h3>
                                        <p className="font-semibold text-gray-800">
                                            {stat.label}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {stat.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            The Life-Saving Difference
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Bacteria, protozoa, and worms in contaminated water
                            make people sick, malnourished, and anemic. The harm
                            comes mostly to the vulnerable: the aged, those
                            suffering from chronic disease, HIV-positive
                            individuals, and toddlers aged 2-5 years.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="h-full hover:shadow-xl transition-shadow border-0">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <feature.icon className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Our Two-Step Solution
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">
                                            1
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Spring Protection
                                        </h3>
                                        <p className="text-gray-600">
                                            We use gravity to collect clear
                                            spring water directly from hillside
                                            sources. A spring protection
                                            structure dams the spring and forces
                                            clear water through a steel pipe,
                                            eliminating the need for women to
                                            carry water from contaminated
                                            ravines.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold">
                                            2
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Bio-Sand Filtration
                                        </h3>
                                        <p className="text-gray-600">
                                            Bio-sand filters purify the water by
                                            killing pathogens through natural
                                            processes - no chemicals or fuel
                                            required. They eliminate bacteria,
                                            viruses, protozoa, and worms through
                                            abrasion, darkness, and lack of
                                            oxygen.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                <p className="text-lg font-semibold text-yellow-900">
                                    "Before Kuwesa, women spent days settling
                                    and boiling pond water. Now they collect
                                    clean water directly from protected
                                    springs."
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800"
                                alt="Water filtration system"
                                className="rounded-lg shadow-xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg">
                                <p className="text-2xl font-bold">100%</p>
                                <p className="text-sm font-semibold">
                                    Gravity Powered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Timeline */}
            <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-yellow-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        A Decade of Life Saving Impact
                    </h2>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-24 text-right">
                                <Badge className="bg-green-600">2015</Badge>
                            </div>
                            <div className="flex-1 pb-8 border-l-2 border-green-300 pl-8">
                                <h3 className="font-bold text-lg mb-2">
                                    Filter Initiative Launch
                                </h3>
                                <p className="text-gray-700">
                                    Started bio-sand filter distribution to
                                    HIV-positive women.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-24 text-right">
                                <Badge className="bg-green-600">2016</Badge>
                            </div>
                            <div className="flex-1 pb-8 border-l-2 border-green-300 pl-8">
                                <h3 className="font-bold text-lg mb-2">
                                    First Major Success
                                </h3>
                                <p className="text-gray-700">
                                    Achieved zero toddler deaths from malaria
                                    for the first time
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-24 text-right">
                                <Badge className="bg-green-600">2017</Badge>
                            </div>
                            <div className="flex-1 pb-8 border-l-2 border-green-300 pl-8">
                                <h3 className="font-bold text-lg mb-2">
                                    Community Expansion
                                </h3>
                                <p className="text-gray-700">
                                    Started bio-sand filter distribution to
                                    HIV-positive women.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-24 text-right">
                                <Badge className="bg-yellow-500">2025</Badge>
                            </div>
                            <div className="flex-1 pb-8 border-l-2 border-yellow-300 pl-8">
                                <h3 className="font-bold text-lg mb-2">
                                    9-Year Celebration
                                </h3>
                                <p className="text-gray-700">
                                    <strong>Zero toddler deaths</strong>{" "}
                                    Celebrating 9 years without toddler deaths
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-24 text-right">
                                <Badge className="bg-yellow-500">2026</Badge>
                            </div>
                            <div className="flex-1 pl-8">
                                <h3 className="font-bold text-lg mb-2">
                                    Decade of Impact
                                </h3>
                                <p className="text-gray-700">
                                    Anticipating 10-year milestone of zero
                                    toddler mortality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Results Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Remarkable Results in Maganda Village
                            </h2>

                            <div className="space-y-4 mb-6">
                                <p className="text-lg text-gray-600">
                                    Our pilot village of 600 people has achieved
                                    something extraordinary:
                                    <strong className="text-green-600">
                                        {" "}
                                        zero toddler deaths from malaria for 9
                                        consecutive years
                                    </strong>
                                    .
                                </p>

                                <p className="text-lg text-gray-600">
                                    This is particularly significant because in
                                    Kenya, 15% of babies born alive did not make
                                    it to their 5th birthday before our
                                    intervention.
                                </p>

                                <p className="text-lg text-gray-600">
                                    The success is maintained by dedicated
                                    Community Health Workers and community
                                    members who ensure consistent use of safe
                                    water, protecting the most vulnerable from
                                    waterborne diseases.
                                </p>
                            </div>

                            <Link to={createPageUrl("Impact")}>
                                <Button
                                    size="lg"
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Read More Impact Stories
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
                            <div className="text-6xl font-bold mb-4">0</div>
                            <div className="text-2xl font-semibold mb-2">
                                Toddler Deaths
                            </div>
                            <div className="text-green-100">
                                Since 2017 in Maganda Village
                            </div>
                            <div className="mt-6 text-lg">
                                From 2-6 deaths annually to zero for 9 years
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Empowerment */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800"
                                alt="Women crafting together"
                                className="rounded-lg shadow-xl"
                            />
                        </div>

                        <div className="order-1 md:order-2">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Economic Empowerment
                            </h2>
                            <p className="text-lg text-gray-600 mb-4">
                                Kuwesa supports HIV-positive widows through
                                fabric craft programs, providing sustainable
                                income while they create beautiful handmade
                                products sold internationally.
                            </p>
                            <p className="text-lg text-gray-600 mb-4">
                                The bio-sand filters are made by a group of
                                HIV-positive men, creating employment and
                                dignity while saving lives.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                Every purchase from our shop directly supports
                                these artisans and funds our water purification
                                projects.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={createPageUrl("Shop")}>
                                    <Button
                                        size="lg"
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Shop Artisan Products
                                    </Button>
                                </Link>
                                <Link to={createPageUrl("Mission")}>
                                    <Button size="lg" variant="outline">
                                        Learn About Our Programs
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop Preview */}
            <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-yellow-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Shop With Purpose
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Every purchase supports HIV-positive widows in Kenya and
                        funds our clean water projects
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                            <img
                                src="https://images.unsplash.com/photo-1595341595112-6add1c9c19eb?w=400"
                                alt="Handmade quilts"
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    Crazy Quilt Patchwork
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Beautiful handcrafted quilts made with love
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                            <img
                                src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400"
                                alt="African beads"
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    African Fabric Beads
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Unique jewelry from recycled fabrics
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                            <img
                                src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400"
                                alt="Handmade bags"
                                className="w-full h-48 object-cover"
                            />
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    Handcrafted Accessories
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Bags, home decor, and more
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <Link to={createPageUrl("Shop")}>
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Browse All Products
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-20 px-4 bg-green-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Join Us in Saving Lives
                    </h2>
                    <p className="text-xl mb-8 text-green-100">
                        Your contribution helps provide clean water and economic
                        empowerment to communities in Kenya
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={createPageUrl("Donate")}>
                            <Button
                                size="lg"
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                            >
                                <Heart className="w-5 h-5 mr-2" />
                                Make a Donation
                            </Button>
                        </Link>
                        <Link to={createPageUrl("Impact")}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 border-white text-white hover:bg-white/20"
                            >
                                Read Impact Stories
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 p-6 bg-white/10 rounded-lg">
                        <p className="text-lg mb-2">
                            <strong>
                                Kuwesa is a US 501(c)(3) tax-exempt organization
                                and a Kenyan Community Based Organization
                            </strong>
                        </p>
                        <p className="text-green-100">
                            Contributions can be made through our website or by
                            mail to: Kuwesa, 17 Palm Court, Brooklyn, New York
                            11225
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
