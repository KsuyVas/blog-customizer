import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  isOpen: boolean;
  onToggle: () => void;
  onApply: (styles: ArticleStateType) => void;
  currentStyles: ArticleStateType;
};

export const ArticleParamsForm = ({
  isOpen,
  onToggle,
  onApply,
  currentStyles,
}: ArticleParamsFormProps) => {
  const [formStyles, setFormStyles] = useState<ArticleStateType>(currentStyles);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setFormStyles(currentStyles);
  }, [currentStyles]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const handleStyleChange = (key: keyof ArticleStateType, value: any) => {
    setFormStyles((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formStyles);
  };

  const handleReset = () => {
    setFormStyles(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />
      <aside
        ref={sidebarRef}
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formStyles.fontFamilyOption}
            onChange={(option) => handleStyleChange('fontFamilyOption', option)}
          />
          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formStyles.fontSizeOption}
            onChange={(option) => handleStyleChange('fontSizeOption', option)}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formStyles.fontColor}
            onChange={(option) => handleStyleChange('fontColor', option)}
          />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formStyles.backgroundColor}
            onChange={(option) => handleStyleChange('backgroundColor', option)}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formStyles.contentWidth}
            onChange={(option) => handleStyleChange('contentWidth', option)}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" onClick={handleReset} />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};