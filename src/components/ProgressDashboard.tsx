import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Star, Target, BookOpen, Award, TrendingUp, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{totalMastery}%</h3>
            <p className="text-gray-600">Total Mastery</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{strongestAreas.length}</h3>
            <p className="text-gray-600">Strong Areas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{focusAreas.length}</h3>
            <p className="text-gray-600">Focus Areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars Dashboard for All Categories */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Global Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryProgress.map(cat => (
              <div key={cat.id} className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div className="w-40 font-medium text-gray-700 mb-1 md:mb-0">{cat.name}</div>
                <div className="flex-1 flex items-center gap-3">
                  <Progress value={cat.mastery} className="flex-1 h-2" />
                  <span className="w-12 text-right font-semibold text-gray-700">{cat.mastery}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
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
                {focusAreas.map(area => (
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
