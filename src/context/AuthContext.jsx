import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER_STATS, MOCK_QUIZZES, MOCK_ESSAY_PROMPTS, MOCK_MIND_MAPS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('iatividade_user');
    return saved ? JSON.parse(saved) : {
      id: 'u1',
      name: 'Maria Eduarda',
      email: 'maria@iatividade.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Professor / Criador',
      bio: 'Criando e aplicando atividades pedagógicas com apoio de IA.'
    };
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('iatividade_stats');
    return saved ? JSON.parse(saved) : MOCK_USER_STATS;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('iatividade_dark');
    return saved ? JSON.parse(saved) : false;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Custom Created Activities in LocalStorage
  const [customQuizzes, setCustomQuizzes] = useState(() => {
    const saved = localStorage.getItem('iatividade_custom_quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  const [customEssays, setCustomEssays] = useState(() => {
    const saved = localStorage.getItem('iatividade_custom_essays');
    return saved ? JSON.parse(saved) : [];
  });

  const [customMindMaps, setCustomMindMaps] = useState(() => {
    const saved = localStorage.getItem('iatividade_custom_mindmaps');
    return saved ? JSON.parse(saved) : [];
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('iatividade_api_key') || '';
  });

  useEffect(() => {
    localStorage.setItem('iatividade_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('iatividade_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('iatividade_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('iatividade_custom_quizzes', JSON.stringify(customQuizzes));
  }, [customQuizzes]);

  useEffect(() => {
    localStorage.setItem('iatividade_custom_essays', JSON.stringify(customEssays));
  }, [customEssays]);

  useEffect(() => {
    localStorage.setItem('iatividade_custom_mindmaps', JSON.stringify(customMindMaps));
  }, [customMindMaps]);

  useEffect(() => {
    localStorage.setItem('iatividade_api_key', apiKey);
  }, [apiKey]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const login = (email, password) => {
    setUser({
      id: 'u1',
      name: email.split('@')[0] || 'Usuário IAtividade',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'Professor / Criador',
      bio: 'Pronto para criar e aplicar atividades com apoio de Inteligência Artificial.'
    });
    setAuthModalOpen(false);
  };

  const logout = () => setUser(null);

  // Activity Creator Handlers
  const addCustomQuiz = (quizData) => {
    const newQuiz = {
      id: 'cq-' + Date.now(),
      isCustom: true,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      ...quizData
    };
    setCustomQuizzes(prev => [newQuiz, ...prev]);
    return newQuiz;
  };

  const deleteCustomQuiz = (id) => {
    setCustomQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const addCustomEssay = (essayData) => {
    const newEssay = {
      id: 'ce-' + Date.now(),
      isCustom: true,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      ...essayData
    };
    setCustomEssays(prev => [newEssay, ...prev]);
    return newEssay;
  };

  const deleteCustomEssay = (id) => {
    setCustomEssays(prev => prev.filter(e => e.id !== id));
  };

  const addCustomMindMap = (mapData) => {
    const newMap = {
      id: 'cmm-' + Date.now(),
      isCustom: true,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      ...mapData
    };
    setCustomMindMaps(prev => [newMap, ...prev]);
    return newMap;
  };

  const deleteCustomMindMap = (id) => {
    setCustomMindMaps(prev => prev.filter(m => m.id !== id));
  };

  const recordQuizResult = (subject, correctCount, totalQuestions) => {
    setStats(prev => {
      const newTotalTaken = prev.totalQuizzesTaken + 1;
      const newCorrect = prev.correctAnswersTotal + correctCount;
      const newTotal = prev.totalQuestionsTotal + totalQuestions;
      const newXp = prev.xpPoints + (correctCount * 50) + 20;

      const updatedMastery = prev.subjectMastery.map(m => {
        if (m.subject.toLowerCase() === subject.toLowerCase()) {
          const ratio = (correctCount / totalQuestions) * 100;
          return { ...m, score: Math.round((m.score + ratio) / 2) };
        }
        return m;
      });

      const newActivity = {
        id: 'act-' + Date.now(),
        type: 'quiz',
        title: `Quiz de ${subject}`,
        result: `${correctCount}/${totalQuestions} acertos (${Math.round((correctCount/totalQuestions)*100)}%)`,
        date: 'Agora mesmo'
      };

      return {
        ...prev,
        totalQuizzesTaken: newTotalTaken,
        correctAnswersTotal: newCorrect,
        totalQuestionsTotal: newTotal,
        xpPoints: newXp,
        subjectMastery: updatedMastery,
        recentActivities: [newActivity, ...prev.recentActivities.slice(0, 5)]
      };
    });
  };

  const recordEssayResult = (title, grade) => {
    setStats(prev => {
      const newSubmitted = prev.essaysSubmitted + 1;
      const newAvg = Math.round(((prev.averageEssayGrade * prev.essaysSubmitted) + grade) / newSubmitted);
      const newXp = prev.xpPoints + 150;

      const newActivity = {
        id: 'act-' + Date.now(),
        type: 'essay',
        title: title,
        result: `Nota: ${grade}/1000`,
        date: 'Agora mesmo'
      };

      return {
        ...prev,
        essaysSubmitted: newSubmitted,
        averageEssayGrade: newAvg,
        xpPoints: newXp,
        recentActivities: [newActivity, ...prev.recentActivities.slice(0, 5)]
      };
    });
  };

  // Combine default mock data with custom user created activities
  const allQuizzes = [...customQuizzes, ...MOCK_QUIZZES];
  const allEssays = [...customEssays, ...MOCK_ESSAY_PROMPTS];
  const allMindMaps = [...customMindMaps, ...MOCK_MIND_MAPS];

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        stats,
        darkMode,
        toggleDarkMode,
        login,
        logout,
        authModalOpen,
        setAuthModalOpen,
        customQuizzes,
        addCustomQuiz,
        deleteCustomQuiz,
        customEssays,
        addCustomEssay,
        deleteCustomEssay,
        customMindMaps,
        addCustomMindMap,
        deleteCustomMindMap,
        allQuizzes,
        allEssays,
        allMindMaps,
        apiKey,
        setApiKey,
        recordQuizResult,
        recordEssayResult
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
