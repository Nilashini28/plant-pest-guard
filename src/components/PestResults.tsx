import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Leaf, Droplets } from 'lucide-react';

interface PestDetectionResult {
  pestName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  pesticides: Array<{
    name: string;
    type: string;
    application: string;
  }>;
  controlMethods: Array<{
    method: string;
    description: string;
    effectiveness: string;
  }>;
}

interface PestResultsProps {
  result: PestDetectionResult;
  imageUrl: string;
  onNewScan: () => void;
}

export const PestResults: React.FC<PestResultsProps> = ({
  result,
  imageUrl,
  onNewScan,
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-destructive bg-destructive/10';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-growth bg-growth-light';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />;
      case 'low':
        return <Shield className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Detection Results</h2>
        <Button variant="outline" onClick={onNewScan}>
          New Scan
        </Button>
      </div>

      {/* Image and Detection Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <img
            src={imageUrl}
            alt="Uploaded plant"
            className="w-full h-64 object-cover rounded-lg"
          />
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {result.pestName}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getSeverityColor(result.severity)}>
                  <div className="flex items-center gap-1">
                    {getSeverityIcon(result.severity)}
                    {result.severity.toUpperCase()} SEVERITY
                  </div>
                </Badge>
                <Badge variant="secondary">
                  {(result.confidence * 100).toFixed(1)}% Confidence
                </Badge>
              </div>
              <p className="text-muted-foreground">{result.description}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Pesticides */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-5 h-5 text-botanical" />
          <h3 className="text-xl font-semibold text-foreground">
            Recommended Pesticides
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.pesticides.map((pesticide, index) => (
            <Card key={index} className="p-4 border-botanical-light/50">
              <h4 className="font-semibold text-foreground mb-2">
                {pesticide.name}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {pesticide.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {pesticide.application}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Control Methods */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-growth" />
          <h3 className="text-xl font-semibold text-foreground">
            Prevention & Control Methods
          </h3>
        </div>
        
        <div className="space-y-4">
          {result.controlMethods.map((method, index) => (
            <div key={index} className="border-l-4 border-growth-light pl-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{method.method}</h4>
                <Badge variant="outline" className="text-xs">
                  {method.effectiveness} Effectiveness
                </Badge>
              </div>
              <p className="text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};