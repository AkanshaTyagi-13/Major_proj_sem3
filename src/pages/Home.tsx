import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, IndianRupee, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import { mockInternships } from '@/data/mockData';
import InternshipCard from '@/components/InternshipCard';
import InternshipDetails from '@/components/InternshipDetails';
import { Internship } from '@/types';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const featuredInternships = mockInternships.slice(0, 3);
  const stats = [
    { icon: TrendingUp, label: 'Active Internships', value: '500+' },
    { icon: Users, label: 'Students Placed', value: '2000+' },
    { icon: Award, label: 'Partner Companies', value: '150+' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedLocation) params.append('location', selectedLocation);
    window.location.href = `/internships?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find the Right Internship for You
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover amazing internship opportunities from top companies and kickstart your career journey
          </p>

          {/* Search Section */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="md:w-[200px]">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="md:w-[150px]">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Stipend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-15000">₹0 - ₹15k</SelectItem>
                    <SelectItem value="15000-25000">₹15k - ₹25k</SelectItem>
                    <SelectItem value="25000-35000">₹25k - ₹35k</SelectItem>
                    <SelectItem value="35000+">₹35k+</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={handleSearch} className="md:w-auto">
                  <Link to="/internships" className="flex items-center">
                    Explore Internships
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Internships</h2>
            <p className="text-muted-foreground">Handpicked opportunities from top companies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onViewDetails={setSelectedInternship}
              />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/internships">
                View All Internships
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who found their dream internships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/internships">Browse Internships</Link>
            </Button>
          </div>
        </div>
      </section>

      {selectedInternship && (
        <InternshipDetails
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
        />
      )}
    </div>
  );
};

export default Home;