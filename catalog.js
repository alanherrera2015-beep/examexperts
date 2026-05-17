const academicPlans = [
    {
        title: 'K-8 Literacy Foundations',
        summary: 'Reading, writing, grammar, and vocabulary pathways aligned to K-8 course sequences.',
        tags: ['K-8', 'literacy', 'reading', 'writing', 'academic'],
        source: 'k-8.tex',
        courses: [
            'Kindergarten English/Language Arts',
            'Grade 1 English/Language Arts',
            'Grade 2 English/Language Arts',
            'Grade 3 English/Language Arts',
            'Grade 4 English/Language Arts',
            'Grade 5 English/Language Arts',
            'Grade 6 English/Language Arts',
            'Grade 7 English/Language Arts',
            'Grade 8 English/Language Arts'
        ]
    },
    {
        title: 'K-8 Math Pathways',
        summary: 'K-8 math progression from number sense and operations through fractions and pre-algebra readiness.',
        tags: ['K-8', 'math', 'elementary', 'middle school', 'academic'],
        source: 'k-8.tex',
        courses: [
            'Kindergarten Mathematics',
            'Grade 1 Mathematics',
            'Grade 2 Mathematics',
            'Grade 3 Mathematics',
            'Grade 4 Mathematics',
            'Grade 5 Mathematics',
            'Grade 6 Mathematics',
            'Grade 7 Mathematics',
            'Grade 8 Mathematics'
        ]
    },
    {
        title: 'K-8 Science Inquiry',
        summary: 'Hands-on K-8 science support including life science, physical science, earth science, and scientific thinking.',
        tags: ['K-8', 'science', 'inquiry', 'academic'],
        source: 'k-8.tex',
        courses: [
            'Kindergarten Science',
            'Grade 1 Science',
            'Grade 2 Science',
            'Grade 3 Science',
            'Grade 4 Science',
            'Grade 5 Science',
            'Grade 6 Science',
            'Grade 7 Science',
            'Grade 8 Science'
        ]
    },
    {
        title: 'K-8 Social Studies',
        summary: 'Geography, civics, culture, economics, and history topics for elementary and middle school learners.',
        tags: ['K-8', 'social studies', 'history', 'civics', 'academic'],
        source: 'k-8.tex',
        courses: [
            'Kindergarten Social Studies',
            'Grade 1 Social Studies',
            'Grade 2 Social Studies',
            'Grade 3 Social Studies',
            'Grade 4 Social Studies',
            'Grade 5 Social Studies',
            'Grade 6 Social Studies',
            'Grade 7 Social Studies',
            'Grade 8 Social Studies'
        ]
    },
    {
        title: 'High School Core Courses',
        summary: 'Comprehensive support for high school English, math, science, and social studies core classes.',
        tags: ['high school', 'core', 'english', 'math', 'science', 'history', 'academic'],
        source: 'highschool.tex',
        courses: [
            'English 9 (Freshman English)',
            'Algebra 1',
            'Geometry',
            'Algebra 2',
            'Pre-Calculus',
            'Statistics',
            'Biology',
            'Chemistry',
            'Physics',
            'World History',
            'United States History',
            'US Government and Civics'
        ]
    },
    {
        title: 'High School Honors & AP',
        summary: 'Rigorous honors and AP preparation, including exam-focused strategies and advanced coursework support.',
        tags: ['high school', 'honors', 'AP', 'advanced', 'academic'],
        source: 'highschool.tex',
        courses: [
            'Honors English 9',
            'AP English Language and Composition',
            'AP English Literature and Composition',
            'Honors Algebra 1',
            'Honors Geometry',
            'Honors Algebra 2',
            'Honors Pre-Calculus',
            'AP Precalculus',
            'AP Calculus AB',
            'AP Calculus BC',
            'AP Statistics',
            'Honors Biology',
            'AP Biology',
            'Honors Chemistry',
            'AP Chemistry',
            'Honors Physics',
            'AP Physics 1',
            'AP Physics 2',
            'AP Physics C: Mechanics',
            'AP Physics C: Electricity and Magnetism',
            'AP World History: Modern',
            'AP United States History',
            'AP United States Government and Politics'
        ]
    },
    {
        title: 'High School Dual Credit',
        summary: 'Dual credit guidance for college-aligned coursework, placement readiness, and transcript planning.',
        tags: ['high school', 'dual credit', 'college readiness', 'academic'],
        source: 'highschool.tex',
        courses: [
            'Calculus I (Dual Credit)',
            'Dual Credit English Composition I & II',
            'Dual Credit Government and History'
        ]
    },
    {
        title: 'College STEM Foundations',
        summary: 'College-level support for calculus, physics, chemistry, statistics, and foundational STEM performance.',
        tags: ['college', 'STEM', 'calculus', 'physics', 'chemistry', 'statistics', 'academic'],
        source: 'college.tex',
        courses: [
            'Calculus I',
            'Calculus II',
            'Calculus III',
            'Statistics and Data Analysis for Science',
            'Physics I: Mechanics',
            'Physics II: Electricity and Magnetism',
            'General Chemistry I',
            'General Chemistry II',
            'General Biology I',
            'General Biology II',
            'Introduction to Programming I',
            'Introduction to Programming II',
            'Discrete Mathematics for Computer Science',
            'Scientific Writing and Communication'
        ]
    },
    {
        title: 'College Advanced Sequences',
        summary: 'Advanced college sequences including differential equations, linear algebra, and upper-level science tracks.',
        tags: ['college', 'advanced', 'linear algebra', 'differential equations', 'academic'],
        source: 'college.tex',
        courses: [
            'Linear Algebra',
            'Differential Equations',
            'Mathematical Modeling and Applications',
            'Physics III: Modern Physics',
            'Physics IV: Thermodynamics and Optics',
            'Data Structures and Algorithms',
            'Numerical Analysis',
            'Probability Theory',
            'Undergraduate Research Seminar'
        ]
    },
    {
        title: 'College Biology & Chemistry Tracks',
        summary: 'Structured support for general biology, genetics, and organic chemistry course pathways.',
        tags: ['college', 'biology', 'genetics', 'organic chemistry', 'academic'],
        source: 'college.tex',
        courses: [
            'Organic Chemistry I',
            'Organic Chemistry II',
            'Physical Chemistry',
            'Genetics',
            'Molecular Biology and Biochemistry',
            'Ecology',
            'Cell Biology',
            'Microbiology',
            'Human Physiology',
            'Immunology',
            'Analytical Chemistry',
            'Inorganic Chemistry'
        ]
    }
];

