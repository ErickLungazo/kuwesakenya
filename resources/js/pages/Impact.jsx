import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingDown, Users, Droplets } from "lucide-react";

export default function Impact() {
  const stories = [
    {
      title: "Zero Toddler Deaths in Maganda Village",
      location: "Maganda Village, Western Kenya",
      year: "2017-2025",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      description: "Before Kuwesa's intervention, Maganda village (population 600) was losing 2-6 toddlers annually to malaria and waterborne diseases. After implementing our two-step water purification system, toddler deaths dropped to zero in 2017 and have remained at zero for 9 consecutive years.",
      impact: "9 years without a single toddler death",
      icon: TrendingDown,
      color: "text-green-600"
    },
    {
      title: "600 People with Clean Water Access",
      location: "Pilot Village Communities",
      year: "2015-Present",
      image: "https://images.unsplash.com/photo-1541960071727-c531398e7494?w=800",
      description: "Through spring protection structures and bio-sand filters, we've provided 600+ people with consistent access to safe drinking water. Women no longer spend hours collecting and treating contaminated water.",
      impact: "600+ villagers served daily",
      icon: Droplets,
      color: "text-blue-600"
    },
    {
      title: "Empowering HIV-Positive Widows",
      location: "Kaimosi Region, Kenya",
      year: "2014-Present",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
      description: "Over 50 HIV-positive widows have gained sustainable income through our fabric craft program. They create beautiful handmade items while supporting their families with dignity and independence.",
      impact: "50+ artisan women empowered",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Community Health Workers: The Heroes",
      location: "Multiple Villages",
      year: "Ongoing",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      description: "Our dedicated Community Health Workers teach families about the importance of consistent safe water use. They've been instrumental in maintaining our zero mortality rate by educating communities about water safety and health.",
      impact: "Lives saved through education",
      icon: Heart,
      color: "text-red-600"
    }
  ];

  const statistics = [
    { number: "0", label: "Toddler Deaths Since 2017", sublabel: "From 2-6 per year before" },
    { number: "600+", label: "People Served", sublabel: "With clean water access" },
    { number: "50+", label: "Widows Empowered", sublabel: "Through craft programs" },
    { number: "10", label: "Years of Impact", sublabel: "And counting" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative py-20 px-4" style={{ background: 'linear-gradient(135deg, #2d8659 0%, #1f5d3f 100%)' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Impact Stories</h1>
          <p className="text-xl text-green-100">
            Real stories of lives transformed through clean water and community empowerment
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 -mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-bold mb-2" style={{ color: '#2d8659' }}>
                    {stat.number}
                  </h3>
                  <p className="font-semibold text-gray-900 mb-1">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.sublabel}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Stories That Matter
          </h2>
          
          <div className="space-y-12">
            {stories.map((story, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className={`grid ${index % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-0`}>
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                  </div>
                  <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${story.color.split('-')[1]}-100`}>
                        <story.icon className={`w-6 h-6 ${story.color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {story.year}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                      📍 {story.location}
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {story.description}
                    </p>
                    <div className={`bg-${story.color.split('-')[1]}-50 border-2 border-${story.color.split('-')[1]}-200 rounded-lg p-4`}>
                      <p className={`font-semibold ${story.color}`}>
                        ✨ {story.impact}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Journey
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <Badge className="bg-green-600">2014</Badge>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-green-300 pl-8">
                <h3 className="font-bold text-lg mb-2">Kuwesa Founded</h3>
                <p className="text-gray-700">
                  Started supporting HIV-positive widows through fabric craft programs
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <Badge className="bg-green-600">2015</Badge>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-green-300 pl-8">
                <h3 className="font-bold text-lg mb-2">First Bio-Sand Filters</h3>
                <p className="text-gray-700">
                  Distributed bio-sand filters to HIV-positive women. Began pilot program in Maganda village.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <Badge className="bg-green-600">2016</Badge>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-green-300 pl-8">
                <h3 className="font-bold text-lg mb-2">Spring Protection Begins</h3>
                <p className="text-gray-700">
                  Started building spring protection structures. Toddler deaths reduced from 5 to 2.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <Badge className="bg-yellow-500">2017</Badge>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-yellow-300 pl-8">
                <h3 className="font-bold text-lg mb-2">Historic Achievement</h3>
                <p className="text-gray-700">
                  <strong>Zero toddler deaths</strong> from malaria in Maganda village for the first time!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <Badge className="bg-yellow-500">2017-2025</Badge>
              </div>
              <div className="flex-1 pl-8">
                <h3 className="font-bold text-lg mb-2">9 Years of Zero Deaths</h3>
                <p className="text-gray-700">
                  Maintained zero toddler mortality rate through consistent community health education and water safety programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            The Power of Clean Water
          </h2>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <p className="text-xl text-gray-700 italic mb-6">
                "Before Kuwesa, women had to walk long distances to collect scum-covered pond water, then spend days settling and boiling it. Now, with spring protection and bio-sand filters, we have clean water flowing directly into our containers. Our children are healthy, and we have time for other important work."
              </p>
              <p className="font-semibold text-green-700">
                - Community Member, Maganda Village
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              15% → 0%
            </h3>
            <p className="text-lg">
              In Kenya, 15% of babies didn't reach their 5th birthday. In our pilot village, that number is now <strong>0%</strong> thanks to clean water.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}