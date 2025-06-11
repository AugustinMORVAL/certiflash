import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Star, Target, BookOpen, Award, TrendingUp, CheckCircle, XCircle, RotateCcw, Lock } from 'lucide-react';
import { awsMLModules } from '@/data/awsMLQuestions';

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
  const [showDetails, setShowDetails] = useState(false);

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

  // Get requiredXP for each category from awsMLModules
  const getRequiredXP = (categoryId: string) => {
    const module = awsMLModules.find(m => m.id === categoryId);
    return module ? module.requiredXP : 0;
  };

  const strongestAreas = categoryProgress
    .filter(cat => cat.mastery >= 75)
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 3);

  // Only include focus areas for which the user has enough XP
  const focusAreas = categoryProgress
    .filter(cat => cat.mastery < 50 && userData.xp >= getRequiredXP(cat.id))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);

  const getMasteryMessage = (mastery: number) => {
    if (mastery >= 90) return "🌟 Expert Level!";
    if (mastery >= 75) return "🚀 Almost there!";
    if (mastery >= 50) return "📈 Making progress!";
    return "🎯 Just getting started!";
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 90) return "text-emerald-600";
    if (mastery >= 75) return "text-blue-600";
    if (mastery >= 50) return "text-yellow-600";
    return "text-gray-500";
  };

  const getMasteryBgColor = (mastery: number) => {
    if (mastery >= 90) return "bg-emerald-50 border-emerald-200";
    if (mastery >= 75) return "bg-blue-50 border-blue-200";
    if (mastery >= 50) return "bg-yellow-50 border-yellow-200";
    return "bg-gray-50 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Minimal/Expandable Global Progression */}
      <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-100">
        <CardContent className="py-4 px-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Progress Ring */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              <svg className="w-24 h-24 md:w-28 md:h-28 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={`${totalMastery}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-indigo-600">{totalMastery}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Milestone */}
          <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Global Progression
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-1">Master all categories to unlock your certification potential</div>
            <div className="flex items-center gap-2 mt-1">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {totalMastery >= 90 ? "🎉 You're a certification master!" :
                 totalMastery >= 75 ? "Reach 90% to become a master!" :
                 totalMastery >= 50 ? "Reach 75% to unlock expert status!" :
                 "Reach 50% to unlock advanced features!"}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </CardContent>
        {/* Expandable Details Section */}
        {showDetails && (
          <CardContent className="pt-0">
            {/* Category Progress Grid */}
            <div className="grid gap-4 mt-4">
              {categoryProgress.map((cat, index) => (
                <div
                  key={cat.id}
                  className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${getMasteryBgColor(cat.mastery)}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Category Icon */}
                    <div className={`relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                      <div className="text-white font-bold text-lg">
                        {cat.name.charAt(0)}
                      </div>
                      {cat.mastery >= 90 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-yellow-800" fill="currentColor" />
                        </div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 truncate">{cat.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${getMasteryColor(cat.mastery)}`}>{cat.mastery}%</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onPracticeCategory(cat.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 h-6"
                          >
                            Practice
                          </Button>
                        </div>
                      </div>
                      {/* Enhanced Progress Bar */}
                      <div className="relative mb-2">
                        <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-500 rounded-full relative`}
                            style={{ width: `${cat.mastery}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                          </div>
                        </div>
                        {/* Progress indicators */}
                        <div className="absolute top-0 left-0 w-full h-3 flex justify-between items-center px-1">
                          {[25, 50, 75].map((milestone) => (
                            <div
                              key={milestone}
                              className={`w-1 h-1 rounded-full ${cat.mastery >= milestone ? 'bg-white' : 'bg-gray-400'}`}
                              style={{ left: `${milestone}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Stats and Tags */}
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{cat.correctAnswers}/{cat.totalQuestions} correct</span>
                        <div className="flex gap-1">
                          {cat.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">{tag}</Badge>
                          ))}
                          {cat.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">+{cat.tags.length - 2}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Areas Overview - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Award className="h-5 w-5" />
              Your Strongest Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strongestAreas.length > 0 ? (
              <div className="space-y-4">
                {strongestAreas.map(area => (
                  <Dialog key={area.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${area.color}`} />
                          <div>
                            <div className="font-medium">{area.name}</div>
                            <div className="text-sm text-gray-500">{area.correctAnswers}/{area.totalQuestions} questions</div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{area.mastery}%</Badge>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Target className="h-5 w-5" />
              Areas to Focus On
            </CardTitle>
          </CardHeader>
          <CardContent>
            {focusAreas.length > 0 ? (
              <div className="space-y-4">
                {focusAreas.map(area => {
                  const module = awsMLModules.find(m => m.id === area.id);
                  const requiredXP = module ? module.requiredXP : 0;
                  const isLocked = userData.xp < requiredXP;
                  return (
                    <Dialog key={area.id}>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${area.color}`} />
                            <div>
                              <div className="font-medium">{area.name}</div>
                              <div className="text-sm text-gray-500">{area.correctAnswers}/{area.totalQuestions} questions</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{area.mastery}%</Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isLocked) onPracticeCategory(area.id);
                              }}
                              disabled={isLocked}
                              className={isLocked ? 'opacity-60 cursor-not-allowed' : ''}
                              title={isLocked ? `Débloquez avec ${requiredXP} XP` : ''}
                            >
                              {isLocked ? <><Lock className="h-4 w-4 mr-1" /> XP requis</> : 'Practice'}
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
                            disabled={isLocked}
                          >
                            {isLocked ? <><Lock className="h-4 w-4 mr-1" /> XP requis</> : <><BookOpen className="h-4 w-4 mr-2" />Practice This Area</>}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
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
