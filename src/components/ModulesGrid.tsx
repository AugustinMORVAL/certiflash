import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  requiredXP: number;
  questionsCount: number;
  categories: string[];
}

interface UserData {
  xp: number;
  completedModules: string[];
}

interface ModulesGridProps {
  modules: Module[];
  userData: UserData;
  onStartModule: (module: Module) => void;
}

const ModulesGrid: React.FC<ModulesGridProps> = ({ modules, userData, onStartModule }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${module.color} text-white text-2xl w-fit`}>
                  {module.icon}
                </div>
                {userData.xp >= module.requiredXP ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <div className="text-sm text-gray-500">{module.requiredXP} XP requis</div>
                )}
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{module.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{module.questionsCount} questions</span>
                <Progress value={userData.completedModules.includes(module.id) ? 100 : 0} className="w-20" />
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {module.categories.slice(0, 3).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
              <Button 
                onClick={() => onStartModule(module)}
                className="w-full group-hover:scale-105 transition-transform"
                disabled={userData.xp < module.requiredXP}
              >
                <Play className="h-4 w-4 mr-2" />
                Commencer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModulesGrid; 