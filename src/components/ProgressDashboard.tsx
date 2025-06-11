
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Star, Target, BookOpen, Award, TrendingUp, CheckCircle, XCircle, RotateCcw, Zap, Rocket } from 'lucide-react';

interface CategoryProgress {
  id: string;
  name: string;
  mastery: number;
  correctAnswers: number;
  totalQuestions: number;
  tags: string[];
  color: string;
  icon: string;
}

interface ProgressDashboardProps {
  userData: any;
  onPracticeCategory: (categoryId: string) => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userData, onPracticeCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryProgress | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // Calculate progress for each category based on question history
  const calculateCategoryProgress = (): CategoryProgress[] => {
    const categories = [
      { 
        id: 'sagemaker-core', 
        name: 'SageMaker Core', 
        color: '#4F46E5', 
        icon: '🧠',
        tags: ['Notebooks', 'Training', 'Inference', 'Pipelines'] 
      },
      { 
        id: 'data-storage', 
        name: 'Data & Storage', 
        color: '#059669', 
        icon: '💾',
        tags: ['S3', 'Glue', 'Athena', 'Redshift'] 
      },
      { 
        id: 'compute', 
        name: 'Compute Services', 
        color: '#7C3AED', 
        icon: '⚡',
        tags: ['EC2', 'Lambda', 'Containers'] 
      },
      { 
        id: 'ai-services', 
        name: 'AI Services', 
        color: '#EA580C', 
        icon: '🤖',
        tags: ['Rekognition', 'Comprehend', 'Textract'] 
      },
      { 
        id: 'mlops-security', 
        name: 'MLOps & Security', 
        color: '#DC2626', 
        icon: '🔒',
        tags: ['IAM', 'Monitoring', 'CI/CD'] 
      },
      { 
        id: 'ml-concepts', 
        name: 'ML Concepts', 
        color: '#0891B2', 
        icon: '📊',
        tags: ['Algorithms', 'Evaluation', 'Feature Engineering'] 
      },
      { 
        id: 'expert-aws-ml', 
        name: 'Expert Level', 
        color: '#CA8A04', 
        icon: '👑',
        tags: ['Advanced', 'Optimization', 'Best Practices'] 
      }
    ];

    return categories.map(category => {
      const categoryQuestions = Object.entries(userData.questionHistory || {})
        .filter(([questionId]) => questionId.startsWith(category.id.split('-')[0]));
      
      const totalQuestions = Math.max(categoryQuestions.length, 10);
      const correctAnswers = categoryQuestions.reduce((sum, [, history]) => 
        sum + (history as any).correct, 0);
      
      const mastery = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : Math.floor(Math.random() * 80) + 10;

      return {
        ...category,
        mastery,
        correctAnswers,
        totalQuestions
      };
    });
  };

  const categoryProgress = calculateCategoryProgress();
  const totalMastery = Math.round(
    categoryProgress.reduce((sum, cat) => sum + cat.mastery, 0) / categoryProgress.length
  );

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return '#10B981'; // Green
    if (mastery >= 60) return '#F59E0B'; // Yellow
    if (mastery >= 40) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  const getPlanetSize = (mastery: number) => {
    const baseSize = 40;
    const maxSize = 80;
    return baseSize + (mastery / 100) * (maxSize - baseSize);
  };

  const getMasteryMessage = (mastery: number) => {
    if (mastery >= 90) return "🌟 Galactic Master!";
    if (mastery >= 75) return "🚀 Near Orbit!";
    if (mastery >= 50) return "🛸 Exploring Space!";
    return "🌌 Starting Journey!";
  };

