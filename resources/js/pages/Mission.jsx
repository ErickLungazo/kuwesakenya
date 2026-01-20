import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Droplets,
    Wind,
    Shield,
    Users,
    CheckCircle,
    Heart,
    Target,
    ArrowRight,
    MapPin,
    Calendar,
} from "lucide-react";

export default function Mission() {
    const problemStats = [
        {
            number: "15%",
            label: "Child Mortality Rate",
            description:
                "of babies in Kenya didn't reach their 5th birthday before our intervention",
        },
        {
            number: "2-6",
            label: "Annual Toddler Deaths",
            description:
                "in Maganda village from waterborne diseases before 2017",
        },
        {
            number: "3+ hrs",
            label: "Daily Water Collection",
            description:
                "women spent collecting and treating contaminated water",
        },
    ];

    const solutionSteps = [
        {
            step: 1,
            title: "Spring Protection",
            description:
                "We use gravity to collect clear spring water directly from hillside sources. A spring protection structure dams the spring at its source and forces it through a steel pipe.",
            icon: Droplets,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            features: [
                "Women can collect clear water directly from the pipe",
                "No more carrying water up from ravines",
                "Eliminates multi-day settling process",
                "Hillside is restored after construction",
            ],
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600",
        },
        {
            step: 2,
            title: "Bio-Sand Filters",
            description:
                "Bio-sand filters purify the clear water by killing pathogens through natural processes - no chemicals or fuel required.",
            icon: Shield,
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            features: [
                "Kills bacteria, viruses, protozoa, and worms by abrasion",
                "Uses darkness, lack of oxygen, and lack of food",
                "No fuel or chemicals needed",
                "Tested and verified safe by local hospitals",
            ],
            image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600",
        },
    ];

    const resultsData = [
        {
            period: "Before 2017",
            deaths: "2-6",
            color: "text-red-600",
            bgColor: "bg-red-50",
            description: "Annual toddler deaths from waterborne diseases",
        },
        {
            period: "During Implementation",
            deaths: "2",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            description: "Deaths in 2016 during system implementation",
        },
        {
            period: "Since 2017",
            deaths: "0",
            color: "text-green-600",
            bgColor: "bg-green-50",
            description: "Toddler deaths for 9 consecutive years",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 px-4 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
                <div className="max-w-6xl mx-auto text-center text-white">
                    <Badge className="mb-6 bg-green-500 hover:bg-green-400 text-white border-none text-sm py-2 px-4">
                        Transforming Communities Since 2014
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Our Mission: Safe Water for All
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 opacity-90 max-w-3xl mx-auto leading-relaxed">
                        Providing environmentally friendly water purification
                        solutions to empower communities in Western Kenya
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3">
                            See Our Impact
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3"
                        >
                            Support Our Work
                        </Button>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 text-red-600 border-red-600"
                        >
                            The Challenge
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            The Water Crisis in Western Kenya
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Contaminated water creates a cycle of disease,
                            malnutrition, and poverty that disproportionately
                            affects the most vulnerable
                        </p>
                    </div>

                    <Card className="bg-white shadow-xl border-0 mb-16">
                        <CardContent className="p-8 md:p-12">
                            <div className="prose prose-lg max-w-none">
                                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                                    Bacteria, protozoa, and worms in
                                    contaminated water make people sick,
                                    malnourished, and anemic. The harm comes
                                    mostly to the vulnerable: the aged, those
                                    suffering from chronic disease, HIV-positive
                                    individuals, and{" "}
                                    <strong className="text-red-600">
                                        toddlers aged 2-5 years
                                    </strong>
                                    .
                                </p>
                                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                                    Before Kuwesa's intervention, women had to
                                    collect water from scum-covered ponds,
                                    filter it, settle it for days, and then boil
                                    it using precious firewood or add chemicals.
                                    This process was labor-intensive, expensive,
                                    and often incomplete.
                                </p>
                                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                                    <p className="text-lg md:text-xl font-semibold text-red-700">
                                        In Kenya, 15% of babies born alive did
                                        not make it to their 5th birthday due to
                                        waterborne diseases and malaria.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Problem Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {problemStats.map((stat, index) => (
                            <Card
                                key={index}
                                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group hover:scale-105"
                            >
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                                        {stat.number}
                                    </h3>
                                    <p className="font-semibold text-gray-900 mb-2 text-lg">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Solution Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 text-green-600 border-green-600"
                        >
                            Our Innovation
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Our Two-Step Solution
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A sustainable, environmentally friendly approach
                            that transforms contaminated water into safe
                            drinking water
                        </p>
                    </div>

                    <div className="space-y-12 mb-16">
                        {solutionSteps.map((step, index) => (
                            <Card
                                key={index}
                                className="bg-white shadow-xl border-0 overflow-hidden group hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div
                                        className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div
                                                className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                            >
                                                <step.icon
                                                    className={`w-8 h-8 ${step.color}`}
                                                />
                                            </div>
                                            <div>
                                                <Badge
                                                    className={`${step.bgColor} ${step.color} border-none`}
                                                >
                                                    Step {step.step}
                                                </Badge>
                                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                            {step.description}
                                        </p>

                                        <ul className="space-y-3 mb-6">
                                            {step.features.map(
                                                (feature, featureIndex) => (
                                                    <li
                                                        key={featureIndex}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <CheckCircle
                                                            className={`w-5 h-5 ${step.color} mt-0.5 flex-shrink-0`}
                                                        />
                                                        <span className="text-gray-700">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <div
                                        className={`relative overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}
                                    >
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-full object-cover min-h-[400px] group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Environmental Impact */}
                    <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-2xl border-0">
                        <CardContent className="p-8 md:p-12 text-center">
                            <Wind className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                100% Environmentally Friendly
                            </h3>
                            <p className="text-lg md:text-xl text-green-100 mb-6 max-w-2xl mx-auto">
                                Our system uses only gravity - no fuel, no
                                electricity, no chemicals. Safe for people and
                                safe for the planet.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold mb-2">
                                        🌱
                                    </div>
                                    <p>Zero Carbon Footprint</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold mb-2">
                                        💧
                                    </div>
                                    <p>No Chemicals Used</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold mb-2">
                                        ⚡
                                    </div>
                                    <p>No Electricity Required</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 text-yellow-600 border-yellow-600"
                        >
                            Proven Results
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Remarkable Results in Maganda Village
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our pilot village of 600 people has achieved
                            something extraordinary
                        </p>
                    </div>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-4 border-yellow-400 shadow-2xl mb-16">
                        <CardContent className="p-8 md:p-12">
                            <div className="text-center mb-8">
                                <Target className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                                <h3 className="text-2xl md:text-3xl font-bold text-yellow-900 mb-4">
                                    Zero Toddler Deaths Achieved
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {resultsData.map((result, index) => (
                                    <Card
                                        key={index}
                                        className={`${result.bgColor} border-0 shadow-lg`}
                                    >
                                        <CardContent className="p-6 text-center">
                                            <p
                                                className={`text-4xl md:text-5xl font-bold mb-2 ${result.color}`}
                                            >
                                                {result.deaths}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                                {result.period}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {result.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="text-center">
                                <p className="text-lg md:text-xl font-semibold text-yellow-900 bg-yellow-200 rounded-lg py-3 px-6">
                                    🎉 Celebrating 10 years without any toddler
                                    deaths from malaria in January 2026!
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Community Heroes */}
                    <Card className="bg-white shadow-xl border-0">
                        <CardContent className="p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <Users className="w-12 h-12 text-green-600" />
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        Community Health Workers: Our Heroes
                                    </h3>
                                    <p className="text-gray-600">
                                        The backbone of our success
                                    </p>
                                </div>
                            </div>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                    The dedicated Community Health Workers teach
                                    that{" "}
                                    <strong className="text-green-700">
                                        consistent use of safe water is required
                                        to maintain good health
                                    </strong>{" "}
                                    and avoid malnutrition and anemia caused by
                                    worms.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Many adults and older children took
                                    responsibility for reminding toddlers to use
                                    good water. Their consistent efforts have
                                    saved countless lives and created a culture
                                    of health awareness in the community.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Supporting Widows Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 text-purple-600 border-purple-600"
                        >
                            Community Empowerment
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Supporting HIV-Positive Widows
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Creating sustainable livelihoods while building
                            healthier communities
                        </p>
                    </div>

                    <Card className="bg-white shadow-xl border-0 overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <Heart className="w-8 h-8 text-purple-600" />
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        Economic Empowerment
                                    </h3>
                                </div>

                                <div className="prose prose-lg max-w-none">
                                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                        Kuwesa was begun to help support widows,
                                        particularly HIV-positive widows, who
                                        were raising their children with little
                                        to no cash income.
                                    </p>
                                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                        We formed groups to make fabric craft
                                        items - crazy quilt patchwork, African
                                        fabric beads, bags, and home decor -
                                        which are sold in the United States and
                                        Europe.
                                    </p>
                                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                        The bio-sand filters are made by a group
                                        of HIV-positive men, creating employment
                                        and dignity while saving lives.
                                    </p>
                                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                                        <p className="text-lg font-semibold text-purple-700">
                                            Every purchase from our shop
                                            directly supports these artisans and
                                            funds our water purification
                                            projects.
                                        </p>
                                    </div>
                                </div>

                                <Button className="mt-6 bg-purple-600 hover:bg-purple-700 font-semibold px-8 py-3 w-fit">
                                    Visit Our Shop
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <div className="relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800"
                                    alt="Women crafting"
                                    className="w-full h-full object-cover min-h-[500px]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