const lifeSkillsPlans = [
    {
        title: 'Automotive Basics',
        summary: 'Learn common car care, dashboard basics, and maintenance essentials.',
        tags: ['transportation', 'car']
    },
    {
        title: 'Cooking & Kitchen Safety',
        summary: 'Practice meal prep, safe cooking habits, and kitchen confidence.',
        tags: ['cooking', 'safety']
    },
    {
        title: 'Taxes & Legal Documents',
        summary: 'Understand basic tax forms and important personal paperwork.',
        tags: ['finance', 'legal']
    },
    {
        title: 'Budgeting & Personal Finance',
        summary: 'Create budgets, track spending, and make smarter money choices.',
        tags: ['finance', 'budgeting']
    },
    {
        title: 'Home Maintenance & Repairs',
        summary: 'Handle simple fixes and understand basic home upkeep.',
        tags: ['home', 'repairs']
    },
    {
        title: 'First Aid & Emergency Response',
        summary: 'Build calm, practical response skills for urgent situations.',
        tags: ['safety', 'emergency']
    },
    {
        title: 'Job Readiness & Workplace Skills',
        summary: 'Practice the habits and professionalism employers expect.',
        tags: ['career', 'workplace']
    },
    {
        title: 'Digital Literacy & Online Safety',
        summary: 'Use technology wisely and stay safer online.',
        tags: ['digital', 'safety', 'technology']
    },
    {
        title: 'Sewing, Laundry & Clothing Care',
        summary: 'Learn simple clothing care that saves time and money.',
        tags: ['home', 'clothing']
    },
    {
        title: 'Time Management & Productivity',
        summary: 'Set priorities, manage time, and follow through consistently.',
        tags: ['productivity', 'time management']
    },
    {
        title: 'Mental Health & Self-Care',
        summary: 'Build sustainable routines for stress management and well-being.',
        tags: ['mental health', 'self-care']
    },
    {
        title: 'Navigating Healthcare & Insurance',
        summary: 'Understand appointments, coverage, and basic healthcare systems.',
        tags: ['healthcare', 'insurance']
    },
    {
        title: 'Communication & Conflict Resolution',
        summary: 'Strengthen listening, speaking, and calm problem-solving.',
        tags: ['communication', 'conflict']
    },
    {
        title: 'Networking & Building Professional Relationships',
        summary: 'Learn how to make connections and leave strong impressions.',
        tags: ['career', 'networking']
    },
    {
        title: 'Renting & Housing Basics',
        summary: 'Understand leases, deposits, roommates, and renter responsibilities.',
        tags: ['housing', 'renting']
    },
    {
        title: 'Grocery Shopping & Meal Planning',
        summary: 'Plan affordable meals and shop with more confidence.',
        tags: ['food', 'budgeting']
    },
    {
        title: 'Basic Legal Rights & Civic Literacy',
        summary: 'Learn everyday rights, responsibilities, and civic basics.',
        tags: ['legal', 'civics']
    },
    {
        title: 'Transportation & Getting Around Without a Car',
        summary: 'Navigate public transit, rideshares, and alternative travel options.',
        tags: ['transportation', 'navigation']
    },
    {
        title: 'Environmental Awareness & Sustainable Living',
        summary: 'Make practical choices that support sustainable daily living.',
        tags: ['environment', 'sustainability']
    },
    {
        title: 'Social Media Literacy & Personal Branding',
        summary: 'Use social platforms thoughtfully while protecting your reputation.',
        tags: ['social media', 'branding']
    },
    {
        title: 'Emotional Intelligence & Reading Social Cues',
        summary: 'Recognize emotions, social signals, and better responses.',
        tags: ['emotional intelligence', 'social skills']
    },
    {
        title: 'Critical Thinking & Evaluating Information',
        summary: 'Question claims, spot weak evidence, and think more clearly.',
        tags: ['critical thinking', 'information']
    },
    {
        title: 'Negotiation & Advocacy Skills',
        summary: 'Speak up effectively and negotiate with more confidence.',
        tags: ['communication', 'advocacy']
    },
    {
        title: 'Basic Contracts & Consumer Rights',
        summary: 'Understand common agreements and everyday consumer protections.',
        tags: ['contracts', 'consumer rights']
    },
    {
        title: 'Banking & Credit Basics',
        summary: 'Learn accounts, credit scores, and smarter borrowing habits.',
        tags: ['finance', 'credit']
    },
    {
        title: 'Investing & Building Wealth',
        summary: 'Understand beginner investing ideas and long-term money growth.',
        tags: ['finance', 'investing']
    },
    {
        title: 'Public Speaking & Presentation Skills',
        summary: 'Speak clearly, stay calm, and present with confidence.',
        tags: ['communication', 'public speaking']
    },
    {
        title: 'Conflict De-escalation & Boundary Setting',
        summary: 'Handle tense moments with calm language and clearer limits.',
        tags: ['conflict', 'boundaries']
    },
    {
        title: 'Study Skills & Learning How to Learn',
        summary: 'Build independent learning habits that transfer beyond school.',
        tags: ['study skills', 'learning']
    },
    {
        title: 'Goal Setting & Long-Term Planning',
        summary: 'Turn big goals into realistic plans and next steps.',
        tags: ['goals', 'planning']
    },
    {
        title: 'Personal Safety & Self-Defense Awareness',
        summary: 'Strengthen situational awareness and everyday safety habits.',
        tags: ['safety', 'self-defense']
    },
    {
        title: 'Relationship Skills & Healthy Boundaries in Relationships',
        summary: 'Build healthier habits for friendships, dating, and boundaries.',
        tags: ['relationships', 'boundaries']
    },
    {
        title: 'Basic Car Buying & Selling Online',
        summary: 'Understand pricing, listings, and safer vehicle transactions.',
        tags: ['car', 'consumer']
    },
    {
        title: 'Email Etiquette & Professional Writing',
        summary: 'Write clearer, more professional emails and messages.',
        tags: ['writing', 'communication']
    },
    {
        title: 'Understanding Contracts & Leases',
        summary: 'Read agreements more carefully before signing.',
        tags: ['contracts', 'housing']
    },
    {
        title: 'Entrepreneurship & Side Hustles',
        summary: 'Explore small business basics and side-income opportunities.',
        tags: ['business', 'entrepreneurship']
    },
    {
        title: 'Nutrition & Reading Food Labels',
        summary: 'Make more informed food choices and understand labels.',
        tags: ['nutrition', 'health']
    },
    {
        title: 'Travel Planning & Navigation',
        summary: 'Plan trips, compare options, and move around more confidently.',
        tags: ['travel', 'navigation']
    },
    {
        title: 'Etiquette & Social Graces for Adult Life',
        summary: 'Practice everyday manners and confidence in adult settings.',
        tags: ['etiquette', 'social']
    },
    {
        title: 'Life Admin & Organizing Your Adult Life',
        summary: 'Manage appointments, paperwork, and everyday responsibilities.',
        tags: ['organization', 'planning']
    }
];

