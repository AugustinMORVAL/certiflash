import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { type Question } from '@/data/awsMLQuestions';

interface QuizPageProps {
  question: Question;
  quizProgress: number;
  totalQuestions: number;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  showResult: boolean;
  isCorrect: boolean;
}

const QuizPage: React.FC<QuizPageProps> = ({
  question,
  quizProgress,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  onNextQuestion,
  showResult,
  isCorrect,
}) => {
  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  const renderOptions = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? 'default' : 'outline'}
                className={`w-full justify-start p-6 h-auto text-base text-left break-words whitespace-normal ${
                  showResult && (Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(option) : question.correctAnswer === option)
                    ? 'bg-green-100 border-green-300'
                    : ''
                } ${
                  showResult && selectedAnswer === option && !isCorrect
                    ? 'bg-red-100 border-red-300'
                    : ''
                }`}
                onClick={() => onSelectAnswer(option)}
                disabled={showResult}
              >
                <span className="mr-4 font-bold text-lg">{getOptionLetter(index)}</span>
                <span>{option}</span>
              </Button>
            ))}
          </div>
        );
      case 'trueFalse':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option, index) => (
                 <Button
                 key={index}
                 variant={selectedAnswer === option ? 'default' : 'outline'}
                 className={`w-full justify-center p-6 h-auto text-base ${
                   showResult && (Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(option) : question.correctAnswer === option)
                     ? 'bg-green-100 border-green-300'
                     : ''
                 } ${
                   showResult && selectedAnswer === option && !isCorrect
                     ? 'bg-red-100 border-red-300'
                     : ''
                 }`}
                 onClick={() => onSelectAnswer(option)}
                 disabled={showResult}
               >
                 {option === 'Vrai' ? <CheckCircle className="h-6 w-6 mr-2" /> : <XCircle className="h-6 w-6 mr-2" />}
                 {option}
               </Button>
            ))}
          </div>
        );
      case 'fillBlank':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => onSelectAnswer(e.target.value)}
              placeholder="Votre réponse..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={showResult}
            />
            {showResult && (
                <p className="text-lg">Réponse correcte : <span className="font-bold text-green-600">{Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}</span></p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-500">Question {quizProgress + 1} sur {totalQuestions}</p>
            <Progress value={(quizProgress / totalQuestions) * 100} className="h-3 flex-1" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{question.question}</h1>
        <div className="flex flex-wrap gap-2">
            <Badge variant={question.difficulty === 'hard' ? 'destructive' : question.difficulty === 'medium' ? 'default' : 'secondary'}>
                {question.difficulty}
            </Badge>
            {/* {question.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
            ))} */}
        </div>
      </div>

      <div className="flex-grow p-4">
        {renderOptions()}
      </div>

      <footer className="w-full">
        {showResult && (
           <div className={`p-6 rounded-t-2xl ${isCorrect ? 'bg-green-100/80' : 'bg-red-100/80'} border-t-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                <div className="flex items-start">
                    <div className="mr-4">
                        {isCorrect ? <CheckCircle className="h-10 w-10 text-green-500" /> : <XCircle className="h-10 w-10 text-red-500" />}
                    </div>
                    <div className="flex-grow">
                        <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? 'Excellent !' : 'Réponse incorrecte'}
                        </h2>
                        <p className="text-base text-gray-700 mt-1">{question.explanation}</p>
                    </div>
                    <Button onClick={onNextQuestion} className={`mt-2 ml-4 self-end ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                        Continuer
                    </Button>
                </div>
           </div>
        )}
        
        {!showResult && (
            <div className="p-4 border-t-2 border-gray-100">
                <Button onClick={onSubmitAnswer} disabled={!selectedAnswer.trim()} size="lg" className="w-full text-lg">
                    Vérifier
                </Button>
            </div>
        )}
      </footer>
    </div>
  );
};

export default QuizPage; 