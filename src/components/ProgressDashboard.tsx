
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Star, Target, BookOpen, Award, TrendingUp, CheckCircle, XCircle, RotateCcw, Zap } from 'lucide-react';

interface CategoryProgress {
  id: string;
  name: string;
  mastery: number;
  correctAnswers: number;
  totalQuestions: number;
  tags: string[];
  color: string;
}

interface ProgressDashboardProps {
  userData: any;
  onPracticeCategory: (categoryId: string) => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userData, onPracticeCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryProgress | null>(null);

  // Calculate progress for each category based on question history
  const calculateCategoryProgress = (): CategoryProgress[] => {
    const categories = [
      { id: 'sagemaker-core', name: 'SageMaker Core', color: 'from-blue-400 to-blue-600', tags: ['Notebooks', 'Training', 'Inference', 'Pipelines'] },
      { id: 'data-storage', name: 'Data & Storage', color: 'from-green-400 to-green-600', tags: ['S3', 'Glue', 'Athena', 'Redshift'] },
      { id: 'compute', name: 'Compute Services', color: 'from-purple-400 to-purple-600', tags: ['EC2', 'Lambda', 'Containers'] },
      { id: 'ai-services', name: 'AI Services', color: 'from-orange-400 to-orange-600', tags: ['Rekognition', 'Comprehend', 'Textract'] },
      { id: 'mlops-security', name: 'MLOps & Security', color: 'from-red-400 to-red-600', tags: ['IAM', 'Monitoring', 'CI/CD'] },
      { id: 'ml-concepts', name: 'ML Concepts', color: 'from-indigo-400 to-indigo-600', tags: ['Algorithms', 'Evaluation', 'Feature Engineering'] },
      { id: 'expert-aws-ml', name: 'Expert Level', color: 'from-yellow-400 to-yellow-600', tags: ['Advanced', 'Optimization', 'Best Practices'] }
    ];

    return categories.map(category => {
      const categoryQuestions = Object.entries(userData.questionHistory || {})
        .filter(([questionId]) => questionId.startsWith(category.id.split('-')[0]));
      
      const totalQuestions = Math.max(categoryQuestions.length, 10); // Minimum 10 for demo
      const correctAnswers = categoryQuestions.reduce((sum, [, history]) => 
        sum + (history as any).correct, 0);
      
      const mastery = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

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

  const strongestAreas = categoryProgress
    .filter(cat => cat.mastery >= 75)
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 3);

  const focusAreas = categoryProgress
    .filter(cat => cat.mastery < 50)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);

  const getMasteryMessage = (mastery: number) => {
    if (mastery >= 90) return "🌟 Expert Level!";
    if (mastery >= 75) return "🚀 Almost there!";
    if (mastery >= 50) return "📈 Making progress!";
    return "🎯 Just getting started!";
  };

  const getMotivationalMessage = (mastery: number) => {
    if (mastery >= 80) return "You're on fire! Keep it up! 🔥";
    if (mastery >= 60) return "Great progress! You're getting there! ⭐";
    if (mastery >= 40) return "Nice work! Keep building momentum! 💪";
    return "Every step counts! Keep learning! 🚀";
  };

  const getMasteryLevelIcon = (mastery: number) => {
    if (mastery >= 90) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (mastery >= 75) return <Award className="h-8 w-8 text-purple-500" />;
    if (mastery >= 50) return <Star className="h-8 w-8 text-blue-500" />;
    return <Target className="h-8 w-8 text-gray-400" />;
  };

  return (
    <div className="space-y-8">
      {/* Hero Summary Section */}
      <div className="relative overflow-hidden">
        <Card className="border-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Main Mastery Display */}
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
                  {getMasteryLevelIcon(totalMastery)}
                  <div>
                    <h2 className="text-4xl lg:text-6xl font-bold">{totalMastery}%</h2>
                    <p className="text-lg lg:text-xl opacity-90">Overall Mastery</p>
                  </div>
                </div>
                <p className="text-base lg:text-lg opacity-95 font-medium">
                  {getMotivationalMessage(totalMastery)}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-full p-3 w-fit mx-auto">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{strongestAreas.length}</div>
                  <div className="text-sm opacity-90">Strong Areas</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-full p-3 w-fit mx-auto">
                    <Target className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{focusAreas.length}</div>
                  <div className="text-sm opacity-90">Focus Areas</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-full p-3 w-fit mx-auto">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{categoryProgress.length}</div>
                  <div className="text-sm opacity-90">Categories</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Progress Bars Dashboard */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            📊 Category Mastery Progress
          </CardTitle>
          <p className="text-gray-600">Track your progress across all AWS ML certification topics</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {categoryProgress.map(cat => {
            const masteryColor = cat.mastery >= 75 ? 'text-green-700' : cat.mastery >= 50 ? 'text-yellow-700' : 'text-red-700';
            const achievementIcon = cat.mastery >= 90 ? <Trophy className="h-5 w-5 text-yellow-500" /> :
                                   cat.mastery >= 75 ? <Award className="h-5 w-5 text-purple-500" /> :
                                   cat.mastery >= 50 ? <Star className="h-5 w-5 text-blue-500" /> : null;

            return (
              <div key={cat.id} className="group p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Category Info */}
                  <div className="flex items-center gap-3 lg:w-64 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                      {cat.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                        {achievementIcon}
                      </div>
                      <p className="text-sm text-gray-500">{cat.correctAnswers}/{cat.totalQuestions} questions</p>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className={`text-lg font-bold ${masteryColor}`}>{cat.mastery}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={cat.mastery} 
                        className="h-3 bg-gray-200 overflow-hidden"
                      />
                      <div 
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${cat.mastery}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button 
                      onClick={() => onPracticeCategory(cat.id)}
                      size="sm"
                      className={`bg-gradient-to-r ${cat.color} text-white hover:scale-105 transition-transform shadow-md`}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Practice
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Areas Overview - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strong Areas */}
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Award className="h-5 w-5" />
              Your Strongest Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strongestAreas.length > 0 ? (
              <div className="space-y-3">
                {strongestAreas.map(area => (
                  <Dialog key={area.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/70 hover:bg-white/90 cursor-pointer transition-all duration-200 border border-green-100 hover:border-green-200 hover:scale-[1.02]">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${area.color} flex items-center justify-center text-white text-sm font-bold`}>
                            {area.mastery}%
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{area.name}</div>
                            <div className="text-sm text-gray-500">{area.correctAnswers}/{area.totalQuestions} questions</div>
                          </div>
                        </div>
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{area.name} - {getMasteryMessage(area.mastery)}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Progress value={area.mastery} className="h-2" />
                        <div className="flex flex-wrap gap-2">
                          {area.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => onPracticeCategory(area.id)}
                          className="w-full"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Practice This Area
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Keep practicing to develop your strong areas! 💪
              </p>
            )}
          </CardContent>
        </Card>

        {/* Focus Areas */}
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Target className="h-5 w-5" />
              Areas to Focus On
            </CardTitle>
          </CardHeader>
          <CardContent>
            {focusAreas.length > 0 ? (
              <div className="space-y-3">
                {focusAreas.map(area => (
                  <Dialog key={area.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/70 hover:bg-white/90 cursor-pointer transition-all duration-200 border border-orange-100 hover:border-orange-200 hover:scale-[1.02]">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${area.color} flex items-center justify-center text-white text-sm font-bold`}>
                            {area.mastery}%
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{area.name}</div>
                            <div className="text-sm text-gray-500">{area.correctAnswers}/{area.totalQuestions} questions</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-orange-600 border-orange-200 hover:bg-orange-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPracticeCategory(area.id);
                            }}
                          >
                            Practice
                          </Button>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{area.name} - {getMasteryMessage(area.mastery)}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Progress value={area.mastery} className="h-2" />
                        <div className="flex flex-wrap gap-2">
                          {area.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => onPracticeCategory(area.id)}
                          className="w-full"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Practice This Area
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Great job! No weak areas detected! 🎉
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