const catalogSearch = document.getElementById('catalogSearch');
const catalogSearchStatus = document.getElementById('catalogSearchStatus');
const filterChips = document.querySelectorAll('.catalog-filter-chip');
const academicCatalogGrid = document.getElementById('academicCatalogGrid');
const lifeSkillsCatalogGrid = document.getElementById('lifeSkillsCatalogGrid');
const catalogModal = document.getElementById('catalogModal');
const catalogModalClose = document.getElementById('catalogModalClose');
const catalogModalEyebrow = document.getElementById('catalogModalEyebrow');
const catalogModalTitle = document.getElementById('catalogModalTitle');
const catalogModalBody = document.getElementById('catalogModalBody');
const totalPlans = academicPlans.length + lifeSkillsPlans.length;
const FILTER_CHIP_NO_MATCH = '__filter-chip-no-match__';
const texSourceCache = new Map();
const texChapterCache = new Map();
let lastFocusedCatalogTrigger = null;

const normalizeText = (value) => (value || '').toLowerCase().trim();
const normalizeLookupText = (value) => normalizeText(value)
    .replace(/\\&/g, ' and ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const findPlanByTitle = (variant, title) => (variant === 'academic' ? academicPlans : lifeSkillsPlans)
    .find(plan => plan.title === title);

const latexTextToPlainText = (value) => String(value || '')
    .replace(/\\textbf\{([^}]*)\}/g, '$1')
    .replace(/\\emph\{([^}]*)\}/g, '$1')
    .replace(/\\tfrac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/\\#/g, '#')
    .replace(/\\\$/g, '$')
    .replace(/\\circ/g, '°')
    .replace(/\\pi/g, 'π')
    .replace(/\\theta/g, 'θ')
    .replace(/\\sin/g, 'sin')
    .replace(/\\cos/g, 'cos')
    .replace(/\\tan/g, 'tan')
    .replace(/\\to/g, '→')
    // Only remove delimiter commands like \left( and \right) without touching commands such as \leftarrow or \rightarrow.
    .replace(/\\left(?![a-zA-Z])/g, '')
    .replace(/\\right(?![a-zA-Z])/g, '')
    .replace(/\\quad|\\qquad/g, ' ')
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/\$/g, '')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const formatLatexInline = (value) => {
    const placeholders = [];
    const withPlaceholders = String(value || '')
        .replace(/\\textbf\{([^}]*)\}/g, (_, content) => {
            placeholders.push(`<strong>${escapeHtml(latexTextToPlainText(content))}</strong>`);
            return `__CATALOG_TOKEN_${placeholders.length - 1}__`;
        })
        .replace(/\\emph\{([^}]*)\}/g, (_, content) => {
            placeholders.push(`<em>${escapeHtml(latexTextToPlainText(content))}</em>`);
            return `__CATALOG_TOKEN_${placeholders.length - 1}__`;
        });

    return escapeHtml(latexTextToPlainText(withPlaceholders))
        .replace(/__CATALOG_TOKEN_(\d+)__/g, (_, index) => placeholders[Number(index)] || '');
};