  const getMotivationalMessage = (totalMastery: number) => {
    if (totalMastery >= 85) return "🌟 You're conquering the AWS galaxy! Keep shining!";
    if (totalMastery >= 70) return "🚀 Your skills are reaching new heights! Almost there!";
    if (totalMastery >= 50) return "🛸 Great progress explorer! Keep navigating the knowledge universe!";
    return "🌌 Every star starts with a spark! Your journey begins here!";
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Total Mastery */}
      <Card className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3Ccircle cx=\"27\" cy=\"7\" r=\"1\"/%3E%3Ccircle cx=\"47\" cy=\"7\" r=\"1\"/%3E%3Ccircle cx=\"7\" cy=\"27\" r=\"1\"/%3E%3Ccircle cx=\"27\" cy=\"27\" r=\"1\"/%3E%3Ccircle cx=\"47\" cy=\"27\" r=\"1\"/%3E%3Ccircle cx=\"7\" cy=\"47\" r=\"1\"/%3E%3Ccircle cx=\"27\" cy=\"47\" r=\"1\"/%3E%3Ccircle cx=\"47\" cy=\"47\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <CardContent className="p-8 relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <div className="text-4xl">🌌</div>
                AWS ML Skill Galaxy
              </h2>
              <p className="text-blue-100 text-lg">Navigate your certification journey through the cosmos of knowledge</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <span className="text-4xl font-bold">{totalMastery}%</span>
              </div>
              <p className="text-blue-200">Total Mastery</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">Mission Status</span>
            </div>
            <p className="text-blue-100">{getMotivationalMessage(totalMastery)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Skill Galaxy Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="text-2xl">🪐</div>
            Your Skill Galaxy
          </CardTitle>
          <p className="text-gray-600">Each planet represents a knowledge domain. Watch them grow as you master new concepts!</p>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 rounded-2xl p-8 min-h-[400px] overflow-hidden">
            {/* Background stars */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Planets (Categories) */}
            <div className="relative z-10">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
                {categoryProgress.map((category, index) => {
                  const planetSize = getPlanetSize(category.mastery);
                  const isHovered = hoveredPlanet === category.id;
                  
                  return (
                    <Dialog key={category.id}>
                      <DialogTrigger asChild>
                        <div
                          className="relative cursor-pointer group transition-all duration-300 transform hover:scale-110"
                          onMouseEnter={() => setHoveredPlanet(category.id)}
                          onMouseLeave={() => setHoveredPlanet(null)}
                        >
                          {/* Planet */}
                          <div
                            className="rounded-full flex items-center justify-center text-white font-bold shadow-lg relative transition-all duration-300"
                            style={{
                              width: planetSize,
                              height: planetSize,
                              backgroundColor: category.color,
                              boxShadow: `0 0 20px ${getMasteryColor(category.mastery)}40, inset 0 0 20px rgba(255,255,255,0.1)`,
                              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                            }}
                          >
                            <span className="text-2xl">{category.icon}</span>
                            
                            {/* Orbital ring for high mastery */}
                            {category.mastery >= 75 && (
                              <div
                                className="absolute border-2 border-yellow-400 rounded-full opacity-60 animate-spin"
                                style={{
                                  width: planetSize + 20,
                                  height: planetSize + 20,
                                  animationDuration: '8s'
                                }}
                              />
                            )}
                          </div>

                          {/* Planet label */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                            <div className="text-white text-sm font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                              {category.name}
                            </div>
                            <div className="text-white text-xs mt-1">
                              {category.mastery}%
                            </div>
                          </div>

                          {/* Mastery indicator */}
                          <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: getMasteryColor(category.mastery) }}
                          >
                            {category.mastery >= 90 ? '★' : category.mastery >= 75 ? '◆' : category.mastery >= 50 ? '▲' : '●'}
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <span className="text-2xl">{category.icon}</span>
                            {category.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800 mb-2">
                              {category.mastery}%
                            </div>
                            <p className="text-gray-600">{getMasteryMessage(category.mastery)}</p>
                          </div>
                          
                          <Progress value={category.mastery} className="h-3" />
                          
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-lg font-semibold text-green-600">{category.correctAnswers}</div>
                              <div className="text-sm text-gray-500">Correct</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-gray-600">{category.totalQuestions}</div>
                              <div className="text-sm text-gray-500">Total</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">Key Topics:</h4>
                            <div className="flex flex-wrap gap-2">
                              {category.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button 
                            onClick={() => onPracticeCategory(category.id)}
                            className="w-full"
                            style={{ backgroundColor: category.color }}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Launch Mission
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-8 flex justify-center">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h4 className="font-semibold mb-2 text-center">Mastery Levels</h4>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>80%+ Expert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>60%+ Proficient</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>40%+ Learning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                      <span>&lt;40% Beginner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-700">
              {categoryProgress.filter(cat => cat.mastery >= 75).length}
            </h3>
            <p className="text-green-600 font-medium">Mastered Domains</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-blue-700">
              {categoryProgress.filter(cat => cat.mastery < 60).length}
            </h3>
            <p className="text-blue-600 font-medium">Growth Opportunities</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-purple-700">
              {Math.round(categoryProgress.reduce((sum, cat) => sum + cat.correctAnswers, 0))}
            </h3>
            <p className="text-purple-600 font-medium">Total Correct Answers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
