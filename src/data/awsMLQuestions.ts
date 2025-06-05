
export interface Question {
  id: string;
  type: 'mcq' | 'trueFalse' | 'matching' | 'fillBlank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  moduleId: string;
  category: string;
  tags: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  questionsCount: number;
  requiredXP: number;
  color: string;
  categories: string[];
}

export const awsMLModules: Module[] = [
  {
    id: 'sagemaker-core',
    title: 'Amazon SageMaker Core',
    description: 'Plateforme ML entièrement gérée - Notebooks, Studio, Training, Inference',
    icon: '🤖',
    questionsCount: 25,
    requiredXP: 0,
    color: 'bg-blue-500',
    categories: ['SageMaker', 'Machine Learning', 'Training', 'Inference']
  },
  {
    id: 'data-storage',
    title: 'Stockage & Gestion de Données',
    description: 'S3, Glue, Athena, Redshift, Kinesis, Lake Formation',
    icon: '💾',
    questionsCount: 20,
    requiredXP: 50,
    color: 'bg-green-500',
    categories: ['Storage', 'ETL', 'Data Lake', 'Streaming']
  },
  {
    id: 'ai-services',
    title: 'Services IA de Haut Niveau',
    description: 'Rekognition, Comprehend, Textract, Translate, Polly, Transcribe',
    icon: '🧠',
    questionsCount: 18,
    requiredXP: 100,
    color: 'bg-purple-500',
    categories: ['Vision', 'NLP', 'Speech', 'Translation']
  },
  {
    id: 'mlops-security',
    title: 'MLOps, Sécurité & Surveillance',
    description: 'IAM, CloudWatch, Pipelines, Model Monitor, Security Best Practices',
    icon: '🔒',
    questionsCount: 17,
    requiredXP: 150,
    color: 'bg-orange-500',
    categories: ['MLOps', 'Security', 'Monitoring', 'Automation']
  }
];

