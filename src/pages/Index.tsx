
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
import { Trophy, Flame, Zap, Target, BookOpen, Award, Star, CheckCircle, XCircle, Play } from 'lucide-react';

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

interface Question {
  id: string;
  type: 'mcq' | 'trueFalse' | 'matching' | 'fillBlank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  moduleId: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  questionsCount: number;
  requiredXP: number;
  color: string;
}

// Données initiales des modules AWS ML
const initialModules: Module[] = [
  {
    id: 'sagemaker',
    title: 'Amazon SageMaker',
    description: 'Plateforme ML entièrement gérée',
    icon: '🤖',
    questionsCount: 15,
    requiredXP: 0,
    color: 'bg-blue-500'
  },
  {
    id: 'storage-data',
    title: 'Stockage & Données',
    description: 'S3, Redshift, DynamoDB',
    icon: '💾',
    questionsCount: 12,
    requiredXP: 50,
    color: 'bg-green-500'
  },
  {
    id: 'ai-services',
    title: 'Services IA de Haut Niveau',
    description: 'Rekognition, Comprehend, Textract',
    icon: '🧠',
    questionsCount: 10,
    requiredXP: 100,
    color: 'bg-purple-500'
  },
  {
    id: 'security-monitoring',
    title: 'Sécurité & Surveillance',
    description: 'IAM, CloudWatch, CloudTrail',
    icon: '🔒',
    questionsCount: 8,
    requiredXP: 150,
    color: 'bg-orange-500'
  }
];

