import { useState } from 'react';
import { Internship } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MapPin, IndianRupee, Calendar, Star, X, Send } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

interface InternshipDetailsProps {
  internship: Internship | null;
  onClose: () => void;
}

const InternshipDetails = ({ internship, onClose }: InternshipDetailsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  if (!internship) return null;

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to apply for internships.",
        variant: "destructive",
      });
      return;
    }
    setShowApplicationModal(true);
  };

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Internship Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{internship.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{internship.company}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <IndianRupee className="h-4 w-4" />
                <span>₹{internship.stipend.toLocaleString()}/month</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{internship.duration} • {internship.type}</span>
              </div>
            </div>

            <Button onClick={handleApply} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description & Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{internship.description}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {internship.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Reviews
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStarRating(internship.rating)}</div>
                  <span className="text-sm text-muted-foreground">
                    {internship.rating} out of 5 based on {internship.reviews.length} reviews
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {internship.reviews.map((review) => (
                <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {review.isAnonymous ? 'Anonymous' : review.userName}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStarRating(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {showApplicationModal && (
        <ApplicationModal
          internship={internship}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </div>
  );
};

export default InternshipDetails;