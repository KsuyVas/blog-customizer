import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
  // Состояние для применённых стилей статьи
  const [appliedStyles, setAppliedStyles] = useState<ArticleStateType>(defaultArticleState);
  
  // Состояние для открытия/закрытия сайдбара
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Функция переключения сайдбара
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Функция применения стилей (поднимает состояние наверх)
  const applyStyles = (newStyles: ArticleStateType) => {
    setAppliedStyles(newStyles);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedStyles.fontFamilyOption.value,
          '--font-size': appliedStyles.fontSizeOption.value,
          '--font-color': appliedStyles.fontColor.value,
          '--container-width': appliedStyles.contentWidth.value,
          '--bg-color': appliedStyles.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onApply={applyStyles}
        currentStyles={appliedStyles}
      />
      <Article />
    </main>
  );
};