// Questions initiales pour démonstration
const initialQuestions: Question[] = [
  {
    id: 'sm-1',
    type: 'mcq',
    question: 'Quel service AWS est une plateforme centrale entièrement gérée pour le cycle de vie du ML ?',
    options: ['Amazon SageMaker', 'Amazon EC2', 'AWS Lambda', 'Amazon EMR'],
    correctAnswer: 'Amazon SageMaker',
    explanation: 'SageMaker est la plateforme ML complète d\'AWS qui couvre tout le cycle de vie du machine learning.',
    difficulty: 'easy',
    moduleId: 'sagemaker'
  },
  {
    id: 'sm-2',
    type: 'trueFalse',
    question: 'SageMaker Ground Truth est un service de déploiement de modèles.',
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Faux',
    explanation: 'SageMaker Ground Truth est un service d\'étiquetage de données, pas de déploiement.',
    difficulty: 'medium',
    moduleId: 'sagemaker'
  },
  {
    id: 'storage-1',
    type: 'fillBlank',
    question: 'Le service _______ est le stockage d\'objets principal d\'AWS.',
    options: [],
    correctAnswer: 'S3',
    explanation: 'Amazon S3 (Simple Storage Service) est le service de stockage d\'objets de référence d\'AWS.',
    difficulty: 'easy',
    moduleId: 'storage-data'
  },
  {
    id: 'ai-1',
    type: 'mcq',
    question: 'Quel service AWS permet la reconnaissance d\'images et de vidéos ?',
    options: ['Amazon Rekognition', 'Amazon Comprehend', 'Amazon Textract', 'Amazon Polly'],
    correctAnswer: 'Amazon Rekognition',
    explanation: 'Amazon Rekognition analyse les images et vidéos pour détecter objets, personnes, texte, scènes et activités.',
    difficulty: 'medium',
    moduleId: 'ai-services'
  }
];

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
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
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
      const contentDoc = await getDoc(doc(db, `artifacts/${appId}/public/data/certiFlashContent`));
      
      if (!contentDoc.exists()) {
        // Ajouter le contenu initial
        await setDoc(doc(db, `artifacts/${appId}/public/data/certiFlashContent`), {
          modules: initialModules,
          questions: initialQuestions,
          version: '1.0',
          lastUpdated: new Date().toISOString()
        });
        console.log('Contenu initial ajouté à Firestore');
      }
      
      // Charger les questions
      setQuestions(initialQuestions);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du contenu:', error);
      // Utiliser les données locales en cas d'erreur
      setQuestions(initialQuestions);
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

  // Démarrer un module
  const startModule = (module: Module) => {
    setCurrentModule(module);
    setActiveTab('practice');
    
    // Filtrer les questions du module
    const moduleQuestions = questions.filter(q => q.moduleId === module.id);
    if (moduleQuestions.length > 0) {
      // Sélectionner une question aléatoire ou la première
      const randomQuestion = moduleQuestions[Math.floor(Math.random() * moduleQuestions.length)];
      setCurrentQuestion(randomQuestion);
      setSelectedAnswer('');
      setShowResult(false);
    }
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
    if (!currentModule) return;
    
    const moduleQuestions = questions.filter(q => q.moduleId === currentModule.id);
    const randomQuestion = moduleQuestions[Math.floor(Math.random() * moduleQuestions.length)];
    
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer('');
    setShowResult(false);
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

      {/* Navigation principale */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Modules</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Pratique</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Classement</span>
            </TabsTrigger>
          </TabsList>

          {/* Page d'accueil - Modules */}
          <TabsContent value="home" className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Maîtrisez AWS Machine Learning
              </h1>
              <p className="text-lg text-gray-600">
                Préparez votre certification MLS-C01 un flash à la fois
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialModules.map((module, index) => (
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
          </TabsContent>

          {/* Page de pratique */}
          <TabsContent value="practice" className="space-y-6">
            {!currentQuestion ? (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Choisissez un module</h2>
                <p className="text-gray-500">Sélectionnez un module depuis l'onglet Modules pour commencer à pratiquer</p>
                <Button onClick={() => setActiveTab('home')} className="mt-4">
                  Voir les modules
                </Button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{currentModule?.title}</Badge>
                      <Badge variant={currentQuestion.difficulty === 'hard' ? 'destructive' : currentQuestion.difficulty === 'medium' ? 'default' : 'secondary'}>
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
                    
                    {currentQuestion.type === 'mcq' && (
                      <div className="space-y-3">
                        {currentQuestion.options?.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === option ? 'default' : 'outline'}
                            className="w-full justify-start p-4 h-auto"
                            onClick={() => setSelectedAnswer(option)}
                            disabled={showResult}
                          >
                            <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {currentQuestion.type === 'trueFalse' && (
                      <div className="flex space-x-4">
                        <Button
                          variant={selectedAnswer === 'Vrai' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setSelectedAnswer('Vrai')}
                          disabled={showResult}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Vrai
                        </Button>
                        <Button
                          variant={selectedAnswer === 'Faux' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setSelectedAnswer('Faux')}
                          disabled={showResult}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Faux
                        </Button>
                      </div>
                    )}
                    
                    {currentQuestion.type === 'fillBlank' && (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={selectedAnswer}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          placeholder="Tapez votre réponse..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={showResult}
                        />
                      </div>
                    )}
                    
                    {showResult && (
                      <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Correct !' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-gray-700">{currentQuestion.explanation}</p>
                        {isCorrect && (
                          <p className="text-sm text-green-600 mt-2">
                            +{currentQuestion.difficulty === 'hard' ? 15 : currentQuestion.difficulty === 'medium' ? 10 : 5} XP, +1 jeton
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      {!showResult ? (
                        <Button 
                          onClick={submitAnswer} 
                          disabled={!selectedAnswer.trim()}
                          className="flex-1"
                        >
                          Valider
                        </Button>
                      ) : (
                        <Button onClick={nextQuestion} className="flex-1">
                          Question suivante
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Page de profil */}
          <TabsContent value="profile" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span>Votre Profil</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-700">{userData.xp}</div>
                      <div className="text-sm text-blue-600">XP Total</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-700">{userData.streak}</div>
                      <div className="text-sm text-orange-600">Jours de Suite</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">{userData.tokens}</div>
                      <div className="text-sm text-green-600">Jetons</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-700">{userData.level}</div>
                      <div className="text-sm text-purple-600">Niveau</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Progression vers le niveau suivant</h3>
                    <Progress value={(userData.xp % 100)} className="h-3" />
                    <p className="text-sm text-gray-600 mt-2">
                      {userData.xp % 100} / 100 XP vers le niveau {userData.level + 1}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Badges Obtenus</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-sm font-medium">Premier XP</div>
                      </div>
                      {userData.streak >= 7 && (
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl mb-2">🔥</div>
                          <div className="text-sm font-medium">Série de 7 jours</div>
                        </div>
                      )}
                      {userData.level >= 5 && (
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl mb-2">🚀</div>
                          <div className="text-sm font-medium">Expert AWS</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Page de classement */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <span>Classement Hebdomadaire</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Utilisateur actuel */}
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">Vous</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">Vous</div>
                        <div className="text-sm text-gray-600">Niveau {userData.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{userData.xp} XP</div>
                        <div className="text-sm text-gray-500">Cette semaine</div>
                      </div>
                    </div>
                    
                    {/* Utilisateurs fictifs pour la démonstration */}
                    {[
                      { name: 'Alice M.', level: userData.level - 1, xp: Math.max(0, userData.xp - 50) },
                      { name: 'Bob K.', level: userData.level - 1, xp: Math.max(0, userData.xp - 80) },
                      { name: 'Sarah L.', level: userData.level - 2, xp: Math.max(0, userData.xp - 120) }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 2}
                        </div>
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-gray-600">Niveau {user.level}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{user.xp} XP</div>
                          <div className="text-sm text-gray-500">Cette semaine</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CertiFlash;
