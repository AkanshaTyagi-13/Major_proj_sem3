import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Internship, Application } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Plus } from 'lucide-react';

interface ApplicationModalProps {
  internship: Internship;
  onClose: () => void;
}

const ApplicationModal = ({ internship, onClose }: ApplicationModalProps) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('resume');
  const [formData, setFormData] = useState({
    skills: user?.skills?.join(', ') || '',
    education: user?.education || '',
    experience: user?.experience || '',
    coverLetter: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(user?.skills || []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate extracting skills from resume
      const extractedSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Git'];
      setSkillsList(extractedSkills);
      setFormData(prev => ({ ...prev, skills: extractedSkills.join(', ') }));
      toast({
        title: "Resume Uploaded",
        description: `Skills extracted from ${file.name}`,
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      const updated = [...skillsList, newSkill.trim()];
      setSkillsList(updated);
      setFormData(prev => ({ ...prev, skills: updated.join(', ') }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updated = skillsList.filter(skill => skill !== skillToRemove);
    setSkillsList(updated);
    setFormData(prev => ({ ...prev, skills: updated.join(', ') }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Update user profile with new information
    updateProfile({
      skills: skillsList,
      education: formData.education,
      experience: formData.experience
    });

    // Save application
    const application: Application = {
      id: Date.now().toString(),
      internshipId: internship.id,
      userId: user.id,
      appliedDate: new Date().toISOString(),
      status: 'pending',
      coverLetter: formData.coverLetter
    };

    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Simulate sending email
    toast({
      title: "Application Submitted!",
      description: `A confirmation email has been sent to ${user.email}`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Apply for {internship.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resume">Upload Resume</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Upload your resume to automatically extract skills
                    </p>
                    <Label htmlFor="resume-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">
                        Choose File
                      </Button>
                      <Input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" variant="outline" onClick={addSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your educational background..."
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your relevant experience..."
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Cover Letter (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write a cover letter to introduce yourself..."
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;