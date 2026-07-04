import { getDevPost, getMediumPost } from "@arifszn/blog-js";
import axios, { AxiosError } from "axios";
import { formatDistance } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
	FiArrowUpRight,
	FiDownload,
	FiGithub,
	FiMapPin,
	FiMoon,
	FiStar,
	FiSun,
} from "react-icons/fi";
import "../assets/index.css";
import { LOCAL_STORAGE_KEY_NAME } from "../constants";
import {
	type CustomError,
	GENERIC_ERROR,
	INVALID_CONFIG_ERROR,
	INVALID_GITHUB_USERNAME_ERROR,
	setTooManyRequestError,
} from "../constants/errors";
import type { Article } from "../interfaces/article";
import type { GithubProject } from "../interfaces/github-project";
import type { Profile } from "../interfaces/profile";
import type {
	SanitizedConfig,
	SanitizedSocial,
} from "../interfaces/sanitized-config";
import {
	getInitialTheme,
	getLanguageColor,
	getSanitizedConfig,
	setupHotjar,
} from "../utils";
import ErrorPage from "./error-page";
import HeadTagEditor from "./head-tag-editor";

type Theme = "light" | "dark";

const socialUrls: Partial<
	Record<keyof SanitizedSocial, (value: string) => string>
> = {
	linkedin: (value) => `https://www.linkedin.com/in/${value}`,
	twitter: (value) => `https://twitter.com/${value}`,
	mastodon: (value) => value,
	researchGate: (value) => `https://www.researchgate.net/profile/${value}`,
	facebook: (value) => `https://facebook.com/${value}`,
	instagram: (value) => `https://instagram.com/${value}`,
	reddit: (value) => `https://reddit.com/u/${value}`,
	threads: (value) => `https://threads.net/@${value}`,
	youtube: (value) => `https://youtube.com/@${value}`,
	udemy: (value) => `https://udemy.com/user/${value}`,
	dribbble: (value) => `https://dribbble.com/${value}`,
	behance: (value) => `https://behance.net/${value}`,
	medium: (value) => `https://medium.com/@${value}`,
	dev: (value) => `https://dev.to/${value}`,
	stackoverflow: (value) => `https://stackoverflow.com/users/${value}`,
	website: (value) => value,
	skype: (value) => `skype:${value}?chat`,
	telegram: (value) => `https://t.me/${value}`,
	phone: (value) => `tel:${value}`,
	email: (value) => `mailto:${value}`,
};

const socialLabels: Partial<Record<keyof SanitizedSocial, string>> = {
	linkedin: "LinkedIn",
	twitter: "X / Twitter",
	mastodon: "Mastodon",
	researchGate: "ResearchGate",
	facebook: "Facebook",
	instagram: "Instagram",
	reddit: "Reddit",
	threads: "Threads",
	youtube: "YouTube",
	udemy: "Udemy",
	dribbble: "Dribbble",
	behance: "Behance",
	medium: "Medium",
	dev: "DEV",
	stackoverflow: "Stack Overflow",
	website: "Website",
	skype: "Skype",
	telegram: "Telegram",
	phone: "Phone",
	email: "Email",
};

const asciiName = String.raw`
     ██╗██╗   ██╗ █████╗ ███╗   ██╗     ██╗ ██████╗
     ██║██║   ██║██╔══██╗████╗  ██║     ██║██╔═══██╗
     ██║██║   ██║███████║██╔██╗ ██║     ██║██║   ██║
██   ██║██║   ██║██╔══██║██║╚██╗██║██   ██║██║   ██║
╚█████╔╝╚██████╔╝██║  ██║██║ ╚████║╚█████╔╝╚██████╔╝
 ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚════╝  ╚═════╝`;

