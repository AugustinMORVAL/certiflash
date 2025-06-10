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
    title: 'Services IA de High Level',
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
  },
  {
    id: 'expert-aws-ml',
    title: 'Expert AWS ML & Advanced Scenarios',
    description: 'Questions avancées et scénarios réels.',
    icon: '🧑‍💻',
    questionsCount: 10,
    requiredXP: 200,
    color: 'bg-black',
    categories: ['Expert AWS ML & Advanced Scenarios', 'SageMaker', 'Security', 'MLOps', 'Optimization']
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

// SageMaker Core & Lifecycle
export const awsMLSageMakerQuestions: Question[] = [
  {
    id: 'sm-ide-1',
    type: 'mcq',
    question: "Quel service SageMaker fournit un IDE web unifié pour toutes les étapes du ML ?",
    options: ['SageMaker Studio', 'SageMaker Ground Truth', 'SageMaker Data Wrangler', 'SageMaker JumpStart'],
    correctAnswer: 'SageMaker Studio',
    explanation: "SageMaker Studio est l'IDE web unifié pour le développement, l'entraînement et le déploiement de modèles ML.",
    difficulty: 'easy',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['studio', 'ide', 'ml-lifecycle']
  },
  {
    id: 'sm-groundtruth-1',
    type: 'trueFalse',
    question: "SageMaker Ground Truth permet d'étiqueter des données manuellement ou automatiquement.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "Ground Truth permet l'étiquetage de données par des humains ou via des workflows automatiques.",
    difficulty: 'easy',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['ground-truth', 'data-labeling']
  },
  {
    id: 'sm-featurestore-1',
    type: 'fillBlank',
    question: "SageMaker _______ Store est utilisé pour stocker et gérer les caractéristiques (features) pour l'entraînement et l'inférence.",
    options: [],
    correctAnswer: 'Feature',
    explanation: "SageMaker Feature Store centralise la gestion des features pour la cohérence entre entraînement et inférence.",
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['feature-store', 'feature-management']
  },
  {
    id: 'sm-hpo-1',
    type: 'mcq',
    question: "Quel composant SageMaker permet l'optimisation automatisée des hyperparamètres ?",
    options: ['Hyperparameter Tuning', 'Model Monitor', 'Data Wrangler', 'JumpStart'],
    correctAnswer: 'Hyperparameter Tuning',
    explanation: "Hyperparameter Tuning automatise la recherche des meilleurs hyperparamètres pour un modèle.",
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['hpo', 'hyperparameters']
  },
  {
    id: 'sm-inference-1',
    type: 'mcq',
    question: "Pour des prédictions à faible latence, quel type d'inférence SageMaker utilisez-vous ?",
    options: ['Real-time Endpoints', 'Batch Transform', 'Serverless Inference', 'Multi-Model Endpoints'],
    correctAnswer: 'Real-time Endpoints',
    explanation: "Les Real-time Endpoints sont conçus pour des prédictions en temps réel avec une faible latence.",
    difficulty: 'easy',
    moduleId: 'sagemaker-core',
    category: 'Inference',
    tags: ['real-time', 'endpoints', 'latency']
  },
  {
    id: 'sm-serverless-1',
    type: 'trueFalse',
    question: "SageMaker Serverless Inference est idéal pour les charges de travail d'inférence intermittentes.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "Serverless Inference facture uniquement à l'utilisation et n'a pas de coût à l'arrêt.",
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'Inference',
    tags: ['serverless', 'cost-optimization']
  },
  {
    id: 'sm-pipelines-1',
    type: 'mcq',
    question: "Quel service SageMaker permet d'orchestrer des workflows CI/CD pour le ML ?",
    options: ['SageMaker Pipelines', 'SageMaker Model Monitor', 'SageMaker JumpStart', 'SageMaker Studio'],
    correctAnswer: 'SageMaker Pipelines',
    explanation: "SageMaker Pipelines permet d'automatiser et d'orchestrer les étapes du cycle de vie ML.",
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'MLOps',
    tags: ['pipelines', 'ci-cd', 'workflow']
  },
  {
    id: 'sm-monitor-1',
    type: 'mcq',
    question: "Quel service surveille la dérive des données et la qualité des modèles en production ?",
    options: ['SageMaker Model Monitor', 'SageMaker Clarify', 'SageMaker Feature Store', 'SageMaker Data Wrangler'],
    correctAnswer: 'SageMaker Model Monitor',
    explanation: "Model Monitor détecte la dérive des données et la dégradation des performances des modèles.",
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'Monitoring',
    tags: ['model-monitor', 'data-drift', 'monitoring']
  },
  {
    id: 'sm-clarify-1',
    type: 'mcq',
    question: "Quel service SageMaker permet de détecter les biais et d'expliquer les prédictions ?",
    options: ['SageMaker Clarify', 'SageMaker Model Monitor', 'SageMaker JumpStart', 'SageMaker Studio'],
    correctAnswer: 'SageMaker Clarify',
    explanation: "Clarify détecte les biais et fournit l'explicabilité via SHAP.",
    difficulty: 'medium',
    moduleId: 'sagemaker-core',
    category: 'Explainability',
    tags: ['clarify', 'bias', 'explainability']
  },
  {
    id: 'sm-jumpstart-1',
    type: 'trueFalse',
    question: "SageMaker JumpStart donne accès à des modèles pré-entraînés et des solutions ML prêtes à l'emploi.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "JumpStart accélère le prototypage avec des modèles et notebooks prêts à l'emploi.",
    difficulty: 'easy',
    moduleId: 'sagemaker-core',
    category: 'SageMaker',
    tags: ['jumpstart', 'pretrained', 'solutions']
  },
];

// Data Storage & Management
export const awsMLDataStorageQuestions: Question[] = [
  {
    id: 'ds-s3-1',
    type: 'mcq',
    question: "Quel service AWS est le stockage d'objets principal pour les jeux de données ML ?",
    options: ['Amazon S3', 'Amazon Redshift', 'Amazon DynamoDB', 'Amazon EBS'],
    correctAnswer: 'Amazon S3',
    explanation: "S3 est le service de stockage d'objets de référence pour les données ML.",
    difficulty: 'easy',
    moduleId: 'data-storage',
    category: 'Storage',
    tags: ['s3', 'object-storage']
  },
  {
    id: 'ds-glue-1',
    type: 'mcq',
    question: "Quel service AWS est utilisé pour l'ETL et la préparation de données à grande échelle ?",
    options: ['AWS Glue', 'Amazon Athena', 'Amazon Redshift', 'AWS Lambda'],
    correctAnswer: 'AWS Glue',
    explanation: "Glue est le service ETL géré pour la préparation et la transformation des données.",
    difficulty: 'medium',
    moduleId: 'data-storage',
    category: 'ETL',
    tags: ['glue', 'etl', 'data-preparation']
  },
  {
    id: 'ds-athena-1',
    type: 'trueFalse',
    question: "Amazon Athena permet de requêter des données dans S3 avec SQL standard.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "Athena permet d'analyser les données S3 en SQL sans serveur.",
    difficulty: 'easy',
    moduleId: 'data-storage',
    category: 'Analytics',
    tags: ['athena', 'sql', 'analytics']
  },
  {
    id: 'ds-redshift-1',
    type: 'mcq',
    question: "Quel service AWS est un entrepôt de données (Data Warehouse) ?",
    options: ['Amazon Redshift', 'Amazon S3', 'Amazon DynamoDB', 'AWS Glue'],
    correctAnswer: 'Amazon Redshift',
    explanation: "Redshift est l'entrepôt de données pour l'analyse à grande échelle.",
    difficulty: 'medium',
    moduleId: 'data-storage',
    category: 'Data Warehouse',
    tags: ['redshift', 'data-warehouse']
  },
  {
    id: 'ds-kinesis-1',
    type: 'mcq',
    question: "Quel service AWS permet l'ingestion de données en streaming en temps réel ?",
    options: ['Kinesis Data Streams', 'Kinesis Data Firehose', 'Kinesis Data Analytics', 'Amazon S3'],
    correctAnswer: 'Kinesis Data Streams',
    explanation: "Kinesis Data Streams est conçu pour l'ingestion de flux de données en temps réel.",
    difficulty: 'medium',
    moduleId: 'data-storage',
    category: 'Streaming',
    tags: ['kinesis', 'streaming']
  },
  {
    id: 'ds-dynamodb-1',
    type: 'trueFalse',
    question: "Amazon DynamoDB est une base de données NoSQL adaptée au stockage de caractéristiques en ligne.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "DynamoDB offre une faible latence pour le stockage clé-valeur et document.",
    difficulty: 'medium',
    moduleId: 'data-storage',
    category: 'NoSQL',
    tags: ['dynamodb', 'nosql']
  },
];

// Compute & Containerization
export const awsMLComputeQuestions: Question[] = [
  {
    id: 'cc-ec2-1',
    type: 'mcq',
    question: "Quel service AWS fournit des instances CPU/GPU pour l'entraînement ML personnalisé ?",
    options: ['Amazon EC2', 'AWS Lambda', 'Amazon SageMaker', 'Amazon ECR'],
    correctAnswer: 'Amazon EC2',
    explanation: "EC2 permet de choisir des instances adaptées au ML, mais SageMaker est souvent préféré.",
    difficulty: 'medium',
    moduleId: 'compute',
    category: 'Compute',
    tags: ['ec2', 'gpu', 'cpu']
  },
  {
    id: 'cc-lambda-1',
    type: 'trueFalse',
    question: "AWS Lambda peut être utilisé pour déclencher des pipelines ML ou des prétraitements légers.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "Lambda est utile pour l'automatisation et le calcul événementiel dans les workflows ML.",
    difficulty: 'easy',
    moduleId: 'compute',
    category: 'Serverless',
    tags: ['lambda', 'serverless']
  },
  {
    id: 'cc-ecr-1',
    type: 'mcq',
    question: "Quel service AWS stocke et gère les images Docker utilisées par SageMaker ?",
    options: ['Amazon ECR', 'Amazon ECS', 'Amazon S3', 'AWS Glue'],
    correctAnswer: 'Amazon ECR',
    explanation: "ECR est le registre de conteneurs Docker pour AWS.",
    difficulty: 'medium',
    moduleId: 'compute',
    category: 'Containers',
    tags: ['ecr', 'docker', 'containers']
  },
];

// AI Services
export const awsMLAIServicesQuestions: Question[] = [
  {
    id: 'ai-rekognition-1',
    type: 'mcq',
    question: "Quel service AWS analyse des images et vidéos pour détecter objets et visages ?",
    options: ['Amazon Rekognition', 'Amazon Comprehend', 'Amazon Polly', 'Amazon Textract'],
    correctAnswer: 'Amazon Rekognition',
    explanation: "Rekognition fournit des API pour l'analyse d'images et vidéos.",
    difficulty: 'easy',
    moduleId: 'ai-services',
    category: 'Vision',
    tags: ['rekognition', 'vision']
  },
  {
    id: 'ai-comprehend-1',
    type: 'mcq',
    question: "Quel service AWS effectue l'analyse de sentiments et l'extraction d'entités ?",
    options: ['Amazon Comprehend', 'Amazon Translate', 'Amazon Lex', 'Amazon Kendra'],
    correctAnswer: 'Amazon Comprehend',
    explanation: "Comprehend est le service NLP d'AWS.",
    difficulty: 'medium',
    moduleId: 'ai-services',
    category: 'NLP',
    tags: ['comprehend', 'nlp']
  },
  {
    id: 'ai-translate-1',
    type: 'trueFalse',
    question: "Amazon Translate permet la traduction automatique de texte.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "Translate fournit des API de traduction multilingue.",
    difficulty: 'easy',
    moduleId: 'ai-services',
    category: 'Translation',
    tags: ['translate', 'translation']
  },
  {
    id: 'ai-polly-1',
    type: 'mcq',
    question: "Quel service AWS convertit du texte en parole (synthèse vocale) ?",
    options: ['Amazon Polly', 'Amazon Transcribe', 'Amazon Lex', 'Amazon Comprehend'],
    correctAnswer: 'Amazon Polly',
    explanation: "Polly synthétise la parole à partir de texte.",
    difficulty: 'easy',
    moduleId: 'ai-services',
    category: 'Speech',
    tags: ['polly', 'speech']
  },
  {
    id: 'ai-forecast-1',
    type: 'mcq',
    question: "Quel service AWS est utilisé pour la prévision de séries temporelles ?",
    options: ['Amazon Forecast', 'Amazon Personalize', 'Amazon Kendra', 'Amazon Textract'],
    correctAnswer: 'Amazon Forecast',
    explanation: "Forecast permet la prévision de séries temporelles avec ML.",
    difficulty: 'medium',
    moduleId: 'ai-services',
    category: 'Forecast',
    tags: ['forecast', 'time-series']
  },
];

// Security, Monitoring, Orchestration
export const awsMLSecurityQuestions: Question[] = [
  {
    id: 'sec-iam-1',
    type: 'mcq',
    question: "Quel service AWS gère les utilisateurs, rôles et politiques d'accès ?",
    options: ['AWS IAM', 'AWS KMS', 'AWS Secrets Manager', 'Amazon VPC'],
    correctAnswer: 'AWS IAM',
    explanation: "IAM contrôle l'accès aux ressources AWS.",
    difficulty: 'easy',
    moduleId: 'mlops-security',
    category: 'Security',
    tags: ['iam', 'security']
  },
  {
    id: 'sec-kms-1',
    type: 'trueFalse',
    question: "AWS KMS gère les clés de chiffrement pour protéger les données.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "KMS gère les clés de chiffrement pour la sécurité des données.",
    difficulty: 'medium',
    moduleId: 'mlops-security',
    category: 'Security',
    tags: ['kms', 'encryption']
  },
  {
    id: 'sec-cloudwatch-1',
    type: 'mcq',
    question: "Quel service AWS surveille les métriques et logs des ressources ML ?",
    options: ['Amazon CloudWatch', 'AWS CloudTrail', 'AWS Step Functions', 'Amazon S3'],
    correctAnswer: 'Amazon CloudWatch',
    explanation: "CloudWatch collecte et surveille les métriques et logs AWS.",
    difficulty: 'medium',
    moduleId: 'mlops-security',
    category: 'Monitoring',
    tags: ['cloudwatch', 'monitoring']
  },
  {
    id: 'sec-cloudtrail-1',
    type: 'trueFalse',
    question: "AWS CloudTrail enregistre les appels d'API AWS pour l'audit.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "CloudTrail permet l'audit et la traçabilité des actions AWS.",
    difficulty: 'easy',
    moduleId: 'mlops-security',
    category: 'Audit',
    tags: ['cloudtrail', 'audit']
  },
  {
    id: 'sec-stepfunctions-1',
    type: 'mcq',
    question: "Quel service orchestre des workflows serverless pour les pipelines ML complexes ?",
    options: ['AWS Step Functions', 'AWS Lambda', 'Amazon ECS', 'Amazon S3'],
    correctAnswer: 'AWS Step Functions',
    explanation: "Step Functions orchestre des workflows impliquant plusieurs services AWS.",
    difficulty: 'medium',
    moduleId: 'mlops-security',
    category: 'Orchestration',
    tags: ['step-functions', 'orchestration']
  },
];

// ML Concepts & MLOps
export const awsMLConceptsQuestions: Question[] = [
  {
    id: 'mlc-types-1',
    type: 'mcq',
    question: "Quel type d'apprentissage consiste à prédire une étiquette à partir de données annotées ?",
    options: ['Supervisé', 'Non supervisé', 'Par renforcement', 'Auto-encodé'],
    correctAnswer: 'Supervisé',
    explanation: "L'apprentissage supervisé utilise des données annotées pour entraîner un modèle.",
    difficulty: 'easy',
    moduleId: 'ml-concepts',
    category: 'ML Concepts',
    tags: ['supervised', 'learning-type']
  },
  {
    id: 'mlc-featureeng-1',
    type: 'mcq',
    question: "Quelle technique d'ingénierie des caractéristiques consiste à transformer des variables catégorielles en variables binaires ?",
    options: ['One-hot encoding', 'Normalisation', 'Standardisation', 'Réduction de dimension'],
    correctAnswer: 'One-hot encoding',
    explanation: "Le one-hot encoding transforme chaque catégorie en une colonne binaire.",
    difficulty: 'medium',
    moduleId: 'ml-concepts',
    category: 'Feature Engineering',
    tags: ['feature-engineering', 'encoding']
  },
  {
    id: 'mlc-overfit-1',
    type: 'trueFalse',
    question: "Le surapprentissage (overfitting) se produit quand un modèle généralise mal sur de nouvelles données.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "L'overfitting signifie que le modèle s'adapte trop aux données d'entraînement.",
    difficulty: 'medium',
    moduleId: 'ml-concepts',
    category: 'Model Evaluation',
    tags: ['overfitting', 'evaluation']
  },
  {
    id: 'mlc-metrics-1',
    type: 'mcq',
    question: "Quelle métrique est utilisée pour évaluer un modèle de classification binaire ?",
    options: ['AUC-ROC', 'MSE', 'R²', 'MAE'],
    correctAnswer: 'AUC-ROC',
    explanation: "AUC-ROC mesure la capacité du modèle à distinguer les classes.",
    difficulty: 'medium',
    moduleId: 'ml-concepts',
    category: 'Model Evaluation',
    tags: ['metrics', 'classification']
  },
  {
    id: 'mlc-hpo-1',
    type: 'mcq',
    question: "Quelle méthode d'optimisation d'hyperparamètres consiste à tester toutes les combinaisons possibles ?",
    options: ['Grid search', 'Random search', 'Optimisation bayésienne', 'Early stopping'],
    correctAnswer: 'Grid search',
    explanation: "Le grid search teste systématiquement toutes les combinaisons d'hyperparamètres.",
    difficulty: 'medium',
    moduleId: 'ml-concepts',
    category: 'Hyperparameter Tuning',
    tags: ['hpo', 'grid-search']
  },
];

// --- BEGIN: Advanced/Expert AWS ML Questions ---
export const awsMLAdvancedQuestions: Question[] = [
  {
    id: 'adv-sagemaker-pipeline-debug',
    type: 'mcq',
    question: "Vous avez un pipeline SageMaker qui échoue lors de l'étape d'entraînement. Quelle est la meilleure première action pour diagnostiquer le problème ?",
    options: [
      "Consulter les logs CloudWatch de l'étape d'entraînement",
      "Redémarrer le pipeline sans modification",
      "Supprimer et recréer le pipeline",
      "Augmenter la taille de l'instance EC2 utilisée"
    ],
    correctAnswer: "Consulter les logs CloudWatch de l'étape d'entraînement",
    explanation: "Les logs CloudWatch fournissent des informations détaillées sur les erreurs et l'exécution de chaque étape du pipeline.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['sagemaker', 'debug', 'cloudwatch', 'pipelines']
  },
  {
    id: 'adv-vpc-endpoint',
    type: 'trueFalse',
    question: "Configurer un VPC endpoint pour SageMaker permet d'isoler le trafic réseau et d'améliorer la sécurité des points de terminaison ML.",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "Les VPC endpoints permettent de garder le trafic réseau privé et sécurisé entre vos ressources AWS.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['vpc', 'security', 'networking']
  },
  {
    id: 'adv-cost-optimization',
    type: 'mcq',
    question: "Quelle stratégie permet de réduire les coûts d'entraînement sur SageMaker pour des workloads ponctuels ?",
    options: [
      "Utiliser des instances Spot",
      "Utiliser uniquement des instances GPU",
      "Augmenter la taille du dataset",
      "Activer le multi-model endpoint"
    ],
    correctAnswer: "Utiliser des instances Spot",
    explanation: "Les instances Spot offrent des réductions de coût importantes pour les tâches non critiques.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['cost', 'spot', 'optimization']
  },
  {
    id: 'adv-byo-container',
    type: 'fillBlank',
    question: "Pour utiliser un algorithme personnalisé non supporté nativement, vous pouvez créer un conteneur Docker et l'utiliser avec SageMaker via l'option _______.",
    options: [],
    correctAnswer: 'BYOC',
    explanation: "BYOC (Bring Your Own Container) permet d'utiliser des conteneurs Docker personnalisés pour l'entraînement ou l'inférence.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['byoc', 'docker', 'custom-algorithm']
  },
  {
    id: 'adv-multi-model-endpoint',
    type: 'mcq',
    question: "Quel est l'avantage principal des Multi-Model Endpoints (MME) dans SageMaker ?",
    options: [
      "Héberger plusieurs modèles sur un seul endpoint pour réduire les coûts",
      "Augmenter la vitesse d'entraînement",
      "Permettre l'entraînement distribué",
      "Activer la surveillance automatique des modèles"
    ],
    correctAnswer: "Héberger plusieurs modèles sur un seul endpoint pour réduire les coûts",
    explanation: "Les MME permettent d'héberger et de servir plusieurs modèles sur un même endpoint, optimisant ainsi les coûts d'infrastructure.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['mme', 'multi-model', 'cost']
  },
  {
    id: 'adv-mlops-cicd',
    type: 'mcq',
    question: "Quel service AWS permet d'automatiser le déploiement de pipelines ML avec intégration continue ?",
    options: [
      "AWS CodePipeline",
      "Amazon Athena",
      "AWS Glue",
      "Amazon Kinesis"
    ],
    correctAnswer: "AWS CodePipeline",
    explanation: "CodePipeline permet d'automatiser les workflows CI/CD pour les projets ML sur AWS.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['mlops', 'cicd', 'automation']
  },
  {
    id: 'adv-data-leak',
    type: 'trueFalse',
    question: "L'utilisation de données de test lors de l'entraînement d'un modèle peut entraîner une fuite de données (data leakage).",
    options: ['Vrai', 'Faux'],
    correctAnswer: 'Vrai',
    explanation: "La fuite de données biaise l'évaluation du modèle et doit être évitée.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['data-leakage', 'evaluation']
  },
  {
    id: 'adv-clarify-bias',
    type: 'mcq',
    question: "SageMaker Clarify peut être utilisé pour :",
    options: [
      "Détecter les biais dans les données et les modèles",
      "Optimiser les hyperparamètres",
      "Gérer les conteneurs Docker",
      "Créer des notebooks Jupyter"
    ],
    correctAnswer: "Détecter les biais dans les données et les modèles",
    explanation: "Clarify analyse les biais et fournit des rapports d'explicabilité.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['clarify', 'bias', 'explainability']
  },
  {
    id: 'adv-spot-interruption',
    type: 'mcq',
    question: "Que se passe-t-il si une instance Spot utilisée pour l'entraînement ML est interrompue ?",
    options: [
      "Le job d'entraînement est arrêté et doit être relancé",
      "Le job continue sans interruption",
      "Les données sont automatiquement sauvegardées dans S3",
      "L'instance est convertie en instance à la demande"
    ],
    correctAnswer: "Le job d'entraînement est arrêté et doit être relancé",
    explanation: "Les interruptions Spot nécessitent une gestion de la tolérance aux pannes dans les workflows ML.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['spot', 'interruption', 'fault-tolerance']
  },
  {
    id: 'adv-data-format',
    type: 'fillBlank',
    question: "Le format _______ est recommandé pour les données d'entraînement volumineuses dans SageMaker (binaire, efficace pour le streaming).",
    options: [],
    correctAnswer: 'RecordIO-protobuf',
    explanation: "RecordIO-protobuf est optimisé pour les gros volumes de données et le streaming dans SageMaker.",
    difficulty: 'hard',
    moduleId: 'expert-aws-ml',
    category: 'Expert AWS ML & Advanced Scenarios',
    tags: ['data-format', 'recordio', 'sagemaker']
  }
];
// --- END: Advanced/Expert AWS ML Questions ---

