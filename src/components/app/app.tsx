import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [appliedStyles, setAppliedStyles] =
		useState<ArticleStateType>(defaultArticleState);

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
				onApply={setAppliedStyles}
				currentStyles={appliedStyles}
			/>
			<Article />
		</main>
	);
};
