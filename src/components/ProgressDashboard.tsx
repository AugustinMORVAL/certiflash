
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
  planetSize: 'small' | 'medium' | 'large';
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
      
      let planetSize: 'small' | 'medium' | 'large' = 'small';
      if (mastery >= 75) planetSize = 'large';
      else if (mastery >= 50) planetSize = 'medium';

      return {
        ...category,
        mastery,
        correctAnswers,
        totalQuestions,
        planetSize
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

  const getPlanetClasses = (category: CategoryProgress) => {
    const baseClasses = "rounded-full bg-gradient-to-br shadow-lg transition-all duration-500 hover:scale-110 cursor-pointer relative overflow-hidden";
    const sizeClasses = {
      small: "w-16 h-16",
      medium: "w-20 h-20",
      large: "w-24 h-24"
    };
    
    return `${baseClasses} ${sizeClasses[category.planetSize]} ${category.color}`;
  };

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

      {/* Skill Galaxy */}
      <Card className="overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <CardHeader>
          <CardTitle className="text-white text-center text-2xl">
            🌌 Your AWS ML Knowledge Galaxy
          </CardTitle>
          <p className="text-gray-200 text-center">Each planet represents a skill area - watch them grow as you learn!</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative min-h-96 flex flex-wrap justify-center items-center gap-8">
            {/* Background stars */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Planets */}
            {categoryProgress.map((category, index) => (
              <Dialog key={category.id}>
                <DialogTrigger asChild>
                  <div className="relative group">
                    <div className={getPlanetClasses(category)}>
                      {/* Planet glow effect */}
                      <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse" />
                      
                      {/* Mastery indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {category.mastery}%
                        </span>
                      </div>

                      {/* Planet rings for high mastery */}
                      {category.mastery >= 75 && (
                        <div className="absolute inset-0 rounded-full border-2 border-white opacity-50 animate-spin" 
                             style={{ animationDuration: '10s' }} />
                      )}
                    </div>
                    
                    {/* Planet label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                        {category.name}
                      </span>
                    </div>

                    {/* Satellite for completed areas */}
                    {category.mastery >= 90 && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
                        <Star className="h-3 w-3 text-yellow-800 m-0.5" />
                      </div>
                    )}
                  </div>
                </DialogTrigger>

                {/* Detailed Modal */}
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${category.color}`} />
                      {category.name} - {getMasteryMessage(category.mastery)}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{category.mastery}% Mastery</div>
                        <div className="text-gray-600">
                          {category.correctAnswers} / {category.totalQuestions} questions correct
                        </div>
                      </div>
                      <div className="text-right">
                        <Progress value={category.mastery} className="w-32 mb-2" />
                        <Badge variant={category.mastery >= 75 ? 'default' : 'secondary'}>
                          {category.mastery >= 75 ? 'Mastered' : 'In Progress'}
                        </Badge>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-semibold mb-2">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => onPracticeCategory(category.id)}
                        className="flex-1"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Practice This Area
                      </Button>
                      
                      {category.mastery > 0 && (
                        <Button variant="outline" className="flex-1">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Review Mistakes
                        </Button>
                      )}
                    </div>

                    {/* Motivational Message */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <p className="text-center text-gray-700">
                        {category.mastery >= 90 && "🌟 Outstanding! You've mastered this area!"}
                        {category.mastery >= 75 && category.mastery < 90 && "🚀 Almost perfect! Just a bit more practice!"}
                        {category.mastery >= 50 && category.mastery < 75 && "📈 Great progress! Keep building your knowledge!"}
                        {category.mastery < 50 && "🎯 Every expert was once a beginner. You've got this!"}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Award className="h-5 w-5" />
              Your Strongest Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strongestAreas.length > 0 ? (
              <div className="space-y-3">
                {strongestAreas.map(area => (
                  <div key={area.id} className="flex items-center justify-between">
                    <span className="font-medium">{area.name}</span>
                    <Badge className="bg-green-100 text-green-800">{area.mastery}%</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Keep practicing to develop your strong areas! 💪
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Target className="h-5 w-5" />
              Areas to Focus On
            </CardTitle>
          </CardHeader>
          <CardContent>
            {focusAreas.length > 0 ? (
              <div className="space-y-3">
                {focusAreas.map(area => (
                  <div key={area.id} className="flex items-center justify-between">
                    <span className="font-medium">{area.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{area.mastery}%</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onPracticeCategory(area.id)}
                      >
                        Practice
                      </Button>
                    </div>
                  </div>
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
