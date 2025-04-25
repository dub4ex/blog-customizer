import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';

import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

export interface IArticleParamsFormProps {
	setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = (props: IArticleParamsFormProps) => {
	const { setArticleState } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [articleFormState, setArticleFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	/* Универсальный обработчик выбора какого-либо селекта*/
	const handleChange =
		(prop: keyof ArticleStateType) => (value: OptionType) => {
			setArticleFormState({ ...articleFormState, [prop]: value });
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(articleFormState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(defaultArticleState);
		setArticleFormState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: toggleIsOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={articleFormState.fontFamilyOption}
						title='шрифт'
						onChange={(value) => handleChange('fontFamilyOption')(value)}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={articleFormState.fontSizeOption}
						title='размер шрифта'
						onChange={(value) => handleChange('fontSizeOption')(value)}
					/>
					<Select
						selected={articleFormState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(value) => handleChange('fontColor')(value)}
					/>
					<Separator />
					<Select
						selected={articleFormState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(value) => handleChange('backgroundColor')(value)}
					/>
					<Select
						selected={articleFormState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(value) => handleChange('contentWidth')(value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
