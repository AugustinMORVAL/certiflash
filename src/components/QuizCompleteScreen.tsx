import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, ArrowLeft, RefreshCw, ArrowRight } from 'lucide-react';

interface QuizCompleteScreenProps {
  correctCount: number;
  totalQuestions: number;
  onRetry: () => void;
  onNextModule: () => void;
  onReturnToModules: () => void;
}

const QuizCompleteScreen: React.FC<QuizCompleteScreenProps> = ({
  correctCount,
  totalQuestions,
  onRetry,
  onNextModule,
  onReturnToModules,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let frame: number;
    if (animatedScore < correctCount) {
      frame = window.setTimeout(() => setAnimatedScore(animatedScore + 1), 60);
    }
    return () => clearTimeout(frame);
  }, [animatedScore, correctCount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-xl animate-fade-in-up">
        <CardContent className="flex flex-col items-center py-10">
          <Trophy className="h-16 w-16 text-yellow-400 mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz terminé !</h2>
          <div className="flex items-center space-x-2 mb-6">
            <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
            <span className="text-4xl font-extrabold text-blue-700">
              {animatedScore}
            </span>
            <span className="text-2xl font-semibold text-gray-600">/ {totalQuestions}</span>
          </div>
          <div className="flex flex-col space-y-3 w-full mt-4">
            <Button onClick={onRetry} variant="default" className="w-full flex items-center justify-center">
              <RefreshCw className="h-5 w-5 mr-2" /> Recommencer
            </Button>
            <div className="flex flex-row space-x-3 w-full justify-between">
              <Button onClick={onReturnToModules} variant="outline" className="flex-1 flex items-center justify-start">
                <ArrowLeft className="h-5 w-5 mr-2" /> Retour
              </Button>
              <Button onClick={onNextModule} variant="secondary" className="flex-1 flex items-center justify-end">
                Module suivant <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCompleteScreen; 