const GitProfile = ({ config }: { config: Config }) => {
	const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
		getSanitizedConfig(config),
	);
	const [theme, setTheme] = useState<Theme>("dark");
	const [error, setError] = useState<CustomError | null>(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);
	const [articles, setArticles] = useState<Article[]>([]);

	const getGithubProjects = useCallback(
		async (publicRepoCount: number): Promise<GithubProject[]> => {
			if (sanitizedConfig.projects.github.mode === "automatic") {
				if (publicRepoCount === 0) return [];

				const excluded =
					sanitizedConfig.projects.github.automatic.exclude.projects
						.map((project) => `+-repo:${project}`)
						.join("");
				const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excluded}`;
				const response = await axios.get(
					`https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`,
				);
				return response.data.items;
			}

			const configuredProjects =
				sanitizedConfig.projects.github.manual.projects;
			if (configuredProjects.length === 0) return [];

			const repos = configuredProjects
				.map((project) => `+repo:${project}`)
				.join("");
			const response = await axios.get(
				`https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`,
			);
			const order = new Map(
				configuredProjects.map((project, index) => [
					project.split("/").pop()?.toLowerCase(),
					index,
				]),
			);

			return response.data.items.sort(
				(a: GithubProject, b: GithubProject) =>
					(order.get(a.name.toLowerCase()) ?? 0) -
					(order.get(b.name.toLowerCase()) ?? 0),
			);
		},
		[sanitizedConfig],
	);

	const handleError = useCallback((caughtError: AxiosError | Error) => {
		console.error("Error:", caughtError);
		if (!(caughtError instanceof AxiosError)) {
			setError(GENERIC_ERROR);
			return;
		}

		if (caughtError.response?.status === 404) {
			setError(INVALID_GITHUB_USERNAME_ERROR);
			return;
		}

		if (caughtError.response?.status === 403) {
			const resetHeader = caughtError.response?.headers?.["x-ratelimit-reset"];
			const reset = resetHeader
				? formatDistance(new Date(Number(resetHeader) * 1000), new Date(), {
						addSuffix: true,
					})
				: "later";
			setError(setTooManyRequestError(reset));
			return;
		}

		setError(GENERIC_ERROR);
	}, []);

	const loadData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`https://api.github.com/users/${sanitizedConfig.github.username}`,
			);
			const data = response.data;
			setProfile({
				avatar: data.avatar_url,
				name: data.name || sanitizedConfig.github.username,
				bio: data.bio || "",
				location: data.location || "",
				company: data.company || "",
			});

			if (sanitizedConfig.projects.github.display) {
				setGithubProjects(await getGithubProjects(data.public_repos));
			}
		} catch (caughtError) {
			handleError(caughtError as AxiosError | Error);
		} finally {
			setLoading(false);
		}
	}, [getGithubProjects, handleError, sanitizedConfig]);

	useEffect(() => {
		if (Object.keys(sanitizedConfig).length === 0) {
			setError(INVALID_CONFIG_ERROR);
			return;
		}

		const initialTheme = getInitialTheme(sanitizedConfig.themeConfig);
		setTheme(initialTheme === "light" ? "light" : "dark");
		setupHotjar(sanitizedConfig.hotjar);
		loadData();
	}, [loadData, sanitizedConfig]);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		document.documentElement.style.colorScheme = theme;
	}, [theme]);

	useEffect(() => {
		if (!sanitizedConfig.blog.display) return;
		const request =
			sanitizedConfig.blog.source === "medium"
				? getMediumPost({ user: sanitizedConfig.blog.username })
				: getDevPost({ user: sanitizedConfig.blog.username });

		request
			.then((response) => setArticles(response as Article[]))
			.catch((caughtError) =>
				console.error("Unable to load blog posts:", caughtError),
			);
	}, [sanitizedConfig.blog]);

	const socialLinks = useMemo(
		() =>
			(
				Object.entries(sanitizedConfig.social) as [
					keyof SanitizedSocial,
					string | undefined,
				][]
			)
				.filter((entry): entry is [keyof SanitizedSocial, string] =>
					Boolean(entry[1]),
				)
				.map(([key, value]) => ({
					key,
					label: socialLabels[key] || key,
					url: socialUrls[key]?.(value) || value,
				})),
		[sanitizedConfig.social],
	);

	const skillGroups = useMemo(() => {
		const groups = [
			{ label: "Languages / Backend", skills: [] as string[] },
			{ label: "Data / Infrastructure", skills: [] as string[] },
			{ label: "Frontend / Tools", skills: [] as string[] },
		];
		sanitizedConfig.skills.forEach((skill, index) => {
			groups[index % groups.length].skills.push(skill);
		});
		return groups;
	}, [sanitizedConfig.skills]);

	const toggleTheme = () => {
		const nextTheme: Theme = theme === "dark" ? "light" : "dark";
		localStorage.setItem(LOCAL_STORAGE_KEY_NAME, nextTheme);
		setTheme(nextTheme);
	};

	if (error) {
		return (
			<ErrorPage
				status={error.status}
				title={error.title}
				subTitle={error.subTitle}
			/>
		);
	}

	const displayName =
		profile?.name || sanitizedConfig.github.username || "Developer";
	let sectionNumber = 1;

	return (
		<HelmetProvider>
			<HeadTagEditor
				googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
				appliedTheme={theme}
			/>
			<div className="terminal-site">
				<header className="terminal-nav">
					<a className="terminal-brand" href="#hero">
						{sanitizedConfig.github.username}
					</a>
					<nav aria-label="Main navigation">
						<a href="#projects">Projects</a>
						<a href="#stack">Stack</a>
						<a href="#experience">Experience</a>
						<a href="#education">Education</a>
					</nav>
					<div className="nav-actions">
						<button
							type="button"
							className="theme-button"
							onClick={toggleTheme}
							aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
						>
							{theme === "dark" ? <FiSun /> : <FiMoon />}
						</button>
						{sanitizedConfig.resume.fileUrl && (
							<a
								className="download-button"
								href={sanitizedConfig.resume.fileUrl}
								target="_blank"
								rel="noreferrer"
							>
								<FiDownload /> Download Resume
							</a>
						)}
					</div>
				</header>

				<main className="terminal-main">
					<section className="terminal-window" id="hero">
						<div className="terminal-bar">
							<div className="window-controls" aria-hidden="true">
								<span />
								<span />
								<span />
							</div>
							<span>guest@{sanitizedConfig.github.username}:~</span>
							<span className="terminal-shortcuts">
								^P Search &nbsp; ^C Exit
							</span>
						</div>
						<div className="terminal-body">
							<p className="command">$ cat welcome.txt</p>
							<pre className="ascii-name" aria-label={displayName}>
								{asciiName}
							</pre>
							<h1>AI & Backend Developer</h1>
							<p className="terminal-intro">
								{profile?.bio ||
									"Building robust, scalable infrastructure and high-performance user interfaces. Root access granted to explore projects, experience, and technical capabilities."}
							</p>
							<div className="system-meta">
								<span className="hired">[+] STATUS: HIRED</span>
								{profile?.location && (
									<span>
										<FiMapPin /> [x] LOCATION: {profile.location}
									</span>
								)}
								{profile?.company && <span>[x] ORG: {profile.company}</span>}
							</div>
						</div>
					</section>

					{sanitizedConfig.skills.length > 0 && (
						<section className="terminal-section" id="stack">
							<SectionHeading number={sectionNumber++} title="STACK" />
							<div className="stack-columns">
								{skillGroups.map((group) => (
									<div className="stack-group" key={group.label}>
										<h3>{group.label}</h3>
										<ul>
											{group.skills.map((skill) => (
												<li key={skill}>
													<span>[+]</span> {skill}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</section>
					)}

					{sanitizedConfig.projects.external.projects.length > 0 && (
						<section className="terminal-section" id="projects">
							<SectionHeading
								number={sectionNumber++}
								title={sanitizedConfig.projects.external.header}
							/>
							<div className="terminal-card-grid">
								{sanitizedConfig.projects.external.projects.map(
									(project, index) => (
										<a
											className="terminal-card project-terminal-card"
											href={project.link}
											target="_blank"
											rel="noreferrer"
											key={`${project.title}-${index}`}
										>
											<FiArrowUpRight className="corner-icon" />
											<span className="file-label">
												[{project.title.toLowerCase().replace(/\s+/g, "_")}.app]
											</span>
											<h3>{project.title}</h3>
											<p>{project.description}</p>
											<span className="card-action">[ OPEN PROJECT ]</span>
										</a>
									),
								)}
							</div>
						</section>
					)}

					{sanitizedConfig.experiences.length > 0 && (
						<section className="terminal-section" id="experience">
							<SectionHeading number={sectionNumber++} title="EXPERIENCE" />
							<div className="experience-list">
								{sanitizedConfig.experiences.map((experience, index) => (
									<article
										className="experience-row"
										key={`${experience.company}-${experience.from}-${index}`}
									>
										<time>
											{experience.from} — {experience.to}
										</time>
										<div>
											<h3>{experience.position}</h3>
											{experience.companyLink ? (
												<a
													className="accent-link"
													href={experience.companyLink}
													target="_blank"
													rel="noreferrer"
												>
													{experience.company} <FiArrowUpRight />
												</a>
											) : (
												<p className="accent-link">{experience.company}</p>
											)}
										</div>
									</article>
								))}
							</div>
						</section>
					)}

					{sanitizedConfig.educations.length > 0 && (
						<section className="terminal-section" id="education">
							<SectionHeading number={sectionNumber++} title="EDUCATION" />
							<div className="experience-list">
								{sanitizedConfig.educations.map((education, index) => (
									<article
										className="experience-row"
										key={`${education.institution}-${education.from}-${index}`}
									>
										<time>
											{education.from} — {education.to}
										</time>
										<div>
											<h3>{education.degree}</h3>
											<p className="accent-link">{education.institution}</p>
										</div>
									</article>
								))}
							</div>
						</section>
					)}

					{sanitizedConfig.projects.github.display && (
						<section className="terminal-section">
							<div className="heading-with-link">
								<SectionHeading
									number={sectionNumber++}
									title={sanitizedConfig.projects.github.header}
								/>
								<a
									href={`https://github.com/${sanitizedConfig.github.username}?tab=repositories`}
									target="_blank"
									rel="noreferrer"
								>
									[ VIEW ALL ] <FiArrowUpRight />
								</a>
							</div>
							<div className="terminal-card-grid">
								{loading
									? [0, 1, 2, 3].map((item) => (
											<div className="terminal-card loading-card" key={item} />
										))
									: githubProjects.map((project) => (
											<a
												className="terminal-card repo-terminal-card"
												href={project.html_url}
												target="_blank"
												rel="noreferrer"
												key={project.name}
											>
												<FiArrowUpRight className="corner-icon" />
												<FiGithub className="repo-icon" />
												<h3>{project.name}</h3>
												<p>{project.description || "Open-source project."}</p>
												<div className="repo-meta">
													{project.language && (
														<span>
															<i
																style={{
																	backgroundColor: getLanguageColor(
																		project.language,
																	),
																}}
															/>
															{project.language}
														</span>
													)}
													<span>
														<FiStar /> {project.stargazers_count}
													</span>
												</div>
											</a>
										))}
							</div>
						</section>
					)}

					{sanitizedConfig.certifications.length > 0 && (
						<section className="terminal-section">
							<SectionHeading number={sectionNumber++} title="CERTIFICATIONS" />
							<div className="terminal-card-grid">
								{sanitizedConfig.certifications.map((certification, index) => (
									<a
										className="terminal-card"
										href={certification.link}
										target="_blank"
										rel="noreferrer"
										key={`${certification.name}-${index}`}
									>
										<span className="file-label">[{certification.year}]</span>
										<h3>{certification.name}</h3>
										<p>{certification.body}</p>
									</a>
								))}
							</div>
						</section>
					)}

					{sanitizedConfig.publications.length > 0 && (
						<section className="terminal-section">
							<SectionHeading number={sectionNumber++} title="PUBLICATIONS" />
							<div className="terminal-card-grid">
								{sanitizedConfig.publications.map((publication, index) => (
									<a
										className="terminal-card"
										href={publication.link}
										target="_blank"
										rel="noreferrer"
										key={`${publication.title}-${index}`}
									>
										<span className="file-label">
											[
											{publication.conferenceName ||
												publication.journalName ||
												"publication"}
											]
										</span>
										<h3>{publication.title}</h3>
										{publication.authors && <p>{publication.authors}</p>}
										{publication.description && (
											<p>{publication.description}</p>
										)}
									</a>
								))}
							</div>
						</section>
					)}

					{sanitizedConfig.blog.display && articles.length > 0 && (
						<section className="terminal-section">
							<SectionHeading number={sectionNumber++} title="WRITING" />
							<div className="article-list">
								{articles
									.slice(0, sanitizedConfig.blog.limit)
									.map((article) => (
										<a
											href={article.link}
											target="_blank"
											rel="noreferrer"
											key={article.link}
										>
											<span className="file-label">
												[
												{formatDistance(
													new Date(article.publishedAt),
													new Date(),
													{ addSuffix: true },
												)}
												]
											</span>
											<h3>{article.title}</h3>
											<p>{article.description}</p>
											<FiArrowUpRight />
										</a>
									))}
							</div>
						</section>
					)}
				</main>

				<footer className="terminal-footer">
					<div>
						<strong>{sanitizedConfig.github.username}</strong>
						<span>
							{sanitizedConfig.footer ? (
								<span
									dangerouslySetInnerHTML={{ __html: sanitizedConfig.footer }}
								/>
							) : (
								`© ${new Date().getFullYear()} ${displayName}. ROOT ACCESS GRANTED.`
							)}
						</span>
					</div>
					<div className="footer-socials">
						<a
							href={`https://github.com/${sanitizedConfig.github.username}`}
							target="_blank"
							rel="noreferrer"
						>
							GitHub
						</a>
						{socialLinks.map(({ key, label, url }) => (
							<a href={url} target="_blank" rel="noreferrer" key={key}>
								{label}
							</a>
						))}
					</div>
				</footer>
			</div>
		</HelmetProvider>
	);
};

const SectionHeading = ({
	number,
	title,
}: {
	number: number;
	title: string;
}) => (
	<h2 className="numbered-heading">
		<span>{String(number).padStart(2, "0")}.</span>
		{title}
	</h2>
);

export default GitProfile;
