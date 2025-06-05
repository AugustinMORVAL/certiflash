
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Star, Trophy, Flame, Zap } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  estimatedHours: number;
  isLocked: boolean;
  requiredXP: number;
  color: string;
}

interface HomePageProps {
  userData: any;
  onSelectPath: (pathId: string) => void;
}

const learningPaths: LearningPath[] = [
  {
    id: 'aws-ml',
    title: 'AWS Machine Learning',
    description: 'Maîtrisez la certification AWS MLS-C01 avec SageMaker, services d\'IA et MLOps',
    icon: '🤖',
    progress: 0,
    totalModules: 4,
    completedModules: 0,
    difficulty: 'Intermédiaire',
    estimatedHours: 25,
    isLocked: false,
    requiredXP: 0,
    color: 'bg-gradient-to-br from-blue-500 to-purple-600'
  },
  {
    id: 'aws-solutions-architect',
    title: 'AWS Solutions Architect',
    description: 'Préparez la certification SAA-C03 avec EC2, VPC, S3 et architecture cloud',
    icon: '🏗️',
    progress: 0,
    totalModules: 6,
    completedModules: 0,
    difficulty: 'Intermédiaire',
    estimatedHours: 35,
    isLocked: true,
    requiredXP: 200,
    color: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 'aws-developer',
    title: 'AWS Developer',
    description: 'Certification DVA-C02 : Lambda, API Gateway, DynamoDB et développement cloud',
    icon: '💻',
    progress: 0,
    totalModules: 5,
    completedModules: 0,
    difficulty: 'Intermédiaire',
    estimatedHours: 30,
    isLocked: true,
    requiredXP: 150,
    color: 'bg-gradient-to-br from-green-500 to-teal-600'
  },
  {
    id: 'aws-devops',
    title: 'AWS DevOps Engineer',
    description: 'Certification DOP-C02 : CI/CD, CloudFormation, monitoring et automatisation',
    icon: '⚙️',
    progress: 0,
    totalModules: 7,
    completedModules: 0,
    difficulty: 'Avancé',
    estimatedHours: 40,
    isLocked: true,
    requiredXP: 300,
    color: 'bg-gradient-to-br from-purple-500 to-pink-600'
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes & Containers',
    description: 'Maîtrisez les conteneurs avec Docker, Kubernetes et l\'orchestration',
    icon: '🚢',
    progress: 0,
    totalModules: 5,
    completedModules: 0,
    difficulty: 'Avancé',
    estimatedHours: 28,
    isLocked: true,
    requiredXP: 250,
    color: 'bg-gradient-to-br from-indigo-500 to-blue-600'
  },
  {
    id: 'azure-fundamentals',
    title: 'Microsoft Azure Fundamentals',
    description: 'Certification AZ-900 : concepts cloud, services Azure et gouvernance',
    icon: '☁️',
    progress: 0,
    totalModules: 4,
    completedModules: 0,
    difficulty: 'Débutant',
    estimatedHours: 20,
    isLocked: true,
    requiredXP: 100,
    color: 'bg-gradient-to-br from-blue-600 to-cyan-600'
  }
];

const HomePage: React.FC<HomePageProps> = ({ userData, onSelectPath }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermédiaire': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Avancé': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Maîtrisez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">certifications</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Un flash à la fois. Transformez votre apprentissage avec notre méthode gamifiée.
          </p>
          
          {/* Stats rapides */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-600">
                <Star className="h-6 w-6 text-yellow-500" />
                <span>{userData.xp}</span>
              </div>
              <div className="text-sm text-gray-600">XP Total</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-orange-600">
                <Flame className="h-6 w-6 text-orange-500" />
                <span>{userData.streak}</span>
              </div>
              <div className="text-sm text-gray-600">Jours de suite</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-green-600">
                <Trophy className="h-6 w-6 text-green-500" />
                <span>{userData.level}</span>
              </div>
              <div className="text-sm text-gray-600">Niveau</div>
            </div>
          </div>
        </div>
      </div>

      {/* Parcours d'apprentissage */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Parcours d'Apprentissage</h2>
          <Badge variant="outline" className="text-sm">
            {learningPaths.filter(p => !p.isLocked || userData.xp >= p.requiredXP).length} / {learningPaths.length} disponibles
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPaths.map((path) => {
            const isAvailable = !path.isLocked || userData.xp >= path.requiredXP;
            
            return (
              <Card 
                key={path.id} 
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                  isAvailable ? 'hover:scale-105' : 'opacity-75'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${path.color} text-white text-3xl shadow-lg`}>
                      {path.icon}
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {isAvailable ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Lock className="h-6 w-6 text-gray-400" />
                      )}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(path.difficulty)}`}
                      >
                        {path.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {path.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{path.totalModules} modules</span>
                    <span>{path.estimatedHours}h estimées</span>
                  </div>
                  
                  {path.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progression</span>
                        <span className="font-medium">{Math.round(path.progress)}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  )}
                  
                  {!isAvailable && (
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-500 mb-2">
                        <Zap className="h-4 w-4 inline mr-1" />
                        {path.requiredXP} XP requis
                      </p>
                      <div className="text-xs text-gray-400">
                        Plus que {path.requiredXP - userData.xp} XP à gagner
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => isAvailable && onSelectPath(path.id)}
                    disabled={!isAvailable}
                    className={`w-full group-hover:scale-105 transition-transform ${
                      path.id === 'aws-ml' ? path.color + ' text-white border-0' : ''
                    }`}
                    variant={path.id === 'aws-ml' ? 'default' : 'outline'}
                  >
                    {isAvailable ? (
                      path.progress > 0 ? 'Continuer' : 'Commencer'
                    ) : (
                      'Verrouillé'
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Section Coming Soon */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Bientôt disponible</h3>
        <p className="text-gray-600 mb-4">
          Plus de certifications arrivent : Google Cloud, Terraform, Docker, et bien plus !
        </p>
        <Button variant="outline" size="sm">
          Être notifié
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