const renderLatexBlock = (content) => {
    const lines = String(content || '')
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(line => line.replace(/\s+$/, ''));

    const html = [];
    let paragraphLines = [];
    let listType = null;
    let inTabular = false;

    const flushParagraph = () => {
        const text = paragraphLines
            .map(line => line.trim())
            .filter(Boolean)
            .join(' ')
            .trim();

        if (text) {
            html.push(`<p>${formatLatexInline(text)}</p>`);
        }

        paragraphLines = [];
    };

    const closeList = () => {
        if (!listType) return;
        html.push(listType === 'ol' ? '</ol>' : '</ul>');
        listType = null;
    };

    const openList = (type) => {
        if (listType === type) return;
        closeList();
        flushParagraph();
        listType = type;
        html.push(type === 'ol'
            ? '<ol class="catalog-detail-list">'
            : '<ul class="catalog-detail-list">');
    };

    lines.forEach(rawLine => {
        const line = rawLine.trim().replace(/^\\noindent\s*/, '');

        if (!line) {
            flushParagraph();
            return;
        }

        if (line.startsWith('%')) {
            return;
        }

        const sectionMatch = line.match(/^\\section\*?\{(.+)\}$/);
        if (sectionMatch) {
            closeList();
            flushParagraph();
            html.push(`<h3>${escapeHtml(latexTextToPlainText(sectionMatch[1]))}</h3>`);
            return;
        }

        const subsectionMatch = line.match(/^\\subsection\*?\{(.+)\}$/);
        if (subsectionMatch) {
            closeList();
            flushParagraph();
            html.push(`<h4>${escapeHtml(latexTextToPlainText(subsectionMatch[1]))}</h4>`);
            return;
        }

        const subsubsectionMatch = line.match(/^\\subsubsection\*?\{(.+)\}$/);
        if (subsubsectionMatch) {
            closeList();
            flushParagraph();
            html.push(`<h5>${escapeHtml(latexTextToPlainText(subsubsectionMatch[1]))}</h5>`);
            return;
        }

        if (/^\\begin\{itemize\}/.test(line)) {
            openList('ul');
            return;
        }

        if (/^\\begin\{enumerate\}/.test(line)) {
            openList('ol');
            return;
        }

        if (/^\\end\{itemize\}|^\\end\{enumerate\}/.test(line)) {
            closeList();
            return;
        }

        const itemMatch = line.match(/^\\item\s*(.*)$/);
        if (itemMatch) {
            if (!listType) {
                openList('ul');
            }
            html.push(`<li>${formatLatexInline(itemMatch[1])}</li>`);
            return;
        }

        if (/^\\begin\{tabular\}/.test(line)) {
            inTabular = true;
            return;
        }

        if (/^\\end\{tabular\}/.test(line)) {
            inTabular = false;
            return;
        }

        if (
            /^\\begin\{center\}|^\\end\{center\}|^\\toprule|^\\midrule|^\\bottomrule/.test(line) ||
            /^\\hline|^\\centering|^\\appendix|^\\addcontentsline/.test(line) ||
            /^\\part\{/.test(line) ||
            /^\\chapter\{/.test(line) ||
            /^\\clearpage|^\\newpage|^\\maketitle|^\\tableofcontents/.test(line)
        ) {
            return;
        }

        if (inTabular && line.includes('&') && line.endsWith('\\\\')) {
            closeList();
            flushParagraph();
            const cells = line
                .replace(/\\\\$/, '')
                .split('&')
                .map(cell => latexTextToPlainText(cell))
                .filter(Boolean);

            if (cells.length) {
                html.push(`
                    <div class="catalog-detail-row">
                        <span class="catalog-detail-row-label">${escapeHtml(cells[0])}</span>
                        ${cells[1] ? `<span class="catalog-detail-row-value">${escapeHtml(cells.slice(1).join(' • '))}</span>` : ''}
                    </div>
                `);
            }
            return;
        }

        if (line === '\\[' || line === '\\]') {
            return;
        }

        const hasExplicitBreak = /\\\\$/.test(line);
        paragraphLines.push(line.replace(/\\\\$/, ''));
        if (hasExplicitBreak) {
            flushParagraph();
        }
    });

    closeList();
    flushParagraph();
    return html.join('');
};

const getPlanActionLabel = (plan) => plan.courses?.length ? 'View plan and course details' : 'View plan details';

const getAcademicPlanDetailHtml = (plan) => `
    <p>${escapeHtml(plan.summary)}</p>
    <div class="catalog-modal-section">
        <h3>Included courses</h3>
        <p>Select a course to open its curriculum breakdown.</p>
        <div class="catalog-modal-course-grid">
            ${plan.courses.map(course => `
                <button
                    type="button"
                    class="catalog-course-button"
                    data-course-trigger="true"
                    data-course-title="${escapeHtml(course)}"
                    data-course-source="${escapeHtml(plan.source)}"
                    data-course-plan="${escapeHtml(plan.title)}"
                >
                    ${escapeHtml(course)}
                </button>
            `).join('')}
        </div>
    </div>
`;

const getLifePlanDetailHtml = (plan) => `
    <p>${escapeHtml(plan.summary)}</p>
    <div class="catalog-modal-section">
        <h3>Focus areas</h3>
        <div class="catalog-card-tags">
            ${plan.tags.map(tag => `<span class="catalog-card-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
    </div>
`;

const setCatalogModalContent = ({ eyebrow = '', title = 'Catalog details', body = '' }) => {
    catalogModalEyebrow.textContent = eyebrow;
    catalogModalTitle.textContent = title;
    catalogModalBody.innerHTML = body;
};

const openCatalogModal = (trigger) => {
    lastFocusedCatalogTrigger = trigger || document.activeElement;
    catalogModal.hidden = false;
    document.body.classList.add('catalog-modal-open');
    catalogModalClose.focus();
};

const closeCatalogModal = () => {
    if (!catalogModal || catalogModal.hidden) return;
    catalogModal.hidden = true;
    document.body.classList.remove('catalog-modal-open');
    if (lastFocusedCatalogTrigger && typeof lastFocusedCatalogTrigger.focus === 'function') {
        lastFocusedCatalogTrigger.focus();
    }
};

const getSourceChapters = async (source) => {
    if (!source) return [];
    if (texChapterCache.has(source)) {
        return texChapterCache.get(source);
    }

    let sourceText = texSourceCache.get(source);
    if (!sourceText) {
        const response = await fetch(source);
        if (!response.ok) {
            throw new Error(`Unable to load ${source}: ${response.status} ${response.statusText}`);
        }
        sourceText = await response.text();
        texSourceCache.set(source, sourceText);
    }

    const chapters = [];
    const chapterRegex = /^\s*\\chapter\{([^}]*)\}/gm;
    const matches = [...sourceText.matchAll(chapterRegex)];

    matches.forEach((match, index) => {
        if (typeof match.index !== 'number') {
            return;
        }
        const startIndex = match.index + match[0].length;
        const nextMatch = matches[index + 1];
        const endIndex = typeof nextMatch?.index === 'number' ? nextMatch.index : sourceText.length;
        chapters.push({
            title: latexTextToPlainText(match[1]),
            normalizedTitle: normalizeLookupText(match[1]),
            content: sourceText.slice(startIndex, endIndex).trim()
        });
    });

    texChapterCache.set(source, chapters);
    return chapters;
};

const showPlanDetails = (plan, variant, trigger) => {
    setCatalogModalContent({
        eyebrow: variant === 'academic' ? 'Academic plan' : 'Life skills plan',
        title: plan.title,
        body: variant === 'academic'
            ? getAcademicPlanDetailHtml(plan)
            : getLifePlanDetailHtml(plan)
    });
    openCatalogModal(trigger);
};

const showCourseDetails = async ({ title, source, planTitle, trigger }) => {
    setCatalogModalContent({
        eyebrow: planTitle ? `${planTitle} course` : 'Course details',
        title,
        body: `
            <div class="catalog-detail-loading">
                <p>Loading the full course breakdown...</p>
            </div>
        `
    });
    openCatalogModal(trigger);

    try {
        const chapters = await getSourceChapters(source);
        const chapter = chapters.find(entry => entry.normalizedTitle === normalizeLookupText(title));

        if (!chapter) {
            setCatalogModalContent({
                eyebrow: planTitle ? `${planTitle} course` : 'Course details',
                title,
                body: `
                    <div class="catalog-detail-empty">
                        <p>A full chapter for this course is not available in the current curriculum guide yet.</p>
                        <p>Please contact Exam Experts if you want the detailed syllabus added next.</p>
                    </div>
                `
            });
            return;
        }

        setCatalogModalContent({
            eyebrow: planTitle ? `${planTitle} course` : 'Course details',
            title,
            body: `
                <div class="catalog-modal-section">
                    <p class="catalog-detail-intro">Full course breakdown from the curriculum guide.</p>
                    <div class="catalog-detail-content">
                        ${renderLatexBlock(chapter.content)}
                    </div>
                </div>
            `
        });
    } catch (error) {
        console.error('Catalog course load error:', error);
        setCatalogModalContent({
            eyebrow: planTitle ? `${planTitle} course` : 'Course details',
            title,
            body: `
                <div class="catalog-detail-empty">
                    <p>We could not load this course breakdown right now.</p>
                    <p>Please refresh the page and try again.</p>
                </div>
            `
        });
    }
};

const filterPlans = (plans, query) => {
    if (!query) return plans;

    return plans.filter(plan => {
        const searchableText = [
            normalizeText(plan.title || ''),
            normalizeText(plan.summary || ''),
            normalizeText(plan.source || ''),
            ...plan.tags.map(normalizeText),
            ...(plan.courses || []).map(normalizeText)
        ].join(' ');

        return searchableText.includes(query);
    });
};

const renderCatalog = (plans, targetId, variant) => {
    const grid = document.getElementById(targetId);
    if (!grid) return;

    if (!plans.length) {
        grid.innerHTML = `
            <div class="catalog-empty-state">
                <h3>No matches yet</h3>
                <p>Try a different keyword or tap one of the quick filters above.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = plans.map((plan, index) => `
        <article class="catalog-card catalog-card-${variant}">
            <div class="catalog-card-number">Plan ${index + 1}</div>
            <h3>${escapeHtml(plan.title)}</h3>
            <p>${escapeHtml(plan.summary)}</p>
            <button
                type="button"
                class="catalog-card-action"
                data-plan-trigger="true"
                data-plan-variant="${escapeHtml(variant)}"
                data-plan-title="${escapeHtml(plan.title)}"
            >
                ${escapeHtml(getPlanActionLabel(plan))}
            </button>
            ${variant === 'academic' && plan.courses?.length ? `
                <details class="catalog-card-details">
                    <summary>Show ${plan.courses.length} included courses</summary>
                    <ul class="catalog-course-list">
                        ${plan.courses.map(course => `
                            <li>
                                <button
                                    type="button"
                                    class="catalog-course-button"
                                    data-course-trigger="true"
                                    data-course-title="${escapeHtml(course)}"
                                    data-course-source="${escapeHtml(plan.source)}"
                                    data-course-plan="${escapeHtml(plan.title)}"
                                >
                                    ${escapeHtml(course)}
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </details>
            ` : ''}
            <div class="catalog-card-tags">
                ${plan.tags.map(tag => `<span class="catalog-card-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </article>
    `).join('');
};

const updateCounts = (academicCount, lifeCount) => {
    document.getElementById('academicPlanCount').textContent = academicCount;
    document.getElementById('lifeSkillsPlanCount').textContent = lifeCount;
    document.getElementById('totalPlanCount').textContent = academicCount + lifeCount;
    document.getElementById('academicHeadingCount').textContent = academicCount;
    document.getElementById('lifeHeadingCount').textContent = lifeCount;
};

const renderAllCatalogs = (searchQuery = '') => {
    const trimmedQuery = searchQuery.trim();
    const normalizedQuery = normalizeText(trimmedQuery);
    const academicMatches = filterPlans(academicPlans, normalizedQuery);
    const lifeMatches = filterPlans(lifeSkillsPlans, normalizedQuery);
    const totalMatches = academicMatches.length + lifeMatches.length;

    renderCatalog(academicMatches, 'academicCatalogGrid', 'academic');
    renderCatalog(lifeMatches, 'lifeSkillsCatalogGrid', 'life');
    updateCounts(academicMatches.length, lifeMatches.length);

    catalogSearchStatus.textContent = normalizedQuery
        ? `Showing ${totalMatches} matching plans for “${trimmedQuery}”.`
        : `Showing all ${totalPlans} plans.`;
};

const setQuickFilter = (value) => {
    const normalizedValue = normalizeText(value);
    filterChips.forEach(chip => {
        chip.classList.toggle('is-active', normalizeText(chip.dataset.filter || '') === normalizedValue);
    });
};

const syncQuickFilter = (query) => {
    const normalizedQuery = normalizeText(query);
    const matchingChip = Array.from(filterChips).find(chip => normalizeText(chip.dataset.filter || '') === normalizedQuery);
    setQuickFilter(matchingChip ? matchingChip.dataset.filter || '' : FILTER_CHIP_NO_MATCH);
};

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const value = chip.dataset.filter || '';
        if (catalogSearch) {
            catalogSearch.value = value;
        }
        setQuickFilter(value);
        renderAllCatalogs(value);
    });
});