export const awsMLQuestions: Question[] = [
  // SageMaker Core Questions
  {
    id: 'sm-core-1',
    type: 'mcq',
    question: 'Quel service AWS est une plateforme centrale entièrement gérée pour le cycle de vie du ML ?',
    options: ['Amazon SageMaker', 'Amazon EC2', 'AWS Lambda', 'Amazon EMR'],
    correctAnswer: 'Amazon SageMaker',
    explanation: 'SageMaker est la plateforme ML complète d\'AWS qui couvre tout le cycle de vie du machine learning, de la préparation des données au déploiement.',
    difficulty: 'easy',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['platform', 'machine-learning', 'managed-service']
  },
  {
    id: 'sm-core-2',
    type: 'trueFalse',
    question: 'SageMaker Ground Truth est un service de déploiement de modèles.',
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Faux',
    explanation: 'SageMaker Ground Truth est un service d\'étiquetage de données pour créer des jeux de données d\'entraînement de haute qualité, pas de déploiement.',
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['ground-truth', 'data-labeling']
  },
  {
    id: 'sm-core-3',
    type: 'fillBlank',
    question: 'SageMaker _______ est l\'IDE web unifié pour toutes les étapes du ML.',
    options: [],
    correctAnswer: 'Studio',
    explanation: 'SageMaker Studio est l\'environnement de développement intégré (IDE) web qui unifie tous les outils pour le machine learning.',
    difficulty: 'easy',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['studio', 'ide', 'development']
  },
  {
    id: 'sm-core-4',
    type: 'mcq',
    question: 'Quel service SageMaker permet l\'optimisation automatisée des hyperparamètres ?',
    options: ['Hyperparameter Tuning', 'Feature Store', 'Model Monitor', 'Data Wrangler'],
    correctAnswer: 'Hyperparameter Tuning',
    explanation: 'SageMaker Hyperparameter Tuning (HPO) optimise automatiquement les hyperparamètres du modèle pour améliorer les performances.',
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'Training',
    tags: ['hyperparameters', 'optimization', 'hpo']
  },
  {
    id: 'sm-core-5',
    type: 'mcq',
    question: 'Pour des prédictions à faible latence et haut débit, quel type d\'inférence SageMaker utilisez-vous ?',
    options: ['Real-time Endpoints', 'Batch Transform', 'Serverless Inference', 'Processing Jobs'],
    correctAnswer: 'Real-time Endpoints',
    explanation: 'Les Real-time Endpoints sont conçus pour des prédictions en temps réel avec une faible latence et un haut débit.',
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'Inference',
    tags: ['real-time', 'endpoints', 'latency']
  },

  // Data Storage Questions
  {
    id: 'data-1',
    type: 'fillBlank',
    question: 'Le service _______ est le stockage d\'objets principal d\'AWS.',
    options: [],
    correctAnswer: 'S3',
    explanation: 'Amazon S3 (Simple Storage Service) est le service de stockage d\'objets de référence d\'AWS pour tous types de données.',
    difficulty: 'easy',
    moduleId: 'data-storage',
    category: 'Storage',
    tags: ['s3', 'object-storage', 'data']
  },
  {
    id: 'data-2',
    type: 'mcq',
    question: 'Quel service AWS est un ETL entièrement géré ?',
    options: ['AWS Glue', 'Amazon Athena', 'Amazon Redshift', 'AWS Lambda'],
    correctAnswer: 'AWS Glue',
    explanation: 'AWS Glue est le service ETL (Extract, Transform, Load) entièrement géré d\'AWS pour la préparation et transformation des données.',
    difficulty: 'easy',
    moduleId: 'data-storage',
    category: 'ETL',
    tags: ['glue', 'etl', 'data-preparation']
  },
  {
    id: 'data-3',
    type: 'trueFalse',
    question: 'Amazon Athena permet de requêter des données dans S3 en utilisant SQL standard.',
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: 'Amazon Athena est un service de requêtage interactif qui permet d\'analyser des données dans S3 en utilisant SQL standard.',
    difficulty: 'easy',
    moduleId: 'data-storage',
    category: 'Analytics',
    tags: ['athena', 'sql', 's3', 'query']
  },
  {
    id: 'data-4',
    type: 'mcq',
    question: 'Pour l\'ingestion de flux de données en temps réel, quel service Kinesis utilisez-vous ?',
    options: ['Kinesis Data Streams', 'Kinesis Data Firehose', 'Kinesis Data Analytics', 'Kinesis Video Streams'],
    correctAnswer: 'Kinesis Data Streams',
    explanation: 'Kinesis Data Streams est conçu pour l\'ingestion de flux de données en temps réel avec une faible latence.',
    difficulty: 'medium',
    moduleId: 'data-storage',
    category: 'Streaming',
    tags: ['kinesis', 'streaming', 'real-time', 'ingestion']
  },
  {
    id: 'data-5',
    type: 'fillBlank',
    question: 'AWS _______ simplifie la création, sécurisation et gestion des lacs de données.',
    options: [],
    correctAnswer: 'Lake Formation',
    explanation: 'AWS Lake Formation facilite la configuration d\'un lac de données sécurisé en quelques jours au lieu de plusieurs mois.',
    difficulty: 'medium',
    moduleId: 'data-storage',
    category: 'Data Lake',
    tags: ['lake-formation', 'data-lake', 'security']
  },

  // AI Services Questions
  {
    id: 'ai-1',
    type: 'mcq',
    question: 'Quel service AWS permet la reconnaissance d\'images et de vidéos ?',
    options: ['Amazon Rekognition', 'Amazon Comprehend', 'Amazon Textract', 'Amazon Polly'],
    correctAnswer: 'Amazon Rekognition',
    explanation: 'Amazon Rekognition analyse les images et vidéos pour détecter objets, personnes, texte, scènes et activités.',
    difficulty: 'easy',
    moduleId: 'ai-services',
    category: 'Vision',
    tags: ['rekognition', 'computer-vision', 'image-analysis']
  },
  {
    id: 'ai-2',
    type: 'mcq',
    question: 'Pour l\'analyse de sentiments et l\'extraction d\'entités, quel service utilisez-vous ?',
    options: ['Amazon Comprehend', 'Amazon Translate', 'Amazon Lex', 'Amazon Kendra'],
    correctAnswer: 'Amazon Comprehend',
    explanation: 'Amazon Comprehend est le service NLP d\'AWS qui effectue l\'analyse de sentiments, l\'extraction d\'entités et la détection de langue.',
    difficulty: 'medium',
    moduleId: 'ai-services',
    category: 'NLP',
    tags: ['comprehend', 'nlp', 'sentiment-analysis']
  },
  {
    id: 'ai-3',
    type: 'trueFalse',
    question: 'Amazon Polly convertit la parole en texte.',
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Faux',
    explanation: 'Amazon Polly convertit le texte en parole (synthèse vocale). Amazon Transcribe convertit la parole en texte.',
    difficulty: 'easy',
    moduleId: 'ai-services',
    category: 'Speech',
    tags: ['polly', 'text-to-speech', 'transcribe']
  },
  {
    id: 'ai-4',
    type: 'fillBlank',
    question: 'Amazon _______ extrait du texte et des données à partir de documents numérisés.',
    options: [],
    correctAnswer: 'Textract',
    explanation: 'Amazon Textract utilise l\'apprentissage automatique pour extraire du texte et des données de documents numérisés.',
    difficulty: 'medium',
    moduleId: 'ai-services',
    category: 'Vision',
    tags: ['textract', 'ocr', 'document-analysis']
  },
  {
    id: 'ai-5',
    type: 'mcq',
    question: 'Pour créer des systèmes de recommandation personnalisés, quel service utilisez-vous ?',
    options: ['Amazon Personalize', 'Amazon Forecast', 'Amazon Kendra', 'Amazon Comprehend'],
    correctAnswer: 'Amazon Personalize',
    explanation: 'Amazon Personalize crée des systèmes de recommandation personnalisés basés sur l\'apprentissage automatique.',
    difficulty: 'medium',
    moduleId: 'ai-services',
    category: 'Recommendations',
    tags: ['personalize', 'recommendations', 'personalization']
  },

  // MLOps & Security Questions
  {
    id: 'mlops-1',
    type: 'mcq',
    question: 'Quel service AWS gère les utilisateurs, groupes, rôles et politiques pour contrôler l\'accès ?',
    options: ['AWS IAM', 'AWS KMS', 'Amazon VPC', 'AWS Secrets Manager'],
    correctAnswer: 'AWS IAM',
    explanation: 'AWS IAM (Identity and Access Management) gère l\'authentification et l\'autorisation pour contrôler l\'accès aux ressources AWS.',
    difficulty: 'easy',
    moduleId: 'mlops-security',
    category: 'Security',
    tags: ['iam', 'access-control', 'permissions']
  },
  {
    id: 'mlops-2',
    type: 'fillBlank',
    question: 'SageMaker _______ surveille les modèles en production pour détecter la dérive des données.',
    options: [],
    correctAnswer: 'Model Monitor',
    explanation: 'SageMaker Model Monitor surveille automatiquement les modèles pour détecter la dérive des données et la dégradation de la qualité.',
    difficulty: 'medium',
    moduleId: 'mlops-security',
    category: 'Monitoring',
    tags: ['model-monitor', 'data-drift', 'model-quality']
  },
  {
    id: 'mlops-3',
    type: 'trueFalse',
    question: 'AWS CloudTrail enregistre les appels d\'API AWS pour l\'audit et la sécurité.',
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: 'AWS CloudTrail enregistre tous les appels d\'API AWS, permettant l\'audit, la sécurité et le dépannage.',
    difficulty: 'easy',
    moduleId: 'mlops-security',
    category: 'Monitoring',
    tags: ['cloudtrail', 'audit', 'api-logging']
  },
  {
    id: 'mlops-4',
    type: 'mcq',
    question: 'Pour orchestrer des workflows ML complexes, quel service utilisez-vous ?',
    options: ['SageMaker Pipelines', 'AWS Step Functions', 'AWS Lambda', 'Amazon EventBridge'],
    correctAnswer: 'SageMaker Pipelines',
    explanation: 'SageMaker Pipelines est spécialement conçu pour orchestrer et automatiser les workflows de machine learning.',
    difficulty: 'medium',
    moduleId: 'mlops-security',
    category: 'MLOps',
    tags: ['pipelines', 'workflow', 'automation', 'ci-cd']
  },
  {
    id: 'mlops-5',
    type: 'mcq',
    question: 'Quel service détecte les biais dans les données et fournit l\'explicabilité des modèles ?',
    options: ['SageMaker Clarify', 'SageMaker Model Monitor', 'SageMaker Feature Store', 'SageMaker Data Wrangler'],
    correctAnswer: 'SageMaker Clarify',
    explanation: 'SageMaker Clarify détecte les biais dans les données et les modèles, et fournit l\'explicabilité des prédictions avec SHAP.',
    difficulty: 'hard',
    moduleId: 'mlops-security',
    category: 'MLOps',
    tags: ['clarify', 'bias-detection', 'explainability', 'shap']
  },

  // Advanced Questions
  {
    id: 'advanced-1',
    type: 'mcq',
    question: 'Pour des charges de travail d\'inférence intermittentes, quelle option SageMaker est la plus économique ?',
    options: ['Serverless Inference', 'Real-time Endpoints', 'Batch Transform', 'Multi-Model Endpoints'],
    correctAnswer: 'Serverless Inference',
    explanation: 'SageMaker Serverless Inference est pay-as-you-go et ideal pour les charges de travail intermittentes car il n\'y a pas de coûts quand il n\'y a pas de trafic.',
    difficulty: 'hard',
    moduleId: 'sagemaker-core',
    category: 'Inference',
    tags: ['serverless', 'cost-optimization', 'intermittent-workloads']
  },
  {
    id: 'advanced-2',
    type: 'trueFalse',
    question: 'Les Multi-Model Endpoints permettent d\'héberger plusieurs modèles sur un seul point de terminaison.',
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: 'Les Multi-Model Endpoints (MME) permettent d\'héberger jusqu\'à des milliers de modèles sur un seul point de terminaison, réduisant les coûts d\'hébergement.',
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'Inference',
    tags: ['multi-model-endpoints', 'cost-optimization', 'model-hosting']
  },
  {
    id: 'advanced-3',
    type: 'fillBlank',
    question: 'SageMaker _______ Store est un référentiel centralisé pour stocker et gérer les caractéristiques (features).',
    options: [],
    correctAnswer: 'Feature',
    explanation: 'SageMaker Feature Store centralise le stockage des caractéristiques pour l\'entraînement et l\'inférence, évitant la duplication et assurant la cohérence.',
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['feature-store', 'feature-management', 'ml-pipeline']
  }
];
