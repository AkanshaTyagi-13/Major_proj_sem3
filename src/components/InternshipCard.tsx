import { Internship } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, IndianRupee, Calendar, Star } from 'lucide-react';

interface InternshipCardProps {
  internship: Internship;
  onViewDetails: (internship: Internship) => void;
}

const InternshipCard = ({ internship, onViewDetails }: InternshipCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">{internship.title}</h3>
            <p className="text-muted-foreground">{internship.company}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{internship.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4" />
            <span>₹{internship.stipend.toLocaleString()}/month</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{internship.duration} • {internship.type}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {internship.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {internship.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{internship.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(internship)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InternshipCard;