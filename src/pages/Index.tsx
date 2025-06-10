import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Flame, Zap, Target, BookOpen, Award, Star, CheckCircle, XCircle, Play, Home, ArrowLeft } from 'lucide-react';
import HomePage from '@/components/HomePage';
import QuizPage from '@/components/QuizPage';
import { awsMLModules, awsMLQuestions, type Question, type Module } from '@/data/awsMLQuestions';

// Configuration Firebase et variables globales
const appId = typeof window !== 'undefined' && (window as any).__app_id ? (window as any).__app_id : 'certiflash-demo';
const firebaseConfig = typeof window !== 'undefined' && (window as any).__firebase_config 
  ? JSON.parse((window as any).__firebase_config) 
  : {
      apiKey: "demo-key",
      authDomain: "demo.firebaseapp.com",
      projectId: "demo-project",
      storageBucket: "demo.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:demo"
    };
const initialAuthToken = typeof window !== 'undefined' && (window as any).__initial_auth_token ? (window as any).__initial_auth_token : '';

// Types et interfaces
interface UserData {
  xp: number;
  streak: number;
  tokens: number;
  level: number;
  completedModules: string[];
  lastActive: string;
  questionHistory: { [questionId: string]: { correct: number; incorrect: number; lastAnswered: string } };
}

const CertiFlash: React.FC = () => {
  // États de l'application
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData>({
    xp: 0,
    streak: 0,
    tokens: 0,
    level: 1,
    completedModules: [],
    lastActive: new Date().toISOString(),
    questionHistory: {}
  });
  const [currentLearningPath, setCurrentLearningPath] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Initialisation Firebase
  useEffect(() => {
    const initFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        
        // Authentification
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            console.log('Utilisateur connecté:', user.uid);
            
            // Charger les données utilisateur
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/userData`);
            
            // Écouter les changements en temps réel
            onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                setUserData(doc.data() as UserData);
              } else {
                // Créer un nouveau profil utilisateur
                const newUserData: UserData = {
                  xp: 0,
                  streak: 0,
                  tokens: 10,
                  level: 1,
                  completedModules: [],
                  lastActive: new Date().toISOString(),
                  questionHistory: {}
                };
                setDoc(userDocRef, newUserData);
                setUserData(newUserData);
              }
            });
            
            // Initialiser le contenu si nécessaire
            await initializeContent(db);
            
            setLoading(false);
          }
        });
        
        // Connexion
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
        
      } catch (error) {
        console.error('Erreur d\'initialisation Firebase:', error);
        setLoading(false);
      }
    };
    
    initFirebase();
  }, []);

  // Initialiser le contenu dans Firestore
  const initializeContent = async (db: any) => {
    try {
      // Vérifier si le contenu existe déjà
      const contentDoc = await getDoc(doc(db, `artifacts/${appId}/public/data/awsMLContent`));
      
      if (!contentDoc.exists()) {
        // Ajouter le contenu initial
        await setDoc(doc(db, `artifacts/${appId}/public/data/awsMLContent`), {
          modules: awsMLModules,
          questions: awsMLQuestions,
          version: '2.0',
          lastUpdated: new Date().toISOString()
        });
        console.log('Contenu AWS ML mis à jour dans Firestore');
      }
      
      // Charger les questions
      setQuestions(awsMLQuestions);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du contenu:', error);
      // Utiliser les données locales en cas d'erreur
      setQuestions(awsMLQuestions);
    }
  };

  // Sauvegarder les données utilisateur
  const saveUserData = async (newUserData: UserData) => {
    if (!user) return;
    
    try {
      const db = getFirestore();
      const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/userData`);
      await setDoc(userDocRef, newUserData);
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
    }
  };

  // Sélectionner un parcours d'apprentissage
  const selectLearningPath = (pathId: string) => {
    setCurrentLearningPath(pathId);
    if (pathId === 'aws-ml') {
      setActiveTab('modules');
    } else {
      // Pour les autres parcours, afficher un message "Bientôt disponible"
      setActiveTab('coming-soon');
    }
  };

  // Démarrer un module
  const startModule = (module: Module) => {
    setCurrentModule(module);
    setActiveTab('practice');

    // Always fallback to local data if questions is empty
    const sourceQuestions = questions.length > 0 ? questions : awsMLQuestions;
    const moduleQuestions = sourceQuestions.filter(q => q.moduleId === module.id);
    const shuffledQuestions = [...moduleQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 5);

    if (selectedQuestions.length > 0) {
      setQuizQuestions(selectedQuestions);
      setCurrentQuestion(selectedQuestions[0]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuizQuestions([]);
      setCurrentQuestion(null);
    }
  };

  // Retour à l'accueil
  const goHome = () => {
    setCurrentLearningPath(null);
    setCurrentModule(null);
    setCurrentQuestion(null);
    setActiveTab('home');
  };

  // Retour aux modules
  const goToModules = () => {
    setCurrentModule(null);
    setCurrentQuestion(null);
    setActiveTab('modules');
  };

  // Soumettre une réponse
  const submitAnswer = () => {
    if (!currentQuestion || !selectedAnswer.trim()) return;
    
    // Fix the TypeScript error by ensuring we handle both string and string[] cases
    const correctAnswerStr = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer[0] 
      : currentQuestion.correctAnswer;
    
    const correct = selectedAnswer.toLowerCase().trim() === correctAnswerStr.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);
    
    // Calculer les points
    const xpGained = correct ? (currentQuestion.difficulty === 'hard' ? 15 : currentQuestion.difficulty === 'medium' ? 10 : 5) : 0;
    const tokensGained = correct ? 1 : 0;
    
    // Mettre à jour les données utilisateur
    const newUserData = {
      ...userData,
      xp: userData.xp + xpGained,
      tokens: userData.tokens + tokensGained,
      level: Math.floor((userData.xp + xpGained) / 100) + 1,
      lastActive: new Date().toISOString(),
      questionHistory: {
        ...userData.questionHistory,
        [currentQuestion.id]: {
          correct: (userData.questionHistory[currentQuestion.id]?.correct || 0) + (correct ? 1 : 0),
          incorrect: (userData.questionHistory[currentQuestion.id]?.incorrect || 0) + (correct ? 0 : 1),
          lastAnswered: new Date().toISOString()
        }
      }
    };
    
    setUserData(newUserData);
    saveUserData(newUserData);
  };

  // Question suivante
  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer('');

    if (currentQuestionIndex < quizQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(quizQuestions[nextIndex]);
    } else {
      // Le quiz est terminé
      console.log('Quiz terminé!');
      goToModules(); // Pour l'instant, retourne aux modules
    }
  };

  // Rendu de l'écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Chargement de CertiFlash...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header avec stats utilisateur */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {(currentLearningPath || currentModule) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={currentModule ? goToModules : goHome}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {currentModule ? 'Modules' : 'Accueil'}
                </Button>
              )}
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                CertiFlash ⚡
              </div>
              <Badge variant="outline" className="text-xs">
                ID: {user?.uid?.slice(-8) || 'demo'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">{userData.xp} XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">{userData.streak} jours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">{userData.tokens} jetons</span>
              </div>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  Nv.{userData.level}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <HomePage userData={userData} onSelectPath={selectLearningPath} />
        )}

        {activeTab === 'modules' && currentLearningPath === 'aws-ml' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AWS Machine Learning Certification
              </h1>
              <p className="text-lg text-gray-600">
                Maîtrisez tous les services AWS pour réussir votre certification MLS-C01
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awsMLModules.map((module, index) => (
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
                      onClick={() => startModule(module)}
                      disabled={userData.xp < module.requiredXP}
                      className="w-full group-hover:scale-105 transition-transform"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Commencer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'coming-soon' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Bientôt disponible !</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ce parcours d'apprentissage est en cours de développement.
            </p>
            <Button onClick={goHome} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </div>
        )}

        {activeTab === 'practice' && (
          <>
            {currentQuestion && quizQuestions.length > 0 ? (
              <QuizPage
                question={currentQuestion}
                quizProgress={currentQuestionIndex}
                totalQuestions={quizQuestions.length}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={setSelectedAnswer}
                onSubmitAnswer={submitAnswer}
                onNextQuestion={nextQuestion}
                showResult={showResult}
                isCorrect={isCorrect}
              />
            ) : (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  {currentModule ? "Chargement des questions..." : "Choisissez un module"}
                </h2>
                <p className="text-gray-500">
                    {currentModule ? "Préparation de votre session de révision." : "Sélectionnez un module pour commencer à pratiquer"}
                </p>
                {!currentModule && (
                    <Button onClick={goToModules} className="mt-4">
                        Voir les modules
                    </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CertiFlash;
