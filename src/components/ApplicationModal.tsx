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
import { Upload, X, Plus, FileText, CheckCircle, Loader2 } from 'lucide-react';

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);

    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate file upload and skill extraction
      const fakeUrl = `https://example.com/resumes/${file.name}`;

      // Update user profile with resume URL
      updateProfile({ resume: fakeUrl });

      // Simulate extracting skills from resume based on internship requirements
      const relevantSkills = internship.skills.filter(() =>
        Math.random() > 0.3 // Simulate 70% chance of having each required skill
      );
      const additionalSkills = ['Communication', 'Problem Solving', 'Team Work'];
      const extractedSkills = [...new Set([...relevantSkills, ...additionalSkills])];

      setSkillsList(prev => [...new Set([...prev, ...extractedSkills])]);
      setFormData(prev => ({
        ...prev,
        skills: [...new Set([...prev.skills.split(', ').filter(s => s), ...extractedSkills])].join(', '),
        education: prev.education || 'Bachelor\'s degree in Computer Science or related field',
        experience: prev.experience || 'Previous internship or project experience in relevant technologies'
      }));

      toast({
        title: "Resume Uploaded Successfully",
        description: `${file.name} uploaded and ${extractedSkills.length} skills extracted. Profile information has been auto-filled.`,
      });

      // Auto-switch to manual tab to show extracted information
      setActiveTab('manual');
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
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

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your application.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!formData.education.trim() || !formData.experience.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your education and experience details.",
        variant: "destructive"
      });
      return;
    }

    if (skillsList.length === 0) {
      toast({
        title: "Skills Required",
        description: "Please add at least one skill to your profile.",
        variant: "destructive"
      });
      return;
    }

    // Check if user has already applied
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const existingApplication = applications.find((app: Application) =>
      app.internshipId === internship.id && app.userId === user.id
    );

    if (existingApplication) {
      toast({
        title: "Already Applied",
        description: "You have already applied for this internship.",
        variant: "destructive"
      });
      return;
    }

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

    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Simulate sending email
    toast({
      title: "Application Submitted Successfully!",
      description: `Your application for ${internship.title} has been submitted. A confirmation email has been sent to ${user.email}`,
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
                  {uploadedFile && !isUploading ? (
                    // File uploaded successfully
                    <div className="border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 rounded-lg p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-green-800 dark:text-green-200">
                            Resume Uploaded Successfully
                          </h3>
                          <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                            {uploadedFile.name} • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-300 mt-2">
                            Skills and information have been extracted and auto-filled.
                            Check the "Manual Entry" tab to review and edit.
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('resume-upload')?.click()}
                          className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900"
                        >
                          Replace
                        </Button>
                      </div>
                    </div>
                  ) : isUploading ? (
                    // Uploading state
                    <div className="border-2 border-dashed border-primary/50 bg-primary/5 rounded-lg p-8 text-center">
                      <Loader2 className="h-12 w-12 mx-auto text-primary mb-4 animate-spin" />
                      <p className="text-primary font-medium mb-2">Uploading Resume...</p>
                      <p className="text-sm text-muted-foreground">
                        Analyzing your resume and extracting skills
                      </p>
                    </div>
                  ) : (
                    // Default upload state
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Upload your resume to automatically extract skills
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supports PDF, DOC, DOCX files up to 5MB
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading}
                        onClick={() => document.getElementById('resume-upload')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <Input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                    </div>
                  )}

                  {/* Show existing resume if user has one */}
                  {user?.resume && !uploadedFile && (
                    <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">Existing Resume</p>
                          <p className="text-xs text-muted-foreground">
                            You have a resume on file. Upload a new one to replace it.
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={user.resume} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Skills
                    {uploadedFile && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Auto-extracted
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" variant="outline" onClick={addSkill} disabled={!newSkill.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {skillsList.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No skills added yet. Upload a resume or add skills manually.
                    </p>
                  )}
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