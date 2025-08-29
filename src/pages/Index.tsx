import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/FileUpload';
import { PestResults } from '@/components/PestResults';
import { Microscope, Shield, Leaf, Brain } from 'lucide-react';
import heroImage from '@/assets/hero-agriculture.jpg';

// Mock detection function - in real app, this would call your ML API
const mockDetection = (file: File) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pestName: 'Aphids (Aphis fabae)',
        confidence: 0.89,
        severity: 'medium' as const,
        description: 'Small, soft-bodied insects that feed on plant sap. They cluster on new growth and can cause yellowing, curling, and stunted growth.',
        pesticides: [
          {
            name: 'Neem Oil',
            type: 'Organic',
            application: 'Spray every 7-14 days on affected areas. Best applied in early morning or evening.'
          },
          {
            name: 'Insecticidal Soap',
            type: 'Organic',
            application: 'Apply directly to aphids. Repeat every 2-3 days until controlled.'
          },
          {
            name: 'Imidacloprid',
            type: 'Systemic',
            application: 'Soil drench around base of plant. One application lasts 8-12 weeks.'
          }
        ],
        controlMethods: [
          {
            method: 'Biological Control',
            description: 'Encourage ladybugs, lacewings, and parasitic wasps. Plant companion plants like marigolds.',
            effectiveness: 'High'
          },
          {
            method: 'Physical Removal',
            description: 'Spray affected areas with strong water jet to dislodge aphids.',
            effectiveness: 'Medium'
          },
          {
            method: 'Cultural Practices',
            description: 'Avoid over-fertilizing with nitrogen. Maintain good air circulation.',
            effectiveness: 'Medium'
          }
        ]
      });
    }, 2000);
  });
};

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResult(null);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    try {
      const detectionResult = await mockDetection(selectedFile);
      setResult(detectionResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewScan = () => {
    setSelectedFile(null);
    setResult(null);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <PestResults
            result={result}
            imageUrl={imageUrl}
            onNewScan={handleNewScan}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-botanical/90 to-botanical/70" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI-Powered Plant
              <span className="text-growth-light"> Pest Detection</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Identify plant pests instantly with advanced machine learning. 
              Get precise pesticide recommendations and proven control methods to protect your crops.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Brain className="w-5 h-5" />
                <span>CNN Deep Learning</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Microscope className="w-5 h-5" />
                <span>95% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-5 h-5" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Upload Your Plant Image
              </h2>
              <p className="text-lg text-muted-foreground">
                Take a clear photo of the affected plant area and let our AI identify the pest
              </p>
            </div>

            <div className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
              />

              {selectedFile && (
                <div className="text-center">
                  <Button
                    variant="botanical"
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="min-w-[200px]"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Microscope className="w-5 h-5 mr-2" />
                        Analyze Plant
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced technology meets agricultural expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center border-botanical-light/30">
              <div className="w-16 h-16 bg-botanical/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-botanical" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Advanced AI Model
              </h3>
              <p className="text-muted-foreground">
                Trained on thousands of plant images using state-of-the-art CNN architecture for precise pest identification.
              </p>
            </Card>

            <Card className="p-6 text-center border-botanical-light/30">
              <div className="w-16 h-16 bg-growth/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-growth" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Expert Recommendations
              </h3>
              <p className="text-muted-foreground">
                Get tailored pesticide suggestions and integrated pest management strategies from agricultural experts.
              </p>
            </Card>

            <Card className="p-6 text-center border-botanical-light/30">
              <div className="w-16 h-16 bg-earth/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-earth" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Sustainable Solutions
              </h3>
              <p className="text-muted-foreground">
                Prioritize organic and environmentally-friendly control methods while maintaining crop health.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;