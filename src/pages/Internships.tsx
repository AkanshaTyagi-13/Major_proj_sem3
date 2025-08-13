import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, IndianRupee, Filter, SlidersHorizontal } from 'lucide-react';
import { mockInternships } from '@/data/mockData';
import InternshipCard from '@/components/InternshipCard';
import InternshipDetails from '@/components/InternshipDetails';
import { Internship } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStipend, setSelectedStipend] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [filteredInternships, setFilteredInternships] = useState(mockInternships);

  useEffect(() => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get('search');
    const urlLocation = params.get('location');
    
    if (urlSearch) setSearchTerm(urlSearch);
    if (urlLocation) setSelectedLocation(urlLocation);
  }, []);

  useEffect(() => {
    let filtered = mockInternships;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(internship =>
        internship.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by stipend
    if (selectedStipend) {
      const [min, max] = selectedStipend.split('-').map(s => parseInt(s) || 0);
      filtered = filtered.filter(internship => {
        if (max) {
          return internship.stipend >= min && internship.stipend <= max;
        } else {
          return internship.stipend >= min;
        }
      });
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(internship => internship.type === selectedType);
    }

    setFilteredInternships(filtered);
  }, [searchTerm, selectedLocation, selectedStipend, selectedType]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedStipend('');
    setSelectedType('');
  };

  const activeFilters = [
    searchTerm && { label: `Search: ${searchTerm}`, clear: () => setSearchTerm('') },
    selectedLocation && { label: `Location: ${selectedLocation}`, clear: () => setSelectedLocation('') },
    selectedStipend && { label: `Stipend: ${selectedStipend}`, clear: () => setSelectedStipend('') },
    selectedType && { label: `Type: ${selectedType}`, clear: () => setSelectedType('') },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Internships</h1>
          <p className="text-muted-foreground">
            Discover {filteredInternships.length} internship opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex gap-4">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[180px]">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStipend} onValueChange={setSelectedStipend}>
                  <SelectTrigger className="w-[150px]">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Stipend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Stipend</SelectItem>
                    <SelectItem value="0-15000">₹0 - ₹15k</SelectItem>
                    <SelectItem value="15000-25000">₹15k - ₹25k</SelectItem>
                    <SelectItem value="25000-35000">₹25k - ₹35k</SelectItem>
                    <SelectItem value="35000">₹35k+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Internships</SheetTitle>
                    <SheetDescription>
                      Narrow down your search with these filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Locations</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Stipend Range</label>
                      <Select value={selectedStipend} onValueChange={setSelectedStipend}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Stipend" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Stipend</SelectItem>
                          <SelectItem value="0-15000">₹0 - ₹15k</SelectItem>
                          <SelectItem value="15000-25000">₹15k - ₹25k</SelectItem>
                          <SelectItem value="25000-35000">₹25k - ₹35k</SelectItem>
                          <SelectItem value="35000">₹35k+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Type</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Types</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={filter.clear}
                  >
                    {filter.label} ×
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onViewDetails={setSelectedInternship}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No internships found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or removing some filters
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>

        {selectedInternship && (
          <InternshipDetails
            internship={selectedInternship}
            onClose={() => setSelectedInternship(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Internships;