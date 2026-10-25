import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER_STATS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('iatividade_user');
    return saved ? JSON.parse(saved) : {
      id: 'u1',
      name: 'Maria Eduarda',
      email: 'maria@iatividade.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Estudante',
      bio: 'Focada nos exames e no domínio da língua e ciências.'
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

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const login = (email, password) => {
    setUser({
      id: 'u1',
      name: email.split('@')[0] || 'Usuário IAtividade',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'Estudante VIP',
      bio: 'Pronto para dominar os conteúdos com apoio de Inteligência Artificial.'
    });
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
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
        recordQuizResult,
        recordEssayResult
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