[academicCatalogGrid, lifeSkillsCatalogGrid].forEach(grid => {
    if (!grid) return;

    grid.addEventListener('click', async (event) => {
        const planTrigger = event.target.closest('[data-plan-trigger]');
        if (planTrigger) {
            const plan = findPlanByTitle(planTrigger.dataset.planVariant, planTrigger.dataset.planTitle);
            if (plan) {
                showPlanDetails(plan, planTrigger.dataset.planVariant, planTrigger);
            }
            return;
        }

        const courseTrigger = event.target.closest('[data-course-trigger]');
        if (courseTrigger) {
            await showCourseDetails({
                title: courseTrigger.dataset.courseTitle,
                source: courseTrigger.dataset.courseSource,
                planTitle: courseTrigger.dataset.coursePlan,
                trigger: courseTrigger
            });
        }
    });
});

if (catalogModal) {
    catalogModal.addEventListener('click', async (event) => {
        if (event.target.matches('[data-catalog-close]')) {
            closeCatalogModal();
            return;
        }

        const courseTrigger = event.target.closest('[data-course-trigger]');
        if (courseTrigger) {
            await showCourseDetails({
                title: courseTrigger.dataset.courseTitle,
                source: courseTrigger.dataset.courseSource,
                planTitle: courseTrigger.dataset.coursePlan,
                trigger: courseTrigger
            });
        }
    });
}

if (catalogModalClose) {
    catalogModalClose.addEventListener('click', closeCatalogModal);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && catalogModal && !catalogModal.hidden) {
        closeCatalogModal();
    }
});

if (catalogSearch) {
    catalogSearch.addEventListener('input', (event) => {
        const searchQuery = event.target.value;
        syncQuickFilter(searchQuery);
        renderAllCatalogs(searchQuery);
    });
}

renderAllCatalogs